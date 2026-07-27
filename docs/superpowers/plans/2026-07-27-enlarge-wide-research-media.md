# Enlarge Wide Research Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase the wide-screen Projects media column from 300px to 330px and the Publications media column from 230px to 270px.

**Architecture:** Change only the existing `@media (min-width: 1025px)` research-row overrides and their contract assertions. The 1120px research-section width, base columns, tablet/phone rules, image treatment, markup, and content remain unchanged.

**Tech Stack:** CSS, Node.js built-in test runner, Jekyll

## Global Constraints

- At 1025px and wider, Projects use a 330px media column.
- At 1025px and wider, Publications use a 270px media column.
- The research-section maximum remains 1120px.
- At 769px–1024px, Projects remain 245px and Publications remain 195px.
- At 560px–768px, Projects remain 170px and Publications remain 145px.
- At 559px and below, Projects remain stacked and Publications remain 104px.
- Existing 16:9 frames, `object-fit: cover`, and the Open3D `object-fit: contain` exception remain unchanged.
- Homepage markup, content, scripts, and Jekyll configuration files remain unchanged.

---

### Task 1: Increase the wide-screen media columns

**Files:**
- Modify: `assets/css/custom.css`
- Modify: `test/research-sections.test.js`

**Interfaces:**
- Consumes: the existing `@media (min-width: 1025px)` `.project-row` and `.publication-row` overrides.
- Produces: 330px and 270px media columns for wide-screen browser verification.

- [ ] **Step 1: Update the CSS contract first**

In `test/research-sections.test.js`, change only the two wide-screen
assertions:

```js
assert.match(
  cssRule(wide, ".project-row"),
  /grid-template-columns: 330px minmax\(0, 1fr\);/
);
assert.match(
  cssRule(wide, ".publication-row"),
  /grid-template-columns: 270px minmax\(0, 1fr\);/
);
```

Keep every base, tablet, phone, breakout, image-treatment, content, and filter
assertion unchanged.

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
node --test test/research-sections.test.js
```

Expected: FAIL because the stylesheet still contains 300px and 230px.

- [ ] **Step 3: Apply the minimal CSS change**

In `assets/css/custom.css`, update the existing wide-screen override to:

```css
@media (min-width: 1025px) {
  .project-row {
    grid-template-columns: 330px minmax(0, 1fr);
  }

  .publication-row {
    grid-template-columns: 270px minmax(0, 1fr);
  }
}
```

Do not add a new media query or change any other declaration.

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
git commit -m "style: enlarge wide research media"
```

### Task 2: Verify the rendered proportions

**Files:**
- No source changes expected.

**Interfaces:**
- Consumes: Task 1's wide-screen CSS values.
- Produces: measured browser evidence and an updated preview.

- [ ] **Step 1: Refresh the local preview**

Build and serve the current branch with the local URL override:

```bash
bundle exec jekyll serve -H localhost -P 4010 --no-watch \
  --config _config.yml,/tmp/codex-wide-research-qa.iRHwKC/config.yml \
  --destination /tmp/codex-wide-research-qa.iRHwKC/site
```

Expected: the preview is available at `http://localhost:4010/`.

- [ ] **Step 2: Verify 1280px**

Measure the rendered page:

- `.page` remains 900px.
- `.research-section` remains 1120px.
- Projects use a 330px image column.
- Publications use a 270px image column.
- Horizontal overflow is 0.

- [ ] **Step 3: Verify unchanged responsive behavior**

Measure:

- 1024px: Projects 245px and Publications 195px.
- 768px: Projects 170px and Publications 145px.
- 390px: Projects stacked and Publications 104px.
- Every measured viewport has 0 horizontal overflow.

- [ ] **Step 4: Verify presentation**

Confirm:

- Projects and Publications retain readable text columns.
- dark and light themes remain readable;
- images remain 16:9;
- PAct uses `object-fit: cover`;
- Open3D uses `object-fit: contain`.

- [ ] **Step 5: Capture and retain the updated preview**

Open the homepage at the Projects/Publications area, capture the 1280px layout,
and leave the final preview available for the user.
