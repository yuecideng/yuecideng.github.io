# Wide Research Sections Design

## Goal

Give the Projects and Publications sections more useful horizontal space on
large screens so their images and text remain legible, while preserving the
existing width and appearance of the rest of the homepage.

## Root Cause

The theme allows the main container to grow to 1280px, but the custom homepage
stylesheet constrains `.page` to 900px. Projects and Publications currently
inherit that 900px limit, so publication images render at only 195px even on a
wide display.

The 900px limit is appropriate for the biography and prose sections. The fix
must therefore widen only the two research sections instead of changing the
global `.page` width.

## Approved Layout

Projects and Publications will each use a dedicated `.research-section`
wrapper. On wide displays the wrapper will:

- stay centered relative to the viewport;
- grow to a maximum width of 1120px;
- retain at least 1rem of space on each side of the viewport;
- include the section heading, and for Publications, the filter bar;
- contain the existing project/publication list without changing its content.

The rest of the homepage remains inside the existing centered 900px page
column.

## Media Columns

The research rows will use the following image-column widths:

| Viewport | Projects | Publications |
| --- | ---: | ---: |
| 1025px and wider | 330px | 270px |
| 769px–1024px | 245px | 195px |
| 560px–768px | 170px | 145px |
| Up to 559px | stacked | 104px |

The current phone behavior remains unchanged. Project images stack above their
text, while publication thumbnails remain compact beside their text.

## Image Treatment

Images will retain the existing 16:9 media frame and `object-fit: cover`
behavior. Open3D will retain its `object-fit: contain` exception. The layout
will enlarge the rendered image area without stretching the source pixels or
changing the image aspect ratio.

## Markup

Only the existing Projects and Publications blocks in `_pages/about.md` will
receive wrapper elements:

- Projects heading and `.project-list` inside one `.research-section`.
- Publications heading, filter bar, and `.publication-list` inside another
  `.research-section`.

No names, links, descriptions, publication metadata, or other homepage
sections will change.

## Responsive Behavior

The breakout width applies at 901px and above, where the normal page column
would otherwise be visibly narrow. The wrapper will use a viewport-safe width
of the smaller of 1120px and the viewport minus 2rem, then center itself around
the existing page column. At 900px and below the wrapper stays at 100% width
and aligns with the ordinary page content.

The implementation must not introduce horizontal scrolling at 1280px, 1024px,
768px, or 390px viewport widths.

## Themes and Interaction

The change is structural and does not introduce new colors, backgrounds, or
interaction. Existing dark/light theme behavior and publication filtering must
continue to work unchanged.

## Testing

Automated layout-contract tests will verify:

- both research sections use the dedicated wrapper;
- no homepage content before Projects changes;
- the wide wrapper has a 1120px maximum and safe viewport gutters;
- desktop image columns are 330px and 270px;
- the existing 245px/195px, 170px/145px, and stacked/104px breakpoints remain;
- publication filtering and content preservation tests still pass.

Browser verification will measure the actual rendered widths and overflow at
1280px, 1024px, 768px, and 390px. Dark and light themes will both be inspected.

## Scope

Permitted implementation files:

- `_pages/about.md`
- `assets/css/custom.css`
- `test/research-sections.test.js`

The production `_config.yml`, local preview configuration, biography, research
interests, collaboration copy, navigation, footer, and publication/project
content are out of scope.
