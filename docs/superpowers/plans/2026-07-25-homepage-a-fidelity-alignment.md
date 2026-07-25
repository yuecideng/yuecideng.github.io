# Homepage A-Fidelity Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the homepage with the approved compact A — Editorial Research reference while preserving complete research content in accessible native disclosures.

**Architecture:** Keep the existing Jekyll, CSS, and vanilla JavaScript structure. Update `_pages/about.md` so compact default content and complete disclosure content are distinct semantic regions, then adjust `assets/css/custom.css` to enforce the approved proportions and hierarchy without changing publication filtering.

**Tech Stack:** Jekyll/Liquid, semantic HTML `<details>`/`<summary>`, responsive CSS Grid, vanilla JavaScript, Node.js built-in test runner.

## Global Constraints

- Preserve project and publication ordering, all authors, author markers, filter values, image sources, and external destinations.
- Keep complete original project and publication descriptions in the rendered page.
- Add no external dependency or custom disclosure JavaScript.
- Keep light/dark themes, focus-visible states, 44px coarse-pointer targets, and reduced-motion behavior.
- Closed desktop project cards must be no taller than 450px at a 1200px viewport.
- Closed desktop publication rows must be no taller than 230px at a 1200px viewport.

---

### Task 1: Compact Semantic Content Structure

**Files:**
- Modify: `_pages/about.md:49-327`
- Modify: `test/homepage-sections.test.js:7-114`
- Verify: `test/publication-author-markers.test.js`

**Interfaces:**
- Consumes: Existing project/publication content, author markers, resource links, and filter attributes.
- Produces: `.section-heading`, `.section-subtitle`, `.project-tagline`, `.project-details`, `.publication-summary`, and `.venue-pill` markup for the compact visual layer.

- [ ] **Step 1: Add failing rendered-page tests**

Append the following tests to `test/homepage-sections.test.js`:

```js
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
  assert.ok(homepage.includes('<h3 class="card-title"><a href="https://github.com/DexForce/EmbodiChain" class="papertitle">EmbodiChain</a></h3>'));
  assert.ok(homepage.includes('<p class="project-tagline">GPU-accelerated platform for scalable embodied AI.</p>'));
  assert.ok(homepage.includes("EmbodiChain: An end-to-end, GPU-accelerated, and modular platform"));
  assert.ok(homepage.includes("All of these components work seamlessly together"));
});

test("renders publication venues and summaries as compact secondary content", () => {
  assert.equal((homepage.match(/class="card-venue venue-pill"/g) || []).length, 7);
  assert.equal((homepage.match(/class="publication-summary"/g) || []).length, 9);
  assert.ok(homepage.includes("<summary>Summary</summary>"));
  assert.ok(!/<details[^>]*\sopen(?:\s|>)/.test(homepage));
  assert.ok(homepage.includes("PAct generates complete, part-decomposed"));
});
```

- [ ] **Step 2: Build and run the focused tests to verify RED**

Run:

```bash
bundle exec jekyll build
node --test test/homepage-sections.test.js
```

Expected: the new tests fail because the editorial subtitles, short project display copy, disclosure wrappers, and venue pills do not exist.

- [ ] **Step 3: Implement the compact semantic markup**

In `_pages/about.md`:

- Replace the Projects Markdown heading with:

```html
<div class="section-heading"><h2 id="projects">Featured Projects</h2><span class="section-subtitle">Systems for embodied intelligence</span></div>
```

- Use `EmbodiChain` and `Open3D` as the visible project `<h3>` link text.
- Add the exact taglines:

```html
<p class="project-tagline">GPU-accelerated platform for scalable embodied AI.</p>
<p class="project-tagline">A modern library for 3D data processing.</p>
```

- Keep Website and Code actions visible.
- Wrap each original full project title and description in:

```html
<details class="project-details">
  <summary>Details</summary>
  <p class="project-full-title">...</p>
  <p class="card-desc">...</p>
</details>
```

- Replace the Publications Markdown heading with:

```html
<div class="section-heading"><h2 id="publications">Publications</h2><span class="section-subtitle">10 selected works</span></div>
```

- Add `venue-pill` to each existing `.card-venue`.
- Wrap each existing `.card-desc` publication paragraph in:

```html
<details class="publication-summary">
  <summary>Summary</summary>
  <p class="card-desc">...</p>
</details>
```

- Leave GS-World without an empty disclosure because it has no description.

- [ ] **Step 4: Build and run all tests to verify GREEN**

Run:

```bash
bundle exec jekyll build
node --test test/*.test.js
```

Expected: all homepage structure, filter behavior, and author-marker tests pass.

- [ ] **Step 5: Commit**

```bash
git add _pages/about.md test/homepage-sections.test.js
git commit -m "refactor: compact homepage research content"
```

### Task 2: Reference-Aligned Visual Density

**Files:**
- Modify: `assets/css/custom.css:255-714`

**Interfaces:**
- Consumes: Task 1's compact semantic classes.
- Produces: reference-aligned section headings, card proportions, venue pills, disclosure controls, filters, responsive layouts, and theme states.

- [ ] **Step 1: Restyle section headings and project tiles**

In `assets/css/custom.css`:

- Add a flex `.section-heading` with baseline-aligned `.section-subtitle`.
- Reset `.section-heading h2` so it has no underline or full-width border.
- Change project image frames from `aspect-ratio: 16 / 9` to `aspect-ratio: 2.35 / 1`.
- Reduce project card shadow, content padding, and vertical gaps.
- Style `.project-tagline` as muted one-sentence copy.
- Style `.project-details` and its `<summary>` as a lightweight disclosure below visible actions.
- Keep `.project-full-title` visually distinct inside the open disclosure.

- [ ] **Step 2: Compact publication rows and controls**

- Remove the publication toolbar background, border, radius, and large padding.
- Change publication columns to `184px minmax(0, 1fr)` with 3:2 images.
- Reduce publication padding, gap, and shadow.
- Style `.venue-pill` as a compact teal badge.
- Style `.publication-summary` and its `<summary>` as secondary controls.
- Remove the always-visible description border and apply it only inside an open disclosure.
- Keep action links smaller on fine pointers and 44px tall on coarse pointers.

- [ ] **Step 3: Preserve tablet and mobile behavior**

- At `max-width: 860px`, use a `164px` publication image column.
- At `max-width: 680px`, stack publication rows and project cards, wrap section subtitles, and retain full-width 3:2 publication images.
- Ensure disclosure controls wrap without overflow and remain keyboard focusable.

- [ ] **Step 4: Build and run all tests**

Run:

```bash
bundle exec jekyll build
node --test test/*.test.js
git diff --check
```

Expected: Jekyll exits 0, all tests pass, and the diff check is clean.

- [ ] **Step 5: Commit**

```bash
git add assets/css/custom.css
git commit -m "style: align homepage with editorial reference"
```

### Task 3: Visual and Regression Verification

**Files:**
- Verify: `_pages/about.md`
- Verify: `assets/css/custom.css`
- Verify: `assets/js/pub-filter.js`
- Verify: `test/homepage-sections.test.js`
- Verify: `test/publication-author-markers.test.js`

**Interfaces:**
- Consumes: the complete A-fidelity implementation.
- Produces: measured evidence that the rendered site matches the approved density without regressions.

- [ ] **Step 1: Run fresh full verification**

```bash
bundle exec jekyll build
node --test test/*.test.js
git diff --check HEAD~2..HEAD
```

Expected: build success, zero test failures, and no formatting errors.

- [ ] **Step 2: Verify desktop metrics and themes**

At 1200×900 in a browser, evaluate the closed card rectangles:

- Both project cards are at most 450px tall.
- Every publication card is at most 230px tall.
- Projects remain two columns.
- Venue pills, filters, and disclosure summaries are readable in both themes.

- [ ] **Step 3: Verify tablet and mobile layouts**

At 820×900 and 390×844:

- `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- Tablet projects remain two columns and publications use the narrower thumbnail column.
- Mobile projects and publications stack to one column.
- Disclosures open and close without moving content outside the viewport.

- [ ] **Step 4: Verify filter behavior in the real page**

- All: 10 visible publications.
- 2026: 7 visible publications.
- 2025: 3 visible publications.
- Position Papers: 1 visible publication.
- Each selected filter has `.active` and `aria-pressed="true"`.

- [ ] **Step 5: Verify content preservation and repository state**

```bash
comm -3 \
  <(git show 0cb6619:_pages/about.md | rg -o 'href="[^"]+"' | sort) \
  <(rg -o 'href="[^"]+"' _pages/about.md | sort)
git status --short --branch
```

Expected: no link differences and a clean working tree.

