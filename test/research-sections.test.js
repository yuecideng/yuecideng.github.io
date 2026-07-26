const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync("_pages/about.md", "utf8");
const rendered = fs.readFileSync("_site/index.html", "utf8");
const stylesheet = fs.readFileSync("assets/css/custom.css", "utf8");
const baseline = execFileSync(
  "git",
  ["show", "7950870:_pages/about.md"],
  { encoding: "utf8" }
);

const projectsMarker = "## Projects {#projects}";
const scriptMarker =
  "<script src=\"{{ '/assets/js/pub-filter.js' | relative_url }}\" defer></script>";

function beforeProjects(markdown) {
  return markdown.slice(0, markdown.indexOf(projectsMarker));
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
    attributes: { "data-filter": filter },
    classList: classList(index === 0 ? ["active"] : []),
    getAttribute(name) {
      return this.attributes[name];
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
  }
});
