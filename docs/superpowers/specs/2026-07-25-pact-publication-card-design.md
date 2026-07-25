# PAct Publication Card Design

## Goal

Add PAct as the newest 2026 publication on the homepage while preserving the site's existing publication-card layout and filtering behavior.

## Placement and Presentation

- Insert the PAct card at the top of the 2026 publication list in `_pages/about.md`.
- Use the existing `card pub-card` markup with `data-year="2026"` so the year filter continues to work.
- Use `images/research/pact.jpeg` as the card image with `PAct` as its alternative text.
- Link the paper title to the official PAct project page.

## Publication Content

- **Title:** PAct: Part-Decomposed Single-View Articulated Object Generation
- **Authors:** Qingming Liu, Xinyue Yao, Shuyuan Zhang, Yueci Deng, Guiliang Liu, Zhen Liu (corresponding author), Kui Jia
- Highlight Yueci Deng using the same bold linked treatment as the existing publication cards.
- Link author names when their official profile URL is available from the PAct project page.
- **Venue:** ACM SIGGRAPH Asia 2026
- **Links:** arXiv, Project, Code
- **Description:** PAct generates complete, part-decomposed articulated 3D objects from a single-view image, synthesizing high-fidelity geometry and appearance while estimating kinematic structures for direct use in physics-based simulation.

## Official URLs

- Project: https://pact-project.github.io/
- arXiv: https://arxiv.org/abs/2602.14965
- Code: https://github.com/Mobiuslqm/PAct

## Scope

No global layout, styling, filtering logic, or unrelated publication content will be changed. No new image will be generated because the requested image already exists in the repository.

## Verification

- Confirm the PAct card appears before the other 2026 publications.
- Confirm the image path resolves and all three resource links are correct.
- Confirm the card is visible under both the All and 2026 filters.
- Run the repository's available site build or equivalent validation and verify the generated page contains the new card without markup errors.
