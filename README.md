# Yueci Deng — Personal Academic Website

This repository contains the source for [yuecideng.github.io](https://yuecideng.github.io/), the academic website of **Yueci Deng (邓岳慈)**, a Ph.D. student at the School of Data Science, The Chinese University of Hong Kong, Shenzhen.

The site presents research on high-performance systems, simulation, Sim2Real learning, and embodied intelligence, together with selected projects, publications, and a curriculum vitae.

## Website

- [Home and research overview](https://yuecideng.github.io/)
- [Selected projects](https://yuecideng.github.io/#projects)
- [Publications](https://yuecideng.github.io/#publications)
- [Curriculum vitae](https://yuecideng.github.io/cv/)

## Local preview

The site is built with Jekyll and the Academic Pages theme.

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## Standalone PDF CV

The `resume/` directory contains a standalone LaTeX project migrated from
`yueci_resume`, with an updated local `resume.cls` layout. It compiles independently
of Jekyll and Node.js. Install TeX Live or MacTeX with XeLaTeX, then run:

```bash
bash scripts/build_cv.sh
```

The script compiles twice and copies the result to `files/cv.pdf`, which the CV
page exposes through its **Download PDF** link. Commit that PDF with source
updates so GitHub Pages can serve it without a LaTeX installation.

To compile only the LaTeX project, including after copying `resume/` elsewhere:

```bash
cd resume
xelatex -no-shell-escape -interaction=nonstopmode -halt-on-error main.tex
xelatex -no-shell-escape -interaction=nonstopmode -halt-on-error main.tex
```

This produces `resume/main.pdf`. Edit `resume/main.tex` for PDF content and
`resume/resume.cls` for its layout. The web CV remains maintained separately in
`_data/cv.json`; update both when changing shared information. The PDF uses the
website's academic email and includes its Ph.D. entry.

The PDF uses two A4 pages: education, industry experience, and research projects
on the first page; all publications, technical skills, and patents on the second.
The local class controls typography, section spacing, aligned dates, and page footers.

Publication entries follow the homepage, including author order, contribution
markers, venue/status, and paper links. After editing the homepage cards, run:

```bash
python3 scripts/sync_cv_publications.py
bash scripts/build_cv.sh
```

The sync script updates `_data/cv.json` and `resume/publications.tex`. Keep the
generated TeX file with `main.tex` and `resume.cls` when copying the standalone
project. Edit homepage cards rather than the generated publication entries.

## Content structure

- `_pages/about.md` — homepage, research overview, projects, and publications
- `_data/cv.json` — CV content; edit non-publication sections directly, sync publications from the homepage
- `_pages/cv.md` and `_includes/cv-template.html` — full CV at `/cv/` (legacy CV URLs redirect here)
- `_includes/resume-overview.html` — compact background and experience overview after Research on the homepage
- `assets/css/resume.css` — responsive, theme-aware styles for the CV and homepage overview
- `resume/main.tex` and `resume/resume.cls` — independently compilable LaTeX CV
- `resume/publications.tex` — publication list generated from the homepage
- `files/cv.pdf` — compiled PDF available from the web CV
- `_config.yml` — site metadata and author links
- `assets/` and `_sass/` — styling and client-side behavior
- `images/` — portraits, project media, and research figures

## Credits

Built with [Jekyll](https://jekyllrb.com/) and [Academic Pages](https://academicpages.github.io/), which is based on [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/). See [LICENSE](LICENSE) for licensing information.
