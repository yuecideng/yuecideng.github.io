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
});

test("uses action links and natural descriptions", () => {
  assert.ok(homepage.includes('class="action-links project-links"'));
  assert.ok(homepage.includes('class="action-links publication-links"'));
  assert.ok(homepage.includes('class="action-link"'));
  assert.ok(!homepage.includes("<strong>Description:</strong>"));
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

test("publication filtering synchronizes visibility and pressed state", () => {
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
    {
      attributes: { "data-year": "2025", "data-category": "position" },
      classList: classList(),
    },
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
  listeners.position.call(buttons[3]);

  assert.deepEqual(
    buttons.map((button) => button.attributes["aria-pressed"]),
    ["false", "false", "false", "true"]
  );
  assert.equal(cards[0].classList.contains("hidden"), true);
  assert.equal(cards[1].classList.contains("hidden"), false);
});
