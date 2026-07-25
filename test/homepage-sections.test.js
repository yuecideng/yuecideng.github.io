const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");

const homepage = fs.readFileSync("_site/index.html", "utf8");

test("renders projects as a two-item editorial collection", () => {
  const start = homepage.indexOf(
    '<div class="projects-grid" aria-label="Research projects">'
  );
  const end = homepage.indexOf('<h2 id="publications">', start);
  const grid = homepage.slice(start, end);

  assert.ok(start >= 0 && end > start, "Missing rendered projects grid");
  assert.equal((grid.match(/class="project-card"/g) || []).length, 2);
  assert.ok(grid.includes('aria-label="Research projects"'));
});

test("renders publication controls and ten publication rows", () => {
  assert.ok(homepage.includes('class="publication-toolbar"'));
  assert.ok(homepage.includes('aria-label="Filter publications"'));
  assert.ok(homepage.includes('class="publication-list"'));
  assert.equal(
    (homepage.match(/class="publication-card pub-card"/g) || []).length,
    10
  );
  assert.equal((homepage.match(/<h3 class="card-title">/g) || []).length, 12);
});

test("uses action links and natural descriptions", () => {
  assert.ok(homepage.includes('class="action-links project-links"'));
  assert.ok(homepage.includes('class="action-links publication-links"'));
  assert.ok(homepage.includes('class="action-link"'));
  assert.ok(homepage.includes("Paper / Project / Code (Coming Soon)"));
  assert.ok(!homepage.includes("<strong>Description:</strong>"));
  assert.ok(homepage.includes("PAct generates complete, part-decomposed"));
});

test("renders the approved editorial section headings", () => {
  assert.ok(
    homepage.includes(
      '<div class="section-heading"><h2 id="projects">Featured Projects</h2><span class="section-subtitle">Systems for embodied intelligence</span></div>'
    )
  );
  assert.ok(
    homepage.includes(
      '<div class="section-heading"><h2 id="publications">Publications</h2><span class="section-subtitle">10 selected works</span></div>'
    )
  );
});

test("keeps project cards compact while preserving complete details", () => {
  assert.equal((homepage.match(/class="project-details"/g) || []).length, 2);
  assert.ok(
    homepage.includes(
      '<h3 class="card-title"><a href="https://github.com/DexForce/EmbodiChain" class="papertitle">EmbodiChain</a></h3>'
    )
  );
  assert.ok(
    homepage.includes(
      '<p class="project-tagline">GPU-accelerated platform for scalable embodied AI.</p>'
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

test("renders publication venues and summaries as compact secondary content", () => {
  assert.equal((homepage.match(/class="card-venue venue-pill"/g) || []).length, 7);
  assert.equal((homepage.match(/class="publication-summary"/g) || []).length, 9);
  assert.ok(homepage.includes("<summary>Summary</summary>"));
  assert.ok(!/<details[^>]*\sopen(?:\s|>)/.test(homepage));
  assert.ok(homepage.includes("PAct generates complete, part-decomposed"));
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
