const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");

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
