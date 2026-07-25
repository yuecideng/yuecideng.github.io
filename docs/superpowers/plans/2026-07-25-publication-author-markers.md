# Publication Author Markers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mark equal-contribution and corresponding authors across all 10 homepage publication cards while explaining both symbols once in a shared legend.

**Architecture:** Keep the existing Jekyll homepage and embedded publication-card HTML. Add a single shared legend below the filter bar, update author-line superscripts in `_pages/about.md`, remove DexScale's per-card note, and validate the rendered `_site/index.html` with a focused Node test.

**Tech Stack:** Jekyll, Markdown with embedded HTML, Node.js built-in test runner

## Global Constraints

- Update only the 10 cards under `Publications`.
- Preserve publication order, author links, Yueci Deng's bold styling, filtering, and all unrelated content.
- Use `*` for equal contribution and `†` for corresponding author.
- Explain both markers once with `* Equal contribution; † Corresponding author`.
- Do not retain or add per-card marker explanations.

---

### Task 1: Add Shared Author-Role Markers

**Files:**
- Create: `test/publication-author-markers.test.js`
- Modify: `_pages/about.md`

**Interfaces:**
- Consumes: Jekyll's rendered homepage at `_site/index.html`
- Produces: 10 publication cards with verified author markers and one shared marker legend

- [x] **Step 1: Write the failing rendered-page tests**

Create `test/publication-author-markers.test.js`:

```javascript
const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");

const homepage = fs.readFileSync("_site/index.html", "utf8");
const publicationCards = [
  ...homepage.matchAll(
    /<div class="card pub-card"[\s\S]*?(?=<div class="card pub-card"|<script src=)/g
  ),
].map((match) => match[0]);

function publicationCard(title) {
  const card = publicationCards.find((candidate) => candidate.includes(title));
  assert.ok(card, `Missing rendered publication card: ${title}`);
  return card;
}

test("renders one shared legend for equal and corresponding author markers", () => {
  const legends = homepage.match(
    /<div class="card-note pub-author-legend">\* Equal contribution; † Corresponding author<\/div>/g
  );

  assert.equal(legends?.length, 1);
  assert.ok(publicationCards.every((card) => !card.includes('class="card-note"')));
});

test("marks the corresponding author in every publication card", () => {
  const expectedMarkers = [
    ["PAct: Part-Decomposed", "Zhen Liu</a><sup>†</sup>"],
    ["Backpropagating Through Simulation", "Yueci Deng</strong></a><sup>†</sup>"],
    ["Focus-Then-Contact", "Guiliang Liu</a><sup>†</sup>"],
    ["From Reaction to Anticipation", "Guiliang Liu</a><sup>†</sup>"],
    ["YOTO++", "Kui Jia</a><sup>†</sup>"],
    ["EWA: Aligning Video World Models", "Zhen Liu</a><sup>†</sup>"],
    ["Sim2Real VLA", "Guiliang Liu</a><sup>†</sup>"],
    ["GS-World", "Kui Jia</a><sup>†</sup>"],
    ["DexScale", "Kui Jia</a><sup>†</sup>"],
    ["You Only Teach Once", "Kui Jia</a><sup>†</sup>"],
  ];

  assert.equal(publicationCards.length, 10);
  for (const [title, marker] of expectedMarkers) {
    assert.ok(
      publicationCard(title).includes(marker),
      `${title} is missing ${marker}`
    );
  }
});

test("keeps DexScale equal-contribution markers in the shared convention", () => {
  const dexScale = publicationCard("DexScale");

  assert.ok(dexScale.includes("Guiliang Liu</a><sup>*</sup>"));
  assert.ok(dexScale.includes("Yueci Deng</strong></a><sup>*</sup>"));
  assert.ok(!homepage.includes("(*Equal contribution)"));
});
```

- [x] **Step 2: Build the unchanged site and verify the tests fail**

Run:

```bash
bundle exec jekyll build
node --test test/publication-author-markers.test.js
```

Expected: the equal-contribution assertions pass, while the shared-legend and corresponding-author tests fail because the unified convention is not yet rendered.

- [x] **Step 3: Add the shared legend and corresponding-author superscripts**

In `_pages/about.md`:

1. Insert this once immediately after `#pub-filter-bar`:

```html
<div class="card-note pub-author-legend">* Equal contribution; † Corresponding author</div>
```

2. Append `<sup>†</sup>` after these linked author names:

```text
PAct — Zhen Liu
APG — Yueci Deng
Focus-Then-Contact — Guiliang Liu
AgentChord — Guiliang Liu
YOTO++ — Kui Jia
EWA — Zhen Liu
Sim2Real VLA — Guiliang Liu
GS-World — Kui Jia
DexScale — Kui Jia
YOTO — Kui Jia
```

3. Preserve DexScale's existing `<sup>*</sup>` markers on Guiliang Liu and Yueci Deng.
4. Delete `<div class="card-note">(*Equal contribution)</div>` from the DexScale card.

- [x] **Step 4: Rebuild and verify all rendered-page tests pass**

Run:

```bash
bundle exec jekyll build
node --test test/*.test.js
```

Expected: the Jekyll build succeeds and all rendered-page tests report zero failures.

- [x] **Step 5: Inspect and commit the finished change**

Run:

```bash
git diff --check
git diff -- _pages/about.md test/publication-author-markers.test.js
git add _pages/about.md test/publication-author-markers.test.js docs/superpowers/plans/2026-07-25-publication-author-markers.md
git commit -m "feat: mark publication author roles"
```
