# Homepage A-Fidelity Alignment Design

## Context

The first homepage refresh implemented the selected **A — Editorial Research** direction, but the production result is substantially denser than the approved visual reference. At a 1200px viewport, project cards render at approximately 412×726px and publication cards at approximately 848×314–357px. The reference uses compact project tiles and publication rows.

The mismatch comes from showing every long project title, project description, publication description, resource control, and author marker at once. This correction makes the approved A reference the primary visual constraint while preserving the complete research content in accessible, native disclosure controls.

## Goals

- Match the compact hierarchy and proportions of the approved A reference.
- Keep every project description, publication description, author, marker, resource link, and filter value available.
- Restore the reference's section subtitles, lightweight filters, and venue pills.
- Preserve semantic headings, keyboard access, light/dark themes, and responsive behavior.
- Keep the implementation dependency-free and based on semantic HTML, CSS, and the existing vanilla JavaScript filter.

## Projects

- Change the section heading to `Featured Projects` with the subtitle `Systems for embodied intelligence`.
- Keep the two-column desktop grid and one-column mobile grid.
- Use a project-image ratio of approximately 2.35:1 instead of 16:9.
- Show short display titles (`EmbodiChain`, `Open3D`) and one-sentence taglines by default.
- Keep Website and Code actions visible.
- Put each original long title and complete description inside a native `<details>` disclosure labeled `Details`.
- Keep disclosures closed by default so project cards remain compact.
- Target a closed desktop card height of at most 450px at a 1200px viewport.
- Keep the Open3D logo fully visible with `object-fit: contain`.

## Publications

- Add the subtitle `10 selected works` beside the Publications heading.
- Keep the complete title and author list visible.
- Render available venues as compact teal pills instead of italic text.
- Keep resource actions visible but visually lighter than the title and authors.
- Move each complete publication description into a native `<details>` disclosure labeled `Summary`.
- Do not add an empty disclosure to publications without a description.
- Keep publication disclosures closed by default.
- Target a closed desktop publication-row height of at most 230px at a 1200px viewport.
- Use an approximately 3:2 thumbnail frame with a narrower fixed desktop column.

## Publication Controls

- Remove the surrounding toolbar surface, border, and large padding.
- Keep the filter chips and shared authorship legend on one lightweight row when space allows.
- Preserve `all`, `2026`, `2025`, and `position` filtering and synchronized `aria-pressed` state.
- Wrap controls cleanly on tablet and mobile without horizontal overflow.

## Shared Visual System

- Retain the current page width, typography, color tokens, light/dark themes, and focus-visible treatment.
- Use white/light cards in the light theme and equivalent elevated surfaces in the dark theme.
- Reduce shadows and visual weight so imagery, titles, and venue pills carry the hierarchy.
- Keep project hover lift only on fine-pointer devices.
- Preserve 44px touch targets on coarse-pointer devices.

## Content and Accessibility

- Native `<details>` and `<summary>` elements expose complete content without additional JavaScript.
- Summary controls must have visible keyboard focus and clear open/closed affordances.
- Project and publication titles remain semantic `<h3>` headings.
- Existing navigation anchors remain `#projects` and `#publications`.
- External destinations, ordering, author ordering, equal-contribution markers, and corresponding-author markers remain unchanged.

## Files

- `_pages/about.md`: section headings, short project display copy, native disclosures, and venue-pill classes.
- `assets/css/custom.css`: compact dimensions, disclosure styling, lighter controls, responsive layout, and theme states.
- `test/homepage-sections.test.js`: rendered compact-structure and content-preservation contracts.
- `test/publication-author-markers.test.js`: unchanged author-marker expectations.

## Verification

- Run `bundle exec jekyll build`.
- Run `node --test test/*.test.js`.
- Confirm all four publication filters still return the expected cards and button states.
- Confirm the original project descriptions, publication descriptions, authors, markers, and links remain in the rendered page.
- Inspect the page at 1200px, 820px, and 390px in both themes.
- At 1200px, confirm closed project cards are no taller than 450px and closed publication rows are no taller than 230px.
- Confirm no horizontal overflow and no browser-console errors.
