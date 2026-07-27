# Equalize Wide Research Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase the wide-screen Publications media column from 270px to 330px so it matches Projects.

**Architecture:** Change one value in the existing `@media (min-width: 1025px)` Publications override and one matching test expectation. Every wrapper, breakpoint, image rule, content element, script, and configuration file remains unchanged.

**Tech Stack:** CSS, Node.js built-in test runner, Jekyll

## Global Constraints

- At 1025px and wider, Projects and Publications both use 330px media columns.
- The research-section maximum remains 1120px.
- At 769px–1024px, Projects remain 245px and Publications remain 195px.
- At 560px–768px, Projects remain 170px and Publications remain 145px.
- At 559px and below, Projects remain stacked and Publications remain 104px.
- Existing 16:9 frames, `object-fit: cover`, and the Open3D `object-fit: contain` exception remain unchanged.
- Homepage markup, content, scripts, and Jekyll configuration remain unchanged.

---

### Task 1: Equalize the wide-screen media columns

**Files:**
- Modify: `assets/css/custom.css`
- Modify: `test/research-sections.test.js`

**Interfaces:**
- Consumes: the existing `@media (min-width: 1025px)` Publications override.
- Produces: matching 330px Projects and Publications media columns at wide widths.

- [ ] **Step 1: Update the test expectation first**

Change only the wide-screen Publications assertion:

```js
assert.match(
  cssRule(wide, ".publication-row"),
  /grid-template-columns: 330px minmax\(0, 1fr\);/
);
```

Keep the Projects 330px assertion and every smaller-breakpoint assertion
unchanged.

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
node --test test/research-sections.test.js
```

Expected: FAIL because the stylesheet still contains 270px.

- [ ] **Step 3: Apply the one-value CSS change**

In the existing `@media (min-width: 1025px)` block, change only:

```css
.publication-row {
  grid-template-columns: 330px minmax(0, 1fr);
}
```

- [ ] **Step 4: Run focused and full verification**

Run:

```bash
node --test test/research-sections.test.js
node --test
bundle exec jekyll build --config _config.yml,_config_local.yml
```

Expected: all tests PASS and the Jekyll build succeeds.

- [ ] **Step 5: Commit**

```bash
git add assets/css/custom.css test/research-sections.test.js
git commit -m "style: equalize wide research media"
```

### Task 2: Verify the rendered Publications width

**Files:**
- No source changes expected.

**Interfaces:**
- Consumes: Task 1's matching 330px wide-screen columns.
- Produces: measured browser evidence and an updated Publication preview.

- [ ] **Step 1: Refresh the 4010 preview**

Restart the current temporary Jekyll preview so it builds the current branch
and remains available at:

```text
http://localhost:4010/
```

- [ ] **Step 2: Verify 1280px**

Measure:

- `.page` remains 900px.
- `.research-section` remains 1120px.
- Projects image width is 330px.
- Publications image width is 330px.
- Horizontal overflow is 0.

- [ ] **Step 3: Verify unchanged breakpoints**

Measure:

- 1024px: Projects 245px and Publications 195px.
- 768px: Projects 170px and Publications 145px.
- 390px: Projects stacked and Publications 104px.
- Horizontal overflow is 0 at every viewport.

- [ ] **Step 4: Verify image presentation**

Confirm PAct remains 16:9 with `object-fit: cover`, Open3D remains 16:9 with
`object-fit: contain`, and dark/light themes remain readable.

- [ ] **Step 5: Capture and retain the final Publication preview**

Scroll to Publications in the 1280px preview, capture the visible layout, and
leave that preview available for the user.
