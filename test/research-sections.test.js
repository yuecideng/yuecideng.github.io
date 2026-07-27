const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync("_pages/about.md", "utf8");
const rendered = fs.readFileSync("_site/index.html", "utf8");
const stylesheet = fs.readFileSync("assets/css/custom.css", "utf8");
const baseline = fs.readFileSync("test/fixtures/about-baseline.md", "utf8");

const projectsMarker = "## Projects {#projects}";
const projectsSectionMarker =
  '<section class="research-section research-projects-section" markdown="1">';
const scriptMarker =
  "<script src=\"{{ '/assets/js/pub-filter.js' | relative_url }}\" defer></script>";

function beforeProjects(markdown) {
  const headingIndex = markdown.indexOf(projectsMarker);
  const wrapperIndex = markdown.indexOf(projectsSectionMarker);
  const sectionStart =
    wrapperIndex !== -1 && wrapperIndex < headingIndex
      ? wrapperIndex
      : headingIndex;
  return markdown.slice(0, sectionStart);
}

function researchRegion(markdown) {
  const start = markdown.indexOf(projectsMarker);
  const scriptStart = markdown.indexOf(scriptMarker, start);
  return markdown.slice(start, scriptStart);
}

function attributes(markdown, name) {
  return [...markdown.matchAll(new RegExp(`${name}="([^"]+)"`, "g"))]
    .map((match) => match[1])
    .sort();
}

function visibleText(markdown) {
  return markdown
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/Description:/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

test("does not modify homepage content before Projects", () => {
  assert.equal(beforeProjects(source), beforeProjects(baseline));
});

test("renders semantic flat rows for two projects and ten publications", () => {
  assert.match(
    source,
    /<section class="research-section research-projects-section" markdown="1">\s*## Projects \{#projects\}/
  );
  assert.match(
    source,
    /<section class="research-section research-publications-section" markdown="1">\s*## Publications \{#publications\}/
  );
  assert.equal(
    (rendered.match(/class="research-section research-/g) || []).length,
    2
  );
  assert.equal(
    (rendered.match(/class="research-row project-row"/g) || []).length,
    2
  );
  assert.equal(
    (
      rendered.match(
        /class="research-row publication-row pub-card"/g
      ) || []
    ).length,
    10
  );
  assert.equal((rendered.match(/<h3 class="card-title">/g) || []).length, 12);
  assert.ok(!researchRegion(source).includes('class="card pub-card"'));
  assert.ok(!researchRegion(source).includes("<strong>Description:</strong>"));
});

test("exposes the initial publication filter selection to assistive technology", () => {
  const filters = [...source.matchAll(/<button class="pub-filter-btn(?: active)?" data-filter="([^"]+)" aria-pressed="([^"]+)">/g)];

  assert.deepEqual(filters.map(([, filter, pressed]) => [filter, pressed]), [
    ["all", "true"],
    ["2026", "false"],
    ["2025", "false"],
    ["position", "false"],
  ]);
});

test("preserves research text, images, links, and filter metadata", () => {
  const currentRegion = researchRegion(source);
  const baselineRegion = researchRegion(baseline);

  assert.equal(visibleText(currentRegion), visibleText(baselineRegion));
  assert.deepEqual(attributes(currentRegion, "href"), attributes(baselineRegion, "href"));
  assert.deepEqual(attributes(currentRegion, "src"), attributes(baselineRegion, "src"));
  assert.deepEqual(
    attributes(currentRegion, "data-year"),
    attributes(baselineRegion, "data-year")
  );
  assert.deepEqual(
    attributes(currentRegion, "data-category"),
    attributes(baselineRegion, "data-category")
  );
});

test("keeps the rendered publication distribution at 10, 7, 3, and 1", () => {
  assert.equal((rendered.match(/\bpub-card\b/g) || []).length, 10);
  assert.equal((rendered.match(/data-year="2026"/g) || []).length, 7);
  assert.equal((rendered.match(/data-year="2025"/g) || []).length, 3);
  assert.equal((rendered.match(/data-category="position"/g) || []).length, 1);
});

function classList(initial = []) {
  const values = new Set(initial);
  return {
    add(value) {
      values.add(value);
    },
    remove(value) {
      values.delete(value);
    },
    contains(value) {
      return values.has(value);
    },
  };
}

function filterHarness() {
  const listeners = {};
  const buttons = ["all", "2026", "2025", "position"].map((filter, index) => ({
    attributes: {
      "data-filter": filter,
      "aria-pressed": index === 0 ? "true" : "false",
    },
    classList: classList(index === 0 ? ["active"] : []),
    getAttribute(name) {
      return this.attributes[name];
    },
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    addEventListener(event, handler) {
      listeners[filter] = handler;
    },
  }));

  const cards = [
    ...Array.from({ length: 7 }, () => ({ "data-year": "2026" })),
    { "data-year": "2025", "data-category": "position" },
    { "data-year": "2025" },
    { "data-year": "2025" },
  ].map((attributes) => ({
    attributes,
    classList: classList(),
    getAttribute(name) {
      return this.attributes[name];
    },
  }));

  const document = {
    addEventListener(event, handler) {
      if (event === "DOMContentLoaded") handler();
    },
    querySelectorAll(selector) {
      return selector.includes("pub-filter-btn") ? buttons : cards;
    },
  };

  vm.runInNewContext(
    fs.readFileSync("assets/js/pub-filter.js", "utf8"),
    { document }
  );

  return { buttons, cards, listeners };
}

test("publication filtering preserves all four branches", () => {
  const cases = [
    ["all", 10],
    ["2026", 7],
    ["2025", 3],
    ["position", 1],
  ];

  for (const [filter, expectedVisible] of cases) {
    const { buttons, cards, listeners } = filterHarness();
    const selected = buttons.find(
      (button) => button.attributes["data-filter"] === filter
    );
    listeners[filter].call(selected);

    assert.equal(
      cards.filter((card) => !card.classList.contains("hidden")).length,
      expectedVisible
    );
    assert.equal(
      buttons.filter((button) => button.classList.contains("active")).length,
      1
    );
    assert.ok(selected.classList.contains("active"));
    assert.equal(
      buttons.filter((button) => button.attributes["aria-pressed"] === "true")
        .length,
      1
    );
    assert.equal(selected.attributes["aria-pressed"], "true");
    assert.ok(
      buttons
        .filter((button) => button !== selected)
        .every((button) => button.attributes["aria-pressed"] === "false")
    );
  }
});

function cssBlock(source, marker) {
  const markerIndex = source.indexOf(marker);
  assert.notEqual(markerIndex, -1, `Missing ${marker}`);

  const openIndex = source.indexOf("{", markerIndex);
  let depth = 0;

  for (let index = openIndex; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(openIndex + 1, index);
  }

  assert.fail(`Unclosed CSS block for ${marker}`);
}

function cssRule(source, selector) {
  return cssBlock(source, `${selector} {`);
}

function lastCssRule(source, selector) {
  const marker = `${selector} {`;
  const markerIndex = source.lastIndexOf(marker);
  assert.notEqual(markerIndex, -1, `Missing ${selector}`);
  return cssBlock(source.slice(markerIndex), marker);
}

function cssRules(source, selector) {
  const marker = `${selector} {`;
  const rules = [];
  let start = 0;

  while (true) {
    const markerIndex = source.indexOf(marker, start);
    if (markerIndex === -1) return rules;
    rules.push(cssBlock(source.slice(markerIndex), marker));
    start = markerIndex + marker.length;
  }
}

test("defines scoped flat-row styles and responsive touch behavior", () => {
  const list = cssRule(stylesheet, ".project-list,\n.publication-list");
  assert.match(list, /border-top: 1px solid var\(--c-border\);/);
  assert.match(list, /border-bottom: 1px solid var\(--c-border\);/);
  assert.match(list, /display: grid;/);

  const researchRow = cssRule(stylesheet, ".research-row");
  assert.match(researchRow, /background: transparent;/);
  assert.match(researchRow, /display: grid;/);
  assert.match(researchRow, /padding: 0\.9rem 0;/);
  assert.match(
    cssRule(stylesheet, ".project-row"),
    /grid-template-columns: 245px minmax\(0, 1fr\);/
  );
  assert.match(
    cssRule(stylesheet, ".publication-row"),
    /grid-template-columns: 195px minmax\(0, 1fr\);/
  );
  assert.match(
    cssRule(stylesheet, ".research-section"),
    /width: 100%;/
  );

  const breakout = cssBlock(stylesheet, "@media (min-width: 901px)");
  const breakoutSection = cssRule(breakout, ".research-section");
  assert.match(breakoutSection, /left: 50%;/);
  assert.match(breakoutSection, /position: relative;/);
  assert.match(breakoutSection, /transform: translateX\(-50%\);/);
  assert.match(
    breakoutSection,
    /width: min\(1120px, calc\(100vw - 2rem\)\);/
  );

  const wide = cssBlock(stylesheet, "@media (min-width: 1025px)");
  assert.match(
    cssRule(wide, ".project-row"),
    /grid-template-columns: 330px minmax\(0, 1fr\);/
  );
  assert.match(
    cssRule(wide, ".publication-row"),
    /grid-template-columns: 270px minmax\(0, 1fr\);/
  );

  const rowMedia = cssRule(
    stylesheet,
    ".project-row .card-image,\n.publication-row .card-image"
  );
  assert.match(rowMedia, /background: var\(--c-surface-alt\);/);
  assert.match(rowMedia, /width: 100%;/);
  assert.match(
    cssRule(stylesheet, ".research-row .card-title"),
    /font-size: inherit;/
  );

  const filterBar = cssRules(stylesheet, "#pub-filter-bar").find((rule) =>
    rule.includes("border-bottom: 1px solid var(--c-border);")
  );
  assert.ok(filterBar, "Missing scoped publication-filter tab bar");
  assert.match(filterBar, /border-bottom: 1px solid var\(--c-border\);/);
  assert.match(filterBar, /gap: 1\.15rem;/);

  const tabs = lastCssRule(stylesheet, "#pub-filter-bar .pub-filter-btn");
  assert.match(tabs, /background: transparent;/);
  assert.match(tabs, /border: 0;/);
  assert.match(tabs, /border-bottom: 2px solid transparent;/);
  assert.match(tabs, /border-radius: 0;/);
  assert.match(tabs, /min-height: 40px;/);
  assert.match(
    lastCssRule(stylesheet, "#pub-filter-bar .pub-filter-btn.active"),
    /border-bottom-color: var\(--c-accent\);/
  );

  const tablet = cssBlock(stylesheet, "@media (max-width: 768px)");
  assert.match(
    cssRule(tablet, ".project-row"),
    /grid-template-columns: 170px minmax\(0, 1fr\);/
  );
  assert.match(
    cssRule(tablet, ".publication-row"),
    /grid-template-columns: 145px minmax\(0, 1fr\);/
  );

  const phone = cssBlock(stylesheet, "@media (max-width: 559px)");
  assert.match(
    cssRule(phone, ".project-row"),
    /grid-template-columns: minmax\(0, 1fr\);/
  );
  assert.match(
    cssRule(phone, ".publication-row"),
    /grid-template-columns: 104px minmax\(0, 1fr\);/
  );

  const coarsePointer = cssBlock(stylesheet, "@media (pointer: coarse)");
  const touchTargets = cssRule(
    coarsePointer,
    "#pub-filter-bar .pub-filter-btn,\n  .research-row .card-links a"
  );
  assert.match(touchTargets, /display: inline-flex;/);
  assert.match(touchTargets, /min-height: 44px;/);
  assert.doesNotMatch(stylesheet, /\.research-row:hover\s*\{[^}]*transform:/);
});

test("keeps local preview assets on localhost without changing production", () => {
  const localConfig = fs.readFileSync("_config_local.yml", "utf8");
  const productionConfig = fs.readFileSync("_config.yml", "utf8");

  assert.match(localConfig, /^url: "http:\/\/localhost:4000"$/m);
  assert.match(productionConfig, /https:\/\/yuecideng\.github\.io/);
});
