const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");

const homepage = fs.readFileSync("_site/index.html", "utf8");
const stylesheet = fs.readFileSync("assets/css/custom.css", "utf8");

test("renders projects as a two-item editorial collection", () => {
  const start = homepage.indexOf(
    '<div class="project-list" aria-label="Research projects">'
  );
  const end = homepage.indexOf('<h2 id="publications">', start);
  const grid = homepage.slice(start, end);

  assert.ok(start >= 0 && end > start, "Missing rendered projects grid");
  assert.equal((grid.match(/class="research-row project-row"/g) || []).length, 2);
  assert.ok(grid.includes('aria-label="Research projects"'));
});

test("renders publication controls and eleven publication rows", () => {
  assert.ok(homepage.includes('id="pub-filter-bar"'));
  assert.ok(homepage.includes('class="publication-list"'));
  assert.equal(
    (homepage.match(/class="research-row publication-row pub-card"/g) || []).length,
    11
  );
  assert.equal((homepage.match(/<h3 class="card-title">/g) || []).length, 13);
  assert.equal(
    (homepage.match(/class="research-row publication-row pub-card" data-year="2026"/g) || [])
      .length,
    8
  );
  assert.equal(
    (homepage.match(/class="research-row publication-row pub-card" data-year="2025"/g) || [])
      .length,
    3
  );
  assert.equal((homepage.match(/data-category="position"/g) || []).length, 1);
});

test("renders RoboSynChallenge with verified project resources", () => {
  assert.ok(homepage.includes("RoboSynChallenge: Mastering Real-World Dexterity"));
  assert.ok(homepage.includes("RoboSynChallenge Organizing Team"));
  assert.ok(!homepage.includes("RoboSynChallenge Organizing Team, including"));
  assert.ok(homepage.includes("NeurIPS 2026 Competition"));
  assert.ok(homepage.includes('href="https://robosyn-bench.net/#/home"'));
  assert.ok(
    homepage.includes(
      'href="https://robosyn-bench.net/material/RoboSynChallenge-report.pdf"'
    )
  );
  assert.ok(
    homepage.includes('href="https://github.com/EDEM-AI/RoboSynChallenge"')
  );
});

test("uses action links and natural descriptions", () => {
  assert.ok(homepage.includes('class="card-links"'));
  assert.equal((homepage.match(/<i class="fas fa-globe" aria-hidden="true"><\/i> Website/g) || []).length, 3);
  assert.ok(
    homepage.includes(
      '<a href="https://github.com/DexForce/EmbodiChain"><i class="fab fa-github" aria-hidden="true"></i> Code</a>'
    )
  );
  assert.ok(homepage.includes('class="action-links publication-links"'));
  assert.ok(homepage.includes('class="action-link"'));
  assert.ok(homepage.includes("Paper / Project / Code (Coming Soon)"));
  assert.ok(!homepage.includes("<strong>Description:</strong>"));
  assert.ok(homepage.includes("PAct generates complete, part-decomposed"));
});

test("renders the approved editorial section headings", () => {
  assert.ok(homepage.includes('<h2 id="projects">Projects</h2>'));
  assert.ok(homepage.includes('<h2 id="publications">Publications</h2>'));
});

test("keeps project cards compact while preserving complete details", () => {
  assert.equal((homepage.match(/class="research-row project-row"/g) || []).length, 2);
  assert.ok(
    homepage.includes(
      '<h3 class="card-title"><a href="https://github.com/DexForce/EmbodiChain" class="papertitle">EmbodiChain: An end-to-end, GPU-accelerated, and modular platform'
    )
  );
  assert.ok(
    homepage.includes(
      "EmbodiChain: An end-to-end, GPU-accelerated, and modular platform"
    )
  );
  assert.ok(
    homepage.includes(
      "EmbodiChain: An end-to-end, GPU-accelerated, and modular platform"
    )
  );
  assert.ok(
    homepage.includes("All of these components work seamlessly together")
  );
});

test("renders publication venues and complete descriptions", () => {
  assert.equal((homepage.match(/class="card-venue venue-pill"/g) || []).length, 8);
  assert.equal((homepage.match(/class="publication-summary"/g) || []).length, 0);
  assert.ok(!/<details[^>]*\sopen(?:\s|>)/.test(homepage));
  assert.ok(homepage.includes("PAct generates complete, part-decomposed"));
});

test("keeps every coarse-pointer control at least 44px tall", () => {
  const phoneStart = stylesheet.indexOf("@media (max-width: 680px)");
  const coarseStart = stylesheet.indexOf("@media (pointer: coarse)");
  const coarseRules = stylesheet.slice(
    coarseStart,
    stylesheet.indexOf("/* --- Reduced motion --- */")
  );

  assert.ok(phoneStart >= 0 && coarseStart > phoneStart);
  assert.ok(coarseRules.includes("#pub-filter-bar .pub-filter-btn"));
  assert.ok(coarseRules.includes(".research-row .card-links a"));
  assert.ok(coarseRules.includes("min-height: 44px"));
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
    toggle(value, force) {
      if (force) values.add(value);
      else values.delete(value);
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
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    addEventListener(event, handler) {
      listeners[filter] = handler;
    },
  }));
  const cards = [
    { attributes: { "data-year": "2026" }, classList: classList() },
    { attributes: { "data-year": "2026" }, classList: classList() },
    {
      attributes: { "data-year": "2025", "data-category": "position" },
      classList: classList(),
    },
    { attributes: { "data-year": "2025" }, classList: classList() },
  ].map((card) => ({
    ...card,
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

test("publication filtering handles all four branches and button states", () => {
  const cases = [
    ["all", [true, true, true, true]],
    ["2026", [true, true, false, false]],
    ["2025", [false, false, true, true]],
    ["position", [false, false, true, false]],
  ];

  for (const [filter, expectedVisibility] of cases) {
    const { buttons, cards, listeners } = filterHarness();
    const selectedIndex = buttons.findIndex(
      (button) => button.attributes["data-filter"] === filter
    );
    listeners[filter].call(buttons[selectedIndex]);

    assert.deepEqual(
      cards.map((card) => !card.classList.contains("hidden")),
      expectedVisibility,
      `${filter} visibility`
    );
    assert.deepEqual(
      buttons.map((button) => button.classList.contains("active")),
      buttons.map((_, index) => index === selectedIndex),
      `${filter} active class`
    );
    assert.deepEqual(
      buttons.map((button) => button.attributes["aria-pressed"]),
      buttons.map((_, index) => String(index === selectedIndex)),
      `${filter} pressed state`
    );
  }
});
