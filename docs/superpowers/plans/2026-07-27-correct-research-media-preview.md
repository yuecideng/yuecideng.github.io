# Correct Research Media Preview Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Make the local homepage preview load local CSS and rebalance Projects and Publications image widths without changing other homepage content.

**Architecture:** Add a small Jekyll config override used only by the local preview so generated asset URLs point to `localhost:4000`, while leaving the production `_config.yml` untouched. Then adjust only the research-row media columns in `assets/css/custom.css`, preserving the existing desktop/tablet/phone layout behavior.

**Tech Stack:** Jekyll, Liquid, CSS, Node.js built-in test runner

---

### Task 1: Keep local preview assets local

**Files:**
- Create: `_config_local.yml`
- Modify: `test/research-sections.test.js`
- Verify: generated `_site/index.html`

**Step 1: Write the failing test**

Add a focused test that reads `_config_local.yml` and requires the local preview URL to be exactly:

```yaml
url: "http://localhost:4000"
```

The test must also confirm that the production `_config.yml` still contains `https://yuecideng.github.io`.

**Step 2: Run the test to verify it fails**

Run:

```bash
node --test test/research-sections.test.js
```

Expected: FAIL because `_config_local.yml` does not exist.

**Step 3: Write the minimal implementation**

Create `_config_local.yml` with only:

```yaml
url: "http://localhost:4000"
```

Do not change `_config.yml`.

**Step 4: Run the test to verify it passes**

Run:

```bash
node --test test/research-sections.test.js
```

Expected: PASS.

**Step 5: Verify generated asset URLs**

Build using the local override:

```bash
bundle exec jekyll build --config _config.yml,_config_local.yml
rg 'href="http://localhost:4000/assets/css/(main|custom)\.css' _site/index.html
```

Expected: both `main.css` and `custom.css` use `http://localhost:4000`.

Build once more with the production config:

```bash
bundle exec jekyll build
```

Expected: production build succeeds and continues to use `https://yuecideng.github.io`.

**Step 6: Commit**

```bash
git add _config_local.yml test/research-sections.test.js
git commit -m "fix: keep local preview assets local"
```

### Task 2: Rebalance Projects and Publications media widths

**Files:**
- Modify: `assets/css/custom.css`
- Modify: `test/research-sections.test.js`

**Step 1: Update the contract test first**

Change the expected grid columns to:

```text
Desktop Projects:     245px minmax(0, 1fr)
Desktop Publications: 195px minmax(0, 1fr)
Tablet Projects:      170px minmax(0, 1fr)
Tablet Publications:  145px minmax(0, 1fr)
Phone Publications:   104px minmax(0, 1fr)
```

Keep the existing phone Projects stack requirement and all other layout assertions unchanged.

**Step 2: Run the test to verify it fails**

Run:

```bash
node --test test/research-sections.test.js
```

Expected: FAIL because the CSS still uses the oversized 260/210 and 180/150 values.

**Step 3: Write the minimal CSS change**

In `assets/css/custom.css`, change only these research grid widths:

```css
.project-row {
  grid-template-columns: 245px minmax(0, 1fr);
}

.publication-row {
  grid-template-columns: 195px minmax(0, 1fr);
}
```

Inside the existing `@media (max-width: 768px)` rule:

```css
.project-row {
  grid-template-columns: 170px minmax(0, 1fr);
}

.publication-row {
  grid-template-columns: 145px minmax(0, 1fr);
}
```

Do not change the `@media (max-width: 559px)` behavior.

**Step 4: Run the focused and full tests**

Run:

```bash
node --test test/research-sections.test.js
npm test
bundle exec jekyll build
```

Expected: all commands PASS.

**Step 5: Commit**

```bash
git add assets/css/custom.css test/research-sections.test.js
git commit -m "style: rebalance research media columns"
```

### Task 3: Verify the real local preview

**Files:**
- No source changes expected

**Step 1: Start the preview with the local override**

Run:

```bash
bundle exec jekyll serve -l -H localhost --config _config.yml,_config_local.yml
```

**Step 2: Verify the browser-loaded styles**

At `http://localhost:4000/#publications`, confirm:

- `main.css` and `custom.css` load from `http://localhost:4000`.
- Research rows compute as CSS grid, not block layout.
- At 1120px viewport width, Projects use 245px media and Publications use 195px media.
- At 768px, Projects use 170px and Publications use 145px.
- At 390px, Projects stack and Publications retain the 104px compact thumbnail.
- No horizontal overflow appears.
- Dark and light themes remain readable.

**Step 3: Confirm scope**

Review the final diff and verify:

- `_config.yml` is unchanged.
- Homepage content and markup are unchanged.
- Only local preview configuration, research layout tests, and Projects/Publications CSS dimensions changed.
