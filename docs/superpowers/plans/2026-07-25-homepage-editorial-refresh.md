# Homepage Editorial Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the homepage with a unified editorial visual system, a responsive project grid, and a dense accessible publication list without changing research content or ordering.

**Architecture:** Keep the existing Jekyll page and vanilla JavaScript architecture. Add content-specific wrappers and classes in `_pages/about.md`, use `assets/css/custom.css` for the complete responsive visual system, and extend the existing filter script only to synchronize accessible button state.

**Tech Stack:** Jekyll/Liquid, semantic HTML, CSS custom properties and responsive CSS Grid, vanilla JavaScript, Node.js built-in test runner.

## Global Constraints

- Preserve all existing homepage text, project order, publication order, author order, author markers, filter values, and external destinations.
- Do not add a framework, external JavaScript dependency, CMS, or build dependency.
- Keep light and dark themes equally legible.
- Keep all publication descriptions complete; do not clamp or truncate them.
- Respect `prefers-reduced-motion: reduce`.

---

### Task 1: Projects and Publications Semantic Structure

**Files:**
- Create: `test/homepage-sections.test.js`
- Modify: `_pages/about.md:50-321`
- Modify: `test/publication-author-markers.test.js:6-10`

**Interfaces:**
- Consumes: Jekyll's generated `_site/index.html`.
- Produces: `.projects-grid`, `.project-card`, `.publication-toolbar`, `.publication-list`, `.publication-card`, `.action-links`, and `.action-link` markup for CSS and filtering.

- [ ] **Step 1: Write the failing rendered-homepage tests**

```js
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
  assert.ok(homepage.includes('class="action-links"'));
  assert.ok(homepage.includes('class="action-link"'));
  assert.ok(!homepage.includes("<strong>Description:</strong>"));
  assert.ok(homepage.includes("PAct generates complete, part-decomposed"));
});
```

- [ ] **Step 2: Build and run the tests to verify RED**

Run:

```bash
bundle exec jekyll build
node --test test/homepage-sections.test.js
```

Expected: three failures because the new wrappers and classes are absent and the old `Description:` labels remain.

- [ ] **Step 3: Add the minimal semantic wrappers and classes**

In `_pages/about.md`:

- Wrap the two existing project cards in `<div class="projects-grid" aria-label="Research projects">`.
- Change their outer classes to `project-card`, retain their images, text, order, and destinations, and change their link groups to `action-links project-links`.
- Add `class="action-link"` to each available project destination and existing icons (`fas fa-globe`, `fab fa-github`).
- Remove only the `<strong>Description:</strong>` prefix from each description.
- Wrap the filter bar and shared legend in `<div class="publication-toolbar">`.
- Add `type="button"`, `aria-pressed`, and `aria-label="Filter publications"` semantics to the controls.
- Wrap all publication cards in `<div class="publication-list">`.
- Change every publication outer class from `card pub-card` to `publication-card pub-card`.
- Change each publication link group to `action-links publication-links`, add `class="action-link"` to every real link, and preserve non-interactive Coming Soon text.
- Remove only the `<strong>Description:</strong>` prefix from publication descriptions.
- Update the publication-card extraction regex in `test/publication-author-markers.test.js` from `card pub-card` to `publication-card pub-card`; keep every authorship expectation unchanged.

- [ ] **Step 4: Build and run the tests to verify GREEN**

Run:

```bash
bundle exec jekyll build
node --test test/homepage-sections.test.js test/publication-author-markers.test.js
```

Expected: 6 tests pass, including the original publication marker coverage.

- [ ] **Step 5: Commit**

```bash
git add _pages/about.md test/homepage-sections.test.js test/publication-author-markers.test.js
git commit -m "refactor: structure homepage research sections"
```

### Task 2: Accessible Publication Filtering

**Files:**
- Modify: `test/homepage-sections.test.js`
- Modify: `assets/js/pub-filter.js`

**Interfaces:**
- Consumes: `.pub-filter-btn`, `.pub-card`, `data-filter`, `data-year`, and `data-category`.
- Produces: synchronized `.active`, `.hidden`, and `aria-pressed` states after every filter selection.

- [ ] **Step 1: Add a failing behavior test that executes the real script**

Append to `test/homepage-sections.test.js`:

```js
const vm = require("node:vm");

function classList(initial = []) {
  const values = new Set(initial);
  return {
    add(value) { values.add(value); },
    remove(value) { values.delete(value); },
    toggle(value, force) {
      if (force) values.add(value);
      else values.delete(value);
    },
    contains(value) { return values.has(value); },
  };
}

test("publication filtering synchronizes visibility and pressed state", () => {
  const listeners = {};
  const buttons = ["all", "2026", "2025", "position"].map((filter, index) => ({
    attributes: { "data-filter": filter },
    classList: classList(index === 0 ? ["active"] : []),
    getAttribute(name) { return this.attributes[name]; },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(event, handler) { listeners[filter] = handler; },
  }));
  const cards = [
    { attributes: { "data-year": "2026" }, classList: classList() },
    {
      attributes: { "data-year": "2025", "data-category": "position" },
      classList: classList(),
    },
  ].map((card) => ({
    ...card,
    getAttribute(name) { return this.attributes[name]; },
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

  assert.deepEqual(buttons.map((button) => button.attributes["aria-pressed"]), [
    "false", "false", "false", "true",
  ]);
  assert.equal(cards[0].classList.contains("hidden"), true);
  assert.equal(cards[1].classList.contains("hidden"), false);
});
```

- [ ] **Step 2: Run the behavior test to verify RED**

Run:

```bash
node --test --test-name-pattern="publication filtering" test/homepage-sections.test.js
```

Expected: failure because `aria-pressed` remains unchanged.

- [ ] **Step 3: Synchronize accessible state in the real filter script**

Inside the existing button loop in `assets/js/pub-filter.js`, set:

```js
var selectedButton = this;

buttons.forEach(function(b) {
  var isActive = b === selectedButton;
  b.classList.toggle('active', isActive);
  b.setAttribute('aria-pressed', String(isActive));
});
```

Retain the existing `all`, year, and `position` visibility branches.

- [ ] **Step 4: Run focused and full tests to verify GREEN**

Run:

```bash
node --test --test-name-pattern="publication filtering" test/homepage-sections.test.js
bundle exec jekyll build
node --test test/*.test.js
```

Expected: all homepage and author-marker tests pass.

- [ ] **Step 5: Commit**

```bash
git add assets/js/pub-filter.js test/homepage-sections.test.js
git commit -m "feat: expose publication filter state"
```

### Task 3: Editorial Visual System

**Files:**
- Modify: `assets/css/custom.css:3-403`

**Interfaces:**
- Consumes: the semantic classes from Task 1.
- Produces: shared theme tokens, project grid, publication rows, action chips, responsive layouts, focus states, dark-theme parity, and reduced-motion handling.

- [ ] **Step 1: Replace the generic card system with content-specific styles**

Update `assets/css/custom.css` to:

- Add `--c-surface-strong`, `--c-border-soft`, `--c-shadow`, `--c-shadow-hover`, and `--c-focus` theme variables in both themes.
- Set `.page` to `max-width: 1040px`.
- Refine intro spacing, portrait border/shadow, and shared section headings without changing intro markup.
- Add `.projects-grid` as a two-column CSS Grid.
- Add vertical `.project-card` surfaces with 16:9 `.project-card .card-image` frames.
- Add `.publication-list` and grid-based `.publication-card` rows with a 224px 16:9 thumbnail column.
- Add `.action-links` and `.action-link` chips; hide the legacy text separators by removing them from the markup rather than with CSS.
- Add `.publication-toolbar` and refine filter buttons and the author legend.
- Keep `.pub-card.hidden { display: none; }`.
- Add `:focus-visible`, pointer-hover, and `prefers-reduced-motion` rules.

- [ ] **Step 2: Add tablet and phone adaptations**

At `max-width: 860px`, reduce publication thumbnail width and gaps. At `max-width: 680px`, switch projects to one column, stack publication cards, make images full-width 16:9, center the intro, and allow controls and action chips to wrap without overflow.

- [ ] **Step 3: Build and run the complete test suite**

Run:

```bash
bundle exec jekyll build
node --test test/*.test.js
```

Expected: Jekyll exits 0 and all tests pass.

- [ ] **Step 4: Inspect the generated homepage at representative widths**

Open the locally served homepage and check:

- 1200px: two-column projects and compact horizontal publications.
- 820px: narrower publication thumbnails without text overflow.
- 390px: single-column projects and stacked publication cards.
- Both themes: readable surfaces, controls, metadata, badges, and focus outlines.
- All four filters: correct visible publication cards and active state.

- [ ] **Step 5: Commit**

```bash
git add assets/css/custom.css
git commit -m "style: refresh homepage research sections"
```

### Task 4: Final Regression Verification

**Files:**
- Verify: `_pages/about.md`
- Verify: `assets/css/custom.css`
- Verify: `assets/js/pub-filter.js`
- Verify: `test/homepage-sections.test.js`
- Verify: `test/publication-author-markers.test.js`

**Interfaces:**
- Consumes: all prior task outputs.
- Produces: a verified, buildable homepage refresh.

- [ ] **Step 1: Run formatting and content-preservation checks**

```bash
git diff --check HEAD~3..HEAD
git diff --stat HEAD~3..HEAD
```

Review the full diff and confirm there are no unrelated files, changed research text, reordered cards, or altered author markers.

- [ ] **Step 2: Run fresh full verification**

```bash
bundle exec jekyll build
node --test test/*.test.js
```

Expected: exit code 0 for both commands and zero test failures.

- [ ] **Step 3: Confirm repository state**

```bash
git status --short --branch
git log -4 --oneline
```

Expected: clean working tree with the design, structure, accessibility, and visual commits at the branch tip.
