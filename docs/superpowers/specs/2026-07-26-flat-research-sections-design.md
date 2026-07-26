# Flat Research Sections Redesign

## Goal

Redesign only the homepage `Projects` and `Publications` sections as a flat,
high-readability academic research list. Preserve every other part of the
homepage exactly as it exists after reverting commit
`5b3184386fa60e97a840cf6d450c2a0b6307a971`.

The selected direction is **A — Flat Research Rows**. It draws on the
thumbnail-led publication layouts used by computer-vision researchers such as
[Jon Barron](https://jonbarron.info/) and
[Or Hirschorn](https://orhir.github.io/), while following the restrained,
responsive principles described by
[Pascal Michaillat's minimalist academic template](https://pascalmichaillat.org/b/).

## Scope

### In scope

- The HTML between the `Projects` heading and the end of the `Publications`
  list in `_pages/about.md`.
- New, section-specific CSS selectors in `assets/css/custom.css`.
- Tests that protect the two research sections and their existing filtering.
- Desktop, tablet, phone, light-theme, and dark-theme visual verification.

### Out of scope

- Masthead and navigation.
- Portrait, biography, affiliation, and profile links.
- Research summary and research-interest lists.
- `Collaborations & Opportunities`.
- Global page width, global heading treatment, footer, CV, and other pages.
- New frameworks, fonts, dependencies, data files, or content-management
  changes.
- Reintroducing author-role markers removed by the requested revert.

No global selector used by the profile or prose sections may be restyled as part
of this work. Research-section selectors must be rooted in dedicated classes.

## Content preservation

The redesign must preserve:

- Two projects and ten publications in their current order.
- Every current project and publication title.
- Every author and the author order.
- The exact author-marker state after the revert, including PAct's existing
  dagger and DexScale's existing equal-contribution notation.
- Every image path, year, category, venue, description, and link destination.
- Publication filter values and results:
  - All: 10
  - 2026: 7
  - 2025: 3
  - Position Papers: 1

The literal `Description:` label may be removed because it is presentational.
The complete description text following it must remain visible. Content must
not be hidden in a disclosure, modal, carousel, or hover-only state.

## Markup structure

### Shared research rows

Replace generic homepage `.card` wrappers with section-specific semantic
articles:

- `.research-row.project-row`
- `.research-row.publication-row.pub-card`

Keep `.card-image` and `.card-content` as internal layout hooks. Wrap each
project and publication title in an `h3.card-title` while retaining the existing
link or span and its `.papertitle` class.

This isolates the new layout from any `.card` use elsewhere in the site and
gives every research item a navigable heading.

### Projects

Each project is one flat row:

1. 16:9 project image.
2. Complete project title.
3. Complete description without the `Description:` prefix.
4. Plain Website and Code links.

The two project rows form a single visual list with thin separators. They have
no card fill, alternating background, shadow, large radius, or expand/collapse
control.

### Publications

Each publication is one flat row:

1. Fixed-ratio thumbnail.
2. Title.
3. Authors.
4. Venue when present.
5. Existing resource links or coming-soon text.
6. Complete one-sentence description when present.

GS-World remains without an invented description. The existing position-paper
tag remains, but is restyled as compact inline metadata rather than a prominent
badge.

The filter remains directly above the list. Buttons become text-like tabs with
an underline for the active item. The existing JavaScript filtering logic and
data attributes remain unchanged.

## Visual system

### Projects

- Desktop image column: approximately 230px.
- Image ratio: 16:9.
- Open3D image: `object-fit: contain` on a white image background.
- Row gap: approximately 24px.
- Row vertical padding: approximately 18px.
- Title: 16–17px, strong weight, existing academic accent color.
- Description: 14–15px, muted text color, comfortable line height.
- Links: plain text with a subtle underline; no pills.

### Publications

- Desktop thumbnail column: approximately 180px.
- Thumbnail ratio: approximately 16:9.
- Row gap: approximately 20px.
- Row vertical padding: approximately 14px.
- Title: 16px, strong weight.
- Authors: 14px.
- Venue: 13px, italic and semibold.
- Resource links: 12–13px, plain inline links.
- Description: 13–14px, muted text color.
- Row separation: one thin border using the existing theme border token.

### Shared behavior

- Research rows remain transparent against the page background.
- No box shadow, hover lift, large filled surface, or animated transform.
- Hover changes only linked text color and optional underline strength.
- Focus-visible states remain obvious.
- Light and dark themes use the existing color tokens.
- Section headings retain the site's current global style.

## Responsive behavior

### Desktop: 769px and above

- Project rows use a 230px image column.
- Publication rows use a 180px thumbnail column.
- All metadata remains visible.

### Tablet: 560px–768px

- Project and publication image columns shrink to approximately 140–160px.
- Rows remain horizontal.
- Gaps and type sizes reduce slightly without removing content.

### Phone: 559px and below

- Project rows stack image above text because their full descriptions need
  reading width.
- Publication rows retain a compact left thumbnail of approximately 104px so
  ten publications do not become a sequence of oversized image cards.
- Filter tabs wrap naturally.
- Interactive controls have at least a 44px touch target.
- At a 390px viewport,
  `document.documentElement.scrollWidth ===
  document.documentElement.clientWidth`.

## Accessibility and failure handling

- Images keep meaningful `alt` values.
- Research items use `article` and `h3` semantics.
- Buttons and links remain keyboard reachable.
- Focus-visible styling must not depend on hover.
- Missing images fall back to their alt text and the existing neutral image
  background; no layout depends on externally hosted images.
- Reduced-motion behavior is unchanged because the redesign adds no motion.
- The section remains useful if JavaScript fails: all ten publications are
  visible and only filtering is unavailable.

## Verification

### Automated

- Build the Jekyll site.
- Assert two project rows and ten publication rows.
- Assert the 7/3/1 year/category distribution.
- Assert every expected image source and link destination remains present.
- Assert descriptions remain in rendered HTML and no disclosure is introduced.
- Exercise all four existing publication-filter branches.
- Verify formatting with `git diff --check`.
- Compare the pre-Projects and post-Publications homepage source regions against
  the approved baseline so unrelated homepage content cannot change.

### Browser

Verify the real rendered homepage at:

- 1200px desktop.
- 820px tablet.
- 390px phone.
- Light and dark themes.

Check:

- Correct row geometry and image cropping.
- No horizontal overflow.
- Full visible descriptions.
- Filter counts of 10, 7, 3, and 1.
- Keyboard focus and 44px touch targets.
- No console errors.

Provide final desktop and phone screenshots to the user.

## Acceptance criteria

The work is complete when:

1. Projects and Publications match the approved flat-row direction.
2. No content outside those sections changes.
3. All research content and destinations are preserved.
4. Filtering still produces 10/7/3/1 visible items.
5. Desktop, tablet, phone, light, and dark layouts pass visual verification.
6. The final response includes real desktop and phone previews.
