# Enlarge Research Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase only the Projects and Publications image columns so research media has stronger visual weight while preserving the approved flat-row layout and phone proportions.

**Architecture:** Keep the existing semantic markup and section-scoped CSS. Update the exact desktop and tablet grid column widths in `assets/css/custom.css`, update the existing CSS-contract test first, and verify the live Jekyll page at desktop, tablet, and phone widths.

**Tech Stack:** Jekyll, CSS Grid, Node.js built-in `node:test`, in-app Browser.

## Global Constraints

- Modify no homepage content or markup.
- Change only the research-section media column widths and their matching tests.
- Desktop Projects media width is exactly `260px`.
- Desktop Publications media width is exactly `210px`.
- At `max-width: 768px`, Projects media width is exactly `180px`.
- At `max-width: 768px`, Publications media width is exactly `150px`.
- At `max-width: 559px`, Projects remain stacked and Publications remain exactly `104px`.
- Preserve the flat transparent rows, text-tab filters, light/dark themes, focus behavior, and 44px coarse-pointer targets.
- Preserve all 2 Projects, 10 Publications, and filter results `10/7/3/1`.
- Produce no horizontal overflow at a 390px viewport.

---

### Task 1: Increase research media proportions

**Files:**
- Modify: `test/research-sections.test.js:219-266`
- Modify: `assets/css/custom.css:296-305`
- Modify: `assets/css/custom.css:540-550`

**Interfaces:**
- Consumes: existing `.project-row` and `.publication-row` CSS Grid hooks.
- Produces: exact desktop `260px`/`210px` and tablet `180px`/`150px` media columns, with the phone `104px` publication column unchanged.

- [ ] **Step 1: Update the CSS-contract test first**

Replace the desktop expectations:

```js
assert.match(
  cssRule(stylesheet, ".project-row"),
  /grid-template-columns: 260px minmax\(0, 1fr\);/
);
assert.match(
  cssRule(stylesheet, ".publication-row"),
  /grid-template-columns: 210px minmax\(0, 1fr\);/
);
```

Replace the tablet expectations:

```js
assert.match(
  cssRule(tablet, ".project-row"),
  /grid-template-columns: 180px minmax\(0, 1fr\);/
);
assert.match(
  cssRule(tablet, ".publication-row"),
  /grid-template-columns: 150px minmax\(0, 1fr\);/
);
```

Leave the phone expectation at:

```js
/grid-template-columns: 104px minmax\(0, 1fr\);/
```

- [ ] **Step 2: Run the focused test to verify RED**

Run:

```bash
node --test test/research-sections.test.js
```

Expected: the CSS-contract test fails because production CSS still uses
`230px`/`180px` on desktop and `160px`/`140px` at the tablet breakpoint.

- [ ] **Step 3: Update only the scoped grid widths**

In the desktop research rules, set:

```css
.project-row {
  grid-template-columns: 260px minmax(0, 1fr);
}

.publication-row {
  grid-template-columns: 210px minmax(0, 1fr);
}
```

Inside `@media (max-width: 768px)`, set:

```css
.project-row {
  grid-template-columns: 180px minmax(0, 1fr);
}

.publication-row {
  grid-template-columns: 150px minmax(0, 1fr);
}
```

Do not change the `@media (max-width: 559px)` rules.

- [ ] **Step 4: Run the automated verification**

Run:

```bash
bundle exec jekyll build
node --test test/*.test.js
git diff --check
```

Expected: Jekyll succeeds, all 6 tests pass, and the diff check is clean.

- [ ] **Step 5: Verify the live layout**

On the real local homepage, verify:

- At 1200px: Projects media computes to `260px`; Publications media computes to `210px`; horizontal overflow is `0`.
- At 820px: the same desktop widths apply because the breakpoint begins at `768px`; horizontal overflow is `0`.
- At 768px: Projects media computes to `180px`; Publications media computes to `150px`; horizontal overflow is `0`.
- At 390px: Projects remain stacked; Publications media remains `104px`; horizontal overflow is `0`.
- Light and dark themes retain transparent rows and readable text.

- [ ] **Step 6: Inspect scope and commit**

Run:

```bash
git diff -- assets/css/custom.css test/research-sections.test.js
git diff --check
```

Expected: exactly four production width values and four matching test values
change; no markup, content, phone layout, or unrelated selector changes.

Commit:

```bash
git add assets/css/custom.css test/research-sections.test.js
git commit -m "style: enlarge research media columns"
```
