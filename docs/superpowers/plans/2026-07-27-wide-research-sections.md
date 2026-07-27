# Wide Research Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand only the homepage Projects and Publications sections to a centered 1120px maximum on wide screens and enlarge their media columns without changing the rest of the homepage.

**Architecture:** Wrap each research section in a dedicated `.research-section` boundary while preserving the existing Markdown headings and research content. Add a viewport-safe CSS breakout above 900px, then increase only the wide-screen media columns above 1024px; existing tablet and phone rules continue to govern smaller viewports.

**Tech Stack:** Jekyll, Kramdown, HTML, CSS, Node.js built-in test runner

## Global Constraints

- The normal homepage `.page` remains capped at 900px.
- Only Projects and Publications may expand to a maximum of 1120px.
- The expanded section must retain at least 1rem of viewport space on each side.
- At 1025px and wider, Projects use a 300px media column and Publications use 230px.
- At 769px–1024px, Projects remain 245px and Publications remain 195px.
- At 560px–768px, Projects remain 170px and Publications remain 145px.
- At 559px and below, Projects remain stacked and Publications remain 104px.
- Existing 16:9 frames, `object-fit: cover`, and the Open3D `object-fit: contain` exception remain unchanged.
- Homepage content outside Projects and Publications must remain unchanged.
- Production and local Jekyll configuration files must remain unchanged.

---

### Task 1: Add bounded research-section wrappers

**Files:**
- Modify: `_pages/about.md`
- Modify: `test/research-sections.test.js`

**Interfaces:**
- Consumes: the existing `## Projects {#projects}` and `## Publications {#publications}` headings and their lists.
- Produces: `.research-section.research-projects-section` and `.research-section.research-publications-section` wrapper elements for Task 2.

- [ ] **Step 1: Write the failing structure test**

First replace `beforeProjects` with a wrapper-aware boundary so the scope test
continues to compare only the homepage content that precedes the research
section:

```js
const projectsSectionMarker =
  '<section class="research-section research-projects-section" markdown="1">';

function beforeProjects(markdown) {
  const headingIndex = markdown.indexOf(projectsMarker);
  const wrapperIndex = markdown.indexOf(projectsSectionMarker);
  const sectionStart =
    wrapperIndex !== -1 && wrapperIndex < headingIndex
      ? wrapperIndex
      : headingIndex;
  return markdown.slice(0, sectionStart);
}
```

Then add these assertions to the semantic-row test:

```js
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
```

The existing scope test must remain byte-for-byte equal before the Projects
section. Keep all existing text/link/image/filter assertions unchanged.

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
bundle exec jekyll build --config _config.yml,_config_local.yml
node --test test/research-sections.test.js
```

Expected: FAIL because neither `.research-section` wrapper exists.

- [ ] **Step 3: Add the Projects wrapper**

Immediately before the Projects heading, add:

```html
<section class="research-section research-projects-section" markdown="1">
```

Immediately after the closing `</div>` of `.project-list`, add:

```html
</section>
```

Keep `## Projects {#projects}` and every existing project element unchanged.

- [ ] **Step 4: Add the Publications wrapper**

Immediately before the Publications heading, add:

```html
<section class="research-section research-publications-section" markdown="1">
```

Immediately after the closing `</div>` of `.publication-list` and before the filter script, add:

```html
</section>
```

Keep `## Publications {#publications}`, the filter bar, every publication, and the script unchanged.

- [ ] **Step 5: Build and run the focused test**

Run:

```bash
bundle exec jekyll build --config _config.yml,_config_local.yml
node --test test/research-sections.test.js
```

Expected: the Jekyll build succeeds, both wrappers render as `<section>`, and all focused tests PASS.

- [ ] **Step 6: Commit**

```bash
git add _pages/about.md test/research-sections.test.js
git commit -m "refactor: bound homepage research sections"
```

### Task 2: Add the wide breakout and media columns

**Files:**
- Modify: `assets/css/custom.css`
- Modify: `test/research-sections.test.js`

**Interfaces:**
- Consumes: the two `.research-section` wrappers from Task 1.
- Produces: a centered viewport-safe breakout and wide-screen media-column overrides.

- [ ] **Step 1: Write the failing CSS contract**

In the flat-row layout test, add:

```js
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
  /grid-template-columns: 300px minmax\(0, 1fr\);/
);
assert.match(
  cssRule(wide, ".publication-row"),
  /grid-template-columns: 230px minmax\(0, 1fr\);/
);
```

Keep the existing assertions for the base 245px/195px columns, the 768px breakpoint, and the 559px breakpoint.

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
node --test test/research-sections.test.js
```

Expected: FAIL because `.research-section` and both min-width media queries are absent.

- [ ] **Step 3: Add the base and breakout styles**

Above the existing `.project-list, .publication-list` rule, add:

```css
.research-section {
  width: 100%;
}

@media (min-width: 901px) {
  .research-section {
    left: 50%;
    position: relative;
    transform: translateX(-50%);
    width: min(1120px, calc(100vw - 2rem));
  }
}
```

- [ ] **Step 4: Add the wide media columns**

After the base `.publication-row` rule and before the existing max-width media queries, add:

```css
@media (min-width: 1025px) {
  .project-row {
    grid-template-columns: 300px minmax(0, 1fr);
  }

  .publication-row {
    grid-template-columns: 230px minmax(0, 1fr);
  }
}
```

Do not change the base, tablet, or phone column rules.

- [ ] **Step 5: Run focused and full verification**

Run:

```bash
node --test test/research-sections.test.js
node --test
bundle exec jekyll build --config _config.yml,_config_local.yml
```

Expected: all tests PASS and the Jekyll build succeeds.

- [ ] **Step 6: Commit**

```bash
git add assets/css/custom.css test/research-sections.test.js
git commit -m "style: widen homepage research sections"
```

### Task 3: Verify the rendered layouts

**Files:**
- No source changes expected.

**Interfaces:**
- Consumes: the rendered local homepage from Tasks 1 and 2.
- Produces: measured browser evidence and a final preview screenshot.

- [ ] **Step 1: Start the local preview**

Run:

```bash
bundle exec jekyll serve -l -H localhost --config _config.yml,_config_local.yml
```

Expected: the preview is available at `http://localhost:4000/` and CSS assets load from the same origin.

- [ ] **Step 2: Verify 1280px**

Measure the rendered page:

- `.page` is 900px.
- Each `.research-section` is 1120px and centered.
- Projects use a 300px image column.
- Publications use a 230px image column.
- Document horizontal overflow is 0.

- [ ] **Step 3: Verify 1024px, 768px, and 390px**

Measure each layout:

- 1024px: research section is 992px, Projects 245px, Publications 195px.
- 768px: research section aligns to the 736px content width, Projects 170px, Publications 145px.
- 390px: Projects are a single stacked column, Publications use 104px, and overflow is 0.

- [ ] **Step 4: Verify themes and filtering**

Confirm:

- dark and light themes remain readable;
- switching among All, 2026, 2025, and Position Papers retains the expected 10/7/3/1 visible counts;
- images preserve the 16:9 frames without geometric stretching;
- Open3D remains contained rather than cropped.

- [ ] **Step 5: Review final scope**

Run:

```bash
git diff --check
git status --short
git diff d21c654..HEAD -- _pages/about.md assets/css/custom.css test/research-sections.test.js
```

Expected: implementation changes are limited to the two research wrappers, their scoped CSS, and corresponding tests.
