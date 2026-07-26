# Flat Research Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace only the homepage Projects and Publications cards with the approved flat research-row layout while preserving all research content and every unrelated homepage region.

**Architecture:** Keep the existing Jekyll page, CSS file, and vanilla publication-filter script. Introduce semantic, section-specific row classes in `_pages/about.md`, style only those classes in `assets/css/custom.css`, and protect the unchanged homepage prefix plus research content with Node's built-in test runner.

**Tech Stack:** Jekyll/Liquid, semantic HTML, responsive CSS Grid, vanilla JavaScript, Node.js built-in `node:test`.

## Global Constraints

- Preserve the homepage exactly before `## Projects {#projects}`.
- Modify no navigation, profile, biography, research-interest, collaboration, footer, CV, or global layout content.
- Preserve two projects and ten publications in their current order.
- Preserve every title, author, author order, image path, year, category, venue, description sentence, and destination URL.
- Preserve the exact author-marker state at baseline commit `7950870`.
- Keep publication filter results at All 10, 2026 7, 2025 3, and Position Papers 1.
- Remove no content except the presentational literal `Description:` labels.
- Add no framework, font, dependency, modal, disclosure, carousel, or new data source.
- Keep full content visible without JavaScript.
- Keep light/dark themes, keyboard focus, 44px touch targets, and reduced-motion behavior.
- Produce no horizontal overflow at a 390px viewport.

---

## File map

- `_pages/about.md`: Projects and Publications markup only.
- `assets/css/custom.css`: existing site styles plus new research-section-scoped layout rules; unrelated selectors remain byte-for-byte unchanged.
- `assets/js/pub-filter.js`: read-only; filtering behavior must remain unchanged.
- `test/research-sections.test.js`: new structural, content-preservation, CSS-contract, and filter-behavior tests.
- `docs/superpowers/specs/2026-07-26-flat-research-sections-design.md`: approved requirements; read-only during implementation.

---

### Task 1: Protect scope and research content

**Files:**
- Create: `test/research-sections.test.js`
- Verify: `_pages/about.md:1-320`
- Verify: `assets/js/pub-filter.js:1-27`

**Interfaces:**
- Consumes: baseline homepage at Git commit `7950870` and the Jekyll output `_site/index.html`.
- Produces: tests that allow markup changes inside the research region while rejecting unrelated homepage or research-content changes.

- [ ] **Step 1: Build the baseline site**

Run:

```bash
bundle exec jekyll build
```

Expected: exit 0 and `_site/index.html` exists.

- [ ] **Step 2: Add the failing structural and preservation tests**

Create `test/research-sections.test.js` with:

```js
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
```

- [ ] **Step 3: Run the test to verify RED**

Run:

```bash
bundle exec jekyll build
node --test test/research-sections.test.js
```

Expected: the semantic-row test fails because `.research-row`,
`.project-row`, `.publication-row`, and `h3.card-title` do not exist and
`Description:` labels remain.

- [ ] **Step 4: Commit only the failing protection test**

```bash
git add test/research-sections.test.js
git commit -m "test: define flat research section contract"
```

---

### Task 2: Convert Projects and Publications to semantic flat rows

**Files:**
- Modify: `_pages/about.md:49-320`
- Test: `test/research-sections.test.js`

**Interfaces:**
- Consumes: Task 1's required class names and baseline-content comparison.
- Produces: `.project-list`, `.publication-list`, `.research-row`,
  `.project-row`, `.publication-row`, and `.card-title` markup for CSS.

- [ ] **Step 1: Convert both Projects items**

Wrap the two project articles in:

```html
<div class="project-list" aria-label="Research projects">
  <!-- two project articles -->
</div>
```

Convert each project from the generic wrapper:

```html
<div class="card">
```

to:

```html
<article class="research-row project-row">
```

and close it with `</article>`.

Wrap each existing project title link in:

```html
<h3 class="card-title">
  <a href="https://github.com/DexForce/EmbodiChain" class="papertitle">EmbodiChain: An end-to-end, GPU-accelerated, and modular platform for building generalized Embodied Intelligence</a>
</h3>
```

Use the same `h3.card-title` wrapper around the existing Open3D link without
changing its destination or title. Keep Website and Code links unchanged.
For EmbodiChain, replace:

```html
<p class="card-desc"><strong>Description:</strong> EmbodiChain is a unified, GPU-accelerated framework designed for pushing the boundaries of embodied AI research and development. It integrates high-performance simulation, data collection via automated generative simulation techniques, data scaling pipeline, modular model architectures, and efficient training & evaluation tools. All of these components work seamlessly together to facilitate rapid experimentation and deployment of embodied intelligence and perform Sim2Real transfer into real-world robotic systems.</p>
```

with:

```html
<p class="card-desc">EmbodiChain is a unified, GPU-accelerated framework designed for pushing the boundaries of embodied AI research and development. It integrates high-performance simulation, data collection via automated generative simulation techniques, data scaling pipeline, modular model architectures, and efficient training & evaluation tools. All of these components work seamlessly together to facilitate rapid experimentation and deployment of embodied intelligence and perform Sim2Real transfer into real-world robotic systems.</p>
```

Remove the same literal `<strong>Description:</strong>` prefix from Open3D
without changing any following words.

- [ ] **Step 2: Convert all ten Publications items**

Place the ten publication articles inside:

```html
<div class="publication-list" aria-label="Selected publications">
  <!-- ten publication articles -->
</div>
```

For PAct, APG, FTC, AgentChord, YOTO++, EWA, Sim2Real-VLA, GS-World,
DexScale, and YOTO, replace:

```html
<div class="card pub-card" data-year="2026">
```

with:

```html
<article class="research-row publication-row pub-card" data-year="2026">
```

For GS-World, retain both `data-year="2025"` and
`data-category="position"`. For DexScale and YOTO, retain
`data-year="2025"`. Close every converted item with `</article>`.

For PAct, use:

```html
<h3 class="card-title"><a href="https://pact-project.github.io/" class="papertitle">PAct: Part-Decomposed Single-View Articulated Object Generation</a></h3>
```

Wrap each of the other nine existing `.papertitle` links or spans in the same
`h3.card-title` element without changing the enclosed element. Do not change
title text, author markup, venue markup, `.card-links`, `.pub-tag`,
year/category attributes, or destinations. Remove only the literal
`<strong>Description:</strong>` prefix from the nine publications that have
descriptions. Leave GS-World without an invented description.

- [ ] **Step 3: Build and run the structural tests**

Run:

```bash
bundle exec jekyll build
node --test test/research-sections.test.js
```

Expected: all tests pass, including exact baseline text, link, image, and
metadata comparisons.

- [ ] **Step 4: Inspect the scope diff**

Run:

```bash
git diff -- _pages/about.md
git diff --check
```

Expected: `_pages/about.md` changes only from `## Projects {#projects}` through
the publication list; no text changes appear except removal of the literal
`Description:` labels.

- [ ] **Step 5: Commit the markup**

```bash
git add _pages/about.md
git commit -m "refactor: structure research sections as flat rows"
```

---

### Task 3: Implement the flat research-row visual system

**Files:**
- Modify: `assets/css/custom.css:196-356`
- Modify: `test/research-sections.test.js`

**Interfaces:**
- Consumes: Task 2's `.project-list`, `.publication-list`, `.research-row`,
  `.project-row`, `.publication-row`, and `.card-title` hooks.
- Produces: desktop, tablet, phone, light-theme, dark-theme, focus, and touch
  behavior without changing unrelated site selectors.

- [ ] **Step 1: Add a failing CSS-contract test**

Append:

```js
test("defines scoped flat-row styles and responsive touch behavior", () => {
  const requiredSelectors = [
    ".project-list",
    ".publication-list",
    ".research-row",
    ".project-row",
    ".publication-row",
    ".publication-row .card-image",
    ".project-row .card-image",
    ".research-row .card-title",
  ];

  for (const selector of requiredSelectors) {
    assert.ok(stylesheet.includes(selector), `Missing ${selector}`);
  }

  assert.ok(stylesheet.includes("@media (max-width: 768px)"));
  assert.ok(stylesheet.includes("@media (max-width: 559px)"));
  assert.ok(stylesheet.includes("min-height: 44px"));
  assert.ok(!stylesheet.includes(".research-row:hover {\n  transform:"));
});
```

- [ ] **Step 2: Run the focused test to verify RED**

Run:

```bash
node --test test/research-sections.test.js
```

Expected: the CSS-contract test fails because the scoped selectors and 559px
breakpoint are absent.

- [ ] **Step 3: Add scoped desktop styles**

Leave the existing intro, page, global heading, and generic `.card` rules
unchanged. Add a new block after the existing generic card rules:

```css
/* --- Flat homepage research sections --- */
.project-list,
.publication-list {
  border-bottom: 1px solid var(--c-border);
  border-top: 1px solid var(--c-border);
  display: grid;
}

.research-row {
  align-items: start;
  background: transparent;
  display: grid;
  gap: 1.25rem;
  margin: 0;
  min-width: 0;
  padding: 0.9rem 0;
}

.research-row + .research-row {
  border-top: 1px solid var(--c-border);
}

.project-row {
  align-items: center;
  gap: 1.5rem;
  grid-template-columns: 230px minmax(0, 1fr);
  padding: 1.1rem 0;
}

.publication-row {
  grid-template-columns: 180px minmax(0, 1fr);
}

.project-row .card-image,
.publication-row .card-image {
  background: var(--c-surface-alt);
  overflow: hidden;
  width: 100%;
}

.project-row .card-image {
  aspect-ratio: 16 / 9;
}

.publication-row .card-image {
  aspect-ratio: 16 / 9;
}

.project-row .card-image img,
.publication-row .card-image img {
  border-radius: 3px;
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.project-row .card-image img[alt="Open3D"] {
  background: #ffffff;
  object-fit: contain;
}

.research-row .card-content {
  min-width: 0;
}

.research-row .card-title {
  font-size: inherit;
  line-height: inherit;
  margin: 0;
}

.research-row .papertitle {
  color: var(--c-accent);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
  margin: 0 0 0.28rem;
  overflow-wrap: anywhere;
}

.research-row a.papertitle:hover {
  color: var(--c-link-hover);
}

.research-row .card-authors {
  color: var(--c-text-muted);
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0.2rem 0;
}

.research-row .card-venue {
  color: var(--c-text-secondary);
  font-size: 0.8125rem;
  font-style: italic;
  font-weight: 600;
  line-height: 1.45;
  margin: 0.18rem 0;
}

.research-row .card-links {
  color: var(--c-text-note);
  font-size: 0.8rem;
  line-height: 1.45;
  margin: 0.28rem 0;
}

.research-row .card-links a {
  font-size: inherit;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--c-link) 35%, transparent);
  text-underline-offset: 3px;
}

.research-row .card-links a:hover {
  text-decoration-color: currentColor;
}

.research-row .card-desc {
  color: var(--c-text-muted);
  font-size: 0.84rem;
  line-height: 1.55;
  margin: 0.35rem 0 0;
}

.project-row .card-desc {
  font-size: 0.9rem;
  line-height: 1.62;
}

.research-row .pub-tag {
  border: 1px solid var(--c-border);
  border-radius: 3px;
  font-size: 0.7rem;
  margin: 0.1rem 0 0.2rem;
  padding: 0.18rem 0.38rem;
}
```

- [ ] **Step 4: Restyle the publication filters as text tabs**

Add later, section-specific overrides without altering the button text or
JavaScript:

```css
#pub-filter-bar {
  align-items: center;
  border-bottom: 1px solid var(--c-border);
  display: flex;
  gap: 1.15rem;
  margin: 0 0 0.15rem;
}

#pub-filter-bar .pub-filter-btn {
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  color: var(--c-text-note);
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: -1px;
  min-height: 40px;
  padding: 0.35rem 0.05rem;
}

#pub-filter-bar .pub-filter-btn:hover {
  background: transparent;
  color: var(--c-text);
}

#pub-filter-bar .pub-filter-btn.active {
  background: transparent;
  border-bottom-color: var(--c-accent);
  color: var(--c-text);
}
```

- [ ] **Step 5: Add tablet, phone, focus, and touch rules**

Add after the desktop research rules:

```css
@media (max-width: 768px) {
  .project-row {
    gap: 1.1rem;
    grid-template-columns: 160px minmax(0, 1fr);
  }

  .publication-row {
    gap: 1rem;
    grid-template-columns: 140px minmax(0, 1fr);
  }
}

@media (max-width: 559px) {
  .project-row {
    gap: 0.85rem;
    grid-template-columns: minmax(0, 1fr);
  }

  .publication-row {
    gap: 0.8rem;
    grid-template-columns: 104px minmax(0, 1fr);
  }

  .publication-row .papertitle {
    font-size: 0.94rem;
  }

  .publication-row .card-authors {
    font-size: 0.8rem;
  }

  #pub-filter-bar {
    column-gap: 0.85rem;
    flex-wrap: wrap;
  }
}

@media (pointer: coarse) {
  #pub-filter-bar .pub-filter-btn,
  .research-row .card-links a {
    align-items: center;
    display: inline-flex;
    min-height: 44px;
  }
}
```

Ensure the existing `@media (max-width: 768px) .card` rule cannot override the
new grid rows. Because `.research-row` no longer has `.card`, it should not
match.

- [ ] **Step 6: Build and run all automated checks**

Run:

```bash
bundle exec jekyll build
node --test test/*.test.js
git diff --check
```

Expected: Jekyll exits 0, all tests pass, and the diff check is clean.

- [ ] **Step 7: Inspect CSS scope and commit**

Run:

```bash
git diff -- assets/css/custom.css test/research-sections.test.js
```

Expected: existing profile, page, global heading, footer, and navigation rules
are unchanged; additions are rooted in research-section selectors or their
dedicated responsive rules.

Commit:

```bash
git add assets/css/custom.css test/research-sections.test.js
git commit -m "style: redesign homepage research sections"
```

---

### Task 4: Real-browser verification and preview delivery

**Files:**
- Verify: `_pages/about.md`
- Verify: `assets/css/custom.css`
- Verify: `assets/js/pub-filter.js`
- Verify: `test/research-sections.test.js`
- Temporary only: `_config_visual_check.yml`
- Temporary only: desktop and phone screenshot files outside tracked source

**Interfaces:**
- Consumes: Tasks 1–3's rendered research sections.
- Produces: measured responsive/theme/filter evidence and final desktop/mobile preview images.

- [ ] **Step 1: Run a fresh full verification**

Run:

```bash
bundle exec jekyll build
node --test test/*.test.js
git diff --check 7950870..HEAD
```

Expected: build succeeds, all tests pass, and no formatting errors are reported.

- [ ] **Step 2: Start a no-watch local preview**

Create `_config_visual_check.yml` containing:

```yaml
url: "http://localhost:4022"
```

Run:

```bash
bundle exec jekyll serve \
  --host 127.0.0.1 \
  --port 4022 \
  --no-watch \
  --config _config.yml,_config_visual_check.yml
```

- [ ] **Step 3: Verify desktop and both themes**

At 1200×900, verify:

```js
({
  projectRows: document.querySelectorAll(".project-row").length,
  publicationRows: document.querySelectorAll(".publication-row").length,
  overflow:
    document.documentElement.scrollWidth -
    document.documentElement.clientWidth,
})
```

Expected:

```js
{ projectRows: 2, publicationRows: 10, overflow: 0 }
```

Confirm in light and dark themes:

- Transparent rows and readable separators.
- Open3D is not cropped.
- All descriptions are visible.
- No card shadow, alternating fill, or hover lift.
- Focus indicators remain visible.

- [ ] **Step 4: Verify tablet and phone**

At 820×900:

- Projects use approximately 230px images because the desktop breakpoint still
  applies.
- Publications use approximately 180px thumbnails.
- No horizontal overflow.

At 390×844:

- Projects stack to one column.
- Publications use two columns with an approximately 104px thumbnail.
- Filters wrap.
- No horizontal overflow.
- Coarse-pointer links and filter buttons measure at least 44px high.

- [ ] **Step 5: Verify real-page filters**

Click each filter and verify visible `.pub-card:not(.hidden)` counts:

```text
All             10
2026             7
2025             3
Position Papers  1
```

Verify exactly one filter has `.active` after every click.

- [ ] **Step 6: Capture the requested previews**

Capture:

- Desktop light-theme screenshot focused on Projects and the first publication
  rows.
- Phone light-theme screenshot focused on the same research sections.

Save the screenshots to temporary absolute paths and include both images in the
final response.

- [ ] **Step 7: Check console, clean temporary files, and stop the server**

Expected:

- No browser console errors or warnings caused by the homepage.
- `_config_visual_check.yml` is deleted.
- Preview server is stopped.
- Browser viewport override is reset.

- [ ] **Step 8: Run final repository verification**

Run:

```bash
bundle exec jekyll build
node --test test/*.test.js
git diff --check 7950870..HEAD
git status --short --branch
```

Expected:

- Build succeeds.
- All tests pass.
- No formatting errors.
- Only the user-owned untracked `.superpowers/` and `output/` directories remain.

- [ ] **Step 9: Request independent code review**

Review range:

```bash
review_base=e6a8e85
review_head=$(git rev-parse HEAD)
```

The reviewer must confirm:

- No Critical or Important issues.
- No changes outside Projects/Publications and their scoped assets/tests.
- Content and filtering preserved.
- Responsive and theme requirements covered.

Fix Critical and Important findings, rerun Step 8, and commit any corrections
before final delivery.
