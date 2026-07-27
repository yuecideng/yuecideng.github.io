# Publication Author Markers Design

## Goal

Show equal-contribution and corresponding-author roles consistently across every publication card on the homepage without repeating explanatory notes inside individual cards.

## Selected Approach

Keep the current static publication markup and add semantic `<sup>` markers
directly after the applicable author names. Place one shared legend below the
publication filter bar. This restores the previously verified author-role
mapping without introducing a new data layer or changing unrelated homepage
content.

## Scope

- Update the 10 cards under the homepage `Publications` section.
- Do not change the `Projects` section, publication order, links, descriptions, filtering behavior, or global layout.
- Preserve existing author links and Yueci Deng's bold treatment.

## Marker Convention

- Append `<sup>*</sup>` to every equal-contribution author.
- Append `<sup>†</sup>` to every corresponding author.
- Add one shared note directly below the publication filter bar:

  `* Equal contribution; † Corresponding author`

- Remove DexScale's existing per-card equal-contribution note.
- Do not add explanatory notes to any individual publication card.

## Corresponding Authors

- PAct — Zhen Liu
- Backpropagating Through Simulation / APG — Yueci Deng
- Focus-Then-Contact — Guiliang Liu
- AgentChord — Guiliang Liu
- YOTO++ — Kui Jia
- EVA (shown as EWA on the current homepage) — Zhen Liu
- Sim2Real VLA — Guiliang Liu
- GS-World — Kui Jia
- DexScale — Kui Jia
- YOTO — Kui Jia

APG is a single-author paper and identifies Yueci Deng with the paper's contact email, so Yueci Deng is treated as the corresponding author for the shared marker convention.

## Equal-Contribution Authors

- DexScale — Guiliang Liu and Yueci Deng

No other displayed publication explicitly identifies equal-contribution authors in the verified sources.

## Sources

- PAct project page: https://pact-project.github.io/
- APG paper: https://arxiv.org/pdf/2606.21525
- FTC, AgentChord, and Sim2Real VLA entries on Guiliang Liu's official publication list: https://guiliang.me/contents/publications.html
- AgentChord paper: https://arxiv.org/pdf/2605.11951
- EVA project page: https://eva-project-page.github.io/
- YOTO++ paper: https://hnuzhy.github.io/projects/YOTOPlus/final_YOTO++.pdf
- DexScale project page: https://edem-ai.github.io/dexscale.github.io/
- GS-World paper: https://openreview.net/pdf?id=E23dMeRpE0
- YOTO paper: https://www.roboticsproceedings.org/rss21/p149.pdf

## Verification

- Confirm all 10 rendered publication cards contain the expected `†` marker.
- Confirm DexScale retains both existing `*` markers and gains `†` on Kui Jia.
- Confirm the shared legend appears once, immediately after the filter bar.
- Confirm no per-card `card-note` remains.
- Run the Jekyll build and a rendered-page test covering the marker mapping and shared legend.
