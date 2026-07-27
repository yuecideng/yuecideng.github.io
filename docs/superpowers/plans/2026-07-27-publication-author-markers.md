# Publication Author Markers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the verified equal-contribution and corresponding-author markers across all 10 homepage publications and explain both symbols once in a shared legend.

**Architecture:** Keep the current static publication cards and append semantic `<sup>` markers directly to the applicable author links. Add one shared legend between the publication filter bar and publication list, remove the DexScale-only note, and protect the exact rendered mapping with Node integration tests before adding one section-scoped legend style.

**Tech Stack:** Jekyll, Kramdown, semantic HTML, CSS, Node.js built-in test runner, in-app Browser

## Global Constraints

- Modify only the homepage `Publications` section, its section-scoped CSS, and the corresponding test coverage.
- Do not change `Projects`, publication order, author order, author links, descriptions, filtering behavior, images, venues, or unrelated homepage content.
- Use `<sup>*</sup>` for equal contribution and `<sup>†</sup>` for corresponding author.
- Render exactly one shared legend immediately below the publication filter bar: `* Equal contribution; † Corresponding author`.
- Remove DexScale's per-card `card-note`; no publication card may contain an explanatory role note.
- Corresponding-author mapping: PAct—Zhen Liu; APG—Yueci Deng; FTC—Guiliang Liu; AgentChord—Guiliang Liu; YOTO++—Kui Jia; EWA—Zhen Liu; Sim2Real VLA—Guiliang Liu; GS-World—Kui Jia; DexScale—Kui Jia; YOTO—Kui Jia.
- Equal-contribution mapping: DexScale—Guiliang Liu and Yueci Deng; no other displayed publication receives `*`.
- Preserve Yueci Deng's existing bold treatment and every existing author link.

---

### Task 1: Restore the verified author-role markup

**Files:**
- Modify: `_pages/about.md:83-333`
- Modify: `test/research-sections.test.js:27-115`

**Interfaces:**
- Consumes: the 10 existing `.publication-row.pub-card` articles, `#pub-filter-bar`, and the verified mapping in `docs/superpowers/specs/2026-07-25-publication-author-markers-design.md`.
- Produces: one `.publication-author-legend`, exactly 10 `<sup>†</sup>` markers, exactly two `<sup>*</sup>` markers, and no `.card-note` in rendered publication markup.

- [ ] **Step 1: Build the current baseline**

Run:

```bash
bundle exec jekyll build --config _config.yml,_config_local.yml
```

Expected: build succeeds so `test/research-sections.test.js` reads the current rendered homepage.

- [ ] **Step 2: Add a helper that isolates one rendered publication**

Add after `researchRegion()` in `test/research-sections.test.js`:

```js
function publicationCardByAlt(alt) {
  const publicationList = rendered.match(
    /<div class="publication-list"[^>]*>[\s\S]*?<\/div>\s*<\/section>/
  );
  assert.ok(publicationList, "Missing rendered publication list");

  const cards = publicationList[0].match(
    /<article class="research-row publication-row pub-card"[\s\S]*?<\/article>/g
  ) || [];
  const card = cards.find((entry) =>
    new RegExp(`<img[^>]+alt="${alt}"`).test(entry)
  );
  assert.ok(card, `Missing publication card for ${alt}`);
  return card;
}

function withoutAuthorRoleAnnotations(markdown) {
  return markdown
    .replace(/<sup>[*†]<\/sup>/g, "")
    .replace(/<div class="card-note">[\s\S]*?<\/div>/g, "")
    .replace(
      /<p class="publication-author-legend"[^>]*>[\s\S]*?<\/p>/g,
      ""
    );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
```

Update the existing research-content preservation assertion to compare:

```js
assert.equal(
  visibleText(withoutAuthorRoleAnnotations(currentRegion)),
  visibleText(withoutAuthorRoleAnnotations(baselineRegion))
);
```

This keeps the preservation test focused on publication content while allowing the explicitly approved role annotations to change.

- [ ] **Step 3: Write the failing rendered-page tests**

Add:

```js
test("renders one shared publication author-role legend", () => {
  const legends = rendered.match(
    /<p class="publication-author-legend"[^>]*>[\s\S]*?<\/p>/g
  ) || [];

  assert.equal(legends.length, 1);
  assert.match(
    legends[0],
    /<sup>\*<\/sup>\s*Equal contribution;\s*<sup>†<\/sup>\s*Corresponding author/
  );
  assert.match(
    rendered,
    /<div id="pub-filter-bar">[\s\S]*?<\/div>\s*<p class="publication-author-legend"[^>]*>[\s\S]*?<\/p>\s*<div class="publication-list"/
  );
  assert.doesNotMatch(rendered, /class="card-note"/);
});

test("renders the verified author-role mapping for all publications", () => {
  const correspondingAuthors = [
    ["PAct", "Zhen Liu"],
    ["APG vs PPO", "Yueci Deng"],
    ["FTC", "Guiliang Liu"],
    ["AgentChord", "Guiliang Liu"],
    ["YOTO++", "Kui Jia"],
    ["EWA", "Zhen Liu"],
    ["Sim2Real-VLA", "Guiliang Liu"],
    ["GS-World", "Kui Jia"],
    ["DexScale", "Kui Jia"],
    ["YOTO", "Kui Jia"],
  ];

  for (const [alt, author] of correspondingAuthors) {
    assert.match(
      publicationCardByAlt(alt),
      new RegExp(`>${escapeRegExp(author)}</a><sup>†</sup>`)
    );
  }

  const publicationMarkup = correspondingAuthors
    .map(([alt]) => publicationCardByAlt(alt))
    .join("\n");
  assert.equal((publicationMarkup.match(/<sup>†<\/sup>/g) || []).length, 10);
  assert.equal((publicationMarkup.match(/<sup>\*<\/sup>/g) || []).length, 2);

  const dexScale = publicationCardByAlt("DexScale");
  assert.match(dexScale, />Guiliang Liu<\/a><sup>\*<\/sup>/);
  assert.match(dexScale, />Yueci Deng<\/strong><\/a><sup>\*<\/sup>/);
  assert.doesNotMatch(
    publicationMarkup.replace(dexScale, ""),
    /<sup>\*<\/sup>/
  );
});
```

The production changes these tests catch are a missing or misplaced shared legend, any wrong or missing corresponding-author marker, an extra equal-contribution marker, or a lingering per-card explanation.

- [ ] **Step 4: Run the focused test to verify RED**

Run:

```bash
node --test test/research-sections.test.js
```

Expected: FAIL because the shared legend and nine restored `†` markers do not yet exist.

- [ ] **Step 5: Add the shared legend and exact markers**

In `_pages/about.md`, immediately after `#pub-filter-bar`, add:

```html
<p class="publication-author-legend" aria-label="Publication author role legend"><sup>*</sup> Equal contribution; <sup>†</sup> Corresponding author</p>
```

Apply the exact mapping from Global Constraints by placing the relevant `<sup>†</sup>` directly after each corresponding author's closing `</a>`. Keep the two existing DexScale `<sup>*</sup>` markers, add `<sup>†</sup>` after DexScale's Kui Jia link, and remove:

```html
<div class="card-note">(*Equal contribution)</div>
```

- [ ] **Step 6: Rebuild and verify GREEN**

Run:

```bash
bundle exec jekyll build --config _config.yml,_config_local.yml
node --test test/research-sections.test.js
```

Expected: Jekyll build succeeds and all focused tests pass.

- [ ] **Step 7: Commit the semantic behavior**

```bash
git add _pages/about.md test/research-sections.test.js
git commit -m "feat: restore publication author roles"
```

---

### Task 2: Style and visually verify the shared legend

**Files:**
- Modify: `assets/css/custom.css:479-548`
- Modify: `test/research-sections.test.js:259-359`

**Interfaces:**
- Consumes: `.publication-author-legend` from Task 1 and the existing research-section color variables.
- Produces: a compact, readable shared legend that remains visible when publication cards are filtered and works in both themes.

- [ ] **Step 1: Write the failing scoped CSS contract**

In `test("defines scoped flat-row styles and responsive touch behavior", ...)`, add:

```js
const authorLegend = cssRule(stylesheet, ".publication-author-legend");
assert.match(authorLegend, /color: var\(--c-text-note\);/);
assert.match(authorLegend, /font-size: 0\.78rem;/);
assert.match(authorLegend, /line-height: 1\.4;/);
assert.match(authorLegend, /margin: 0\.4rem 0 0\.45rem;/);
```

The production change this test catches is losing the compact section-scoped legend treatment and allowing generic paragraph styles to make it visually compete with publication content.

- [ ] **Step 2: Run the focused test to verify RED**

Run:

```bash
node --test test/research-sections.test.js
```

Expected: FAIL with `Missing .publication-author-legend`.

- [ ] **Step 3: Add the minimal legend style**

Add immediately after the final `#pub-filter-bar` rule group in `assets/css/custom.css`:

```css
.publication-author-legend {
  color: var(--c-text-note);
  font-size: 0.78rem;
  line-height: 1.4;
  margin: 0.4rem 0 0.45rem;
}
```

- [ ] **Step 4: Run automated verification**

Run:

```bash
node --test
bundle exec jekyll build --config _config.yml,_config_local.yml
git diff --check
```

Expected: all tests pass, the site builds, and the diff check is clean.

- [ ] **Step 5: Verify the live homepage**

At `http://localhost:4010/#publications`, verify at 1280px and 390px:

- the legend appears once directly under the filters;
- PAct shows `†` after Zhen Liu;
- APG shows `†` after Yueci Deng;
- DexScale shows `*` after Guiliang Liu and Yueci Deng and `†` after Kui Jia;
- switching all four filters does not hide the legend;
- light and dark themes keep the legend readable;
- no horizontal overflow or publication-layout regression appears.

- [ ] **Step 6: Commit the presentation**

```bash
git add assets/css/custom.css test/research-sections.test.js
git commit -m "style: present publication author legend"
```
