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
    [
      "Backpropagating Through Simulation",
      "Yueci Deng</strong></a><sup>†</sup>",
    ],
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
