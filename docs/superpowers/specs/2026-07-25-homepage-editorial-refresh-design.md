# Homepage Editorial Refresh Design

## Context

The homepage presents Yueci Deng's research profile, open-source projects, and publications. The current Projects and Publications sections share one generic horizontal card style, which makes the two content types feel visually identical and limits the hierarchy among imagery, titles, author metadata, links, and descriptions.

The approved direction is **Editorial Research**: give projects stronger visual presence while keeping publications dense, complete, and easy to scan. The scope is a light visual unification of the whole homepage, with focused redesigns for Projects and Publications.

## Goals

- Create a consistent visual system across the homepage without changing its academic tone.
- Turn Projects into a visually distinct, responsive showcase.
- Make Publications faster to scan while retaining complete authorship, venue, link, and description information.
- Preserve all existing content, ordering, filtering behavior, author markers, and external destinations.
- Keep the light and dark themes equally legible.
- Improve keyboard, touch, reduced-motion, and small-screen usability.

## Non-goals

- Rewriting the biography, research interests, project descriptions, or publication descriptions.
- Reordering projects or publications.
- Adding a framework, external JavaScript dependency, CMS, or build dependency.
- Adding decorative animation, a new navigation structure, or image-heavy publication galleries.
- Changing the publication filter semantics.

## Visual Direction

### Shared system

- Increase the main content width from 900px to approximately 1040px so mixed image-and-text content has room to breathe.
- Use a restrained navy/teal palette already present on the site.
- Replace alternating card backgrounds with consistent surfaces, subtle borders, soft shadows, and 14–16px corner radii.
- Use a clearer type scale: section titles, card titles, metadata, body copy, and notes each receive a distinct visual level.
- Standardize interactive links as compact action chips with consistent hover and focus-visible states.
- Keep motion subtle and disable transitions when the user prefers reduced motion.

### Intro and general content

- Preserve the existing markup and reading order.
- Apply only light adjustments to page width, vertical rhythm, section headings, intro portrait treatment, and shared link controls.
- Keep the biography and research-interest content visually subordinate to Projects and Publications.

## Projects

- Wrap project cards in a `projects-grid` container.
- Use a two-column grid on wide screens and a single column on narrow screens.
- Convert each project into a vertical `project-card` with a fixed 16:9 image frame.
- Place title, action links, and description in a consistent content region.
- Remove the visible `Description:` label while retaining the full description text.
- Present Website and Code destinations as compact action chips using existing icon fonts.
- Use a small hover lift only on pointer-capable devices.

## Publications

- Retain a single-column chronological list.
- Use a `publication-list` wrapper and a dedicated `publication-card` class while preserving `pub-card` for the existing filter script.
- Lay out each card as a fixed-ratio thumbnail beside flexible publication details.
- Use consistent thumbnail dimensions and `object-fit: cover` to prevent source-image proportions from changing the row structure.
- Strengthen the paper-title level, then authors, venue, resource links, and description.
- Keep all author names and the shared equal-contribution/corresponding-author legend exactly once.
- Remove the visible `Description:` labels while retaining full description text.
- Convert available Paper, Project, PDF, Code, and arXiv links into action chips. Plain “Coming Soon” text remains non-interactive.
- Keep the Position paper tag and restyle it to match the shared badge system.

## Publication Controls

- Wrap the existing filter buttons and shared author legend in one `publication-toolbar`.
- Keep the current filter values (`all`, `2026`, `2025`, and `position`) and JavaScript behavior.
- Preserve the active state and add `aria-pressed` synchronization so the selected filter is exposed to assistive technology.
- Allow the controls to wrap cleanly on small screens.

## Responsive Behavior

- At tablet widths, reduce thumbnail width and card gaps before stacking content.
- At phone widths, show project and publication images at full card width in 16:9 frames.
- Allow action chips and filter controls to wrap without horizontal overflow.
- Keep tap targets comfortably sized and ensure long titles and author lists wrap within their cards.
- Avoid hover-only access to any information or action.

## Dark Theme and Accessibility

- Define all new surfaces, borders, shadows, and action states through theme variables.
- Maintain readable contrast for text, metadata, badges, and controls in both themes.
- Add visible `:focus-visible` outlines for links and buttons.
- Use semantic grouping labels for Projects, Publications, and the filter toolbar.
- Respect `prefers-reduced-motion: reduce`.

## Implementation Boundaries

- `_pages/about.md` owns the semantic wrappers and class names for the homepage content.
- `assets/css/custom.css` owns the visual system, layouts, responsive behavior, themes, and states.
- `assets/js/pub-filter.js` continues to own publication filtering and additionally keeps `aria-pressed` synchronized.
- `test/homepage-sections.test.js` verifies rendered structure, preserved content, accessible filter state, and filtering behavior against the generated homepage.

## Verification

- Build the Jekyll site with `bundle exec jekyll build`.
- Run all Node tests with `node --test test/*.test.js`.
- Verify the publication filter for all four choices.
- Inspect desktop, tablet, and mobile layouts in both light and dark themes.
- Confirm project/publication ordering, all author markers, and all existing destinations remain intact.

