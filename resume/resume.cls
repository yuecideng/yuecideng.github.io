%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Medium Length Professional CV - RESUME CLASS FILE
%
% This template has been downloaded from:
% http://www.LaTeXTemplates.com
%
% This class file defines the structure and design of the template.
%
% Original header:
% Copyright (C) 2010 by Trey Hunner
%
% Copying and distribution of this file, with or without modification,
% are permitted in any medium without royalty provided the copyright
% notice and this notice are preserved. This file is offered as-is,
% without any warranty.
%
% Created by Trey Hunner and modified by www.LaTeXTemplates.com
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{resume}[2026/10/18 Academic and engineering CV]
\LoadClass[10pt,a4paper]{article}
\RequirePackage{xcolor}
\RequirePackage{enumitem}
\RequirePackage{needspace}
\RequirePackage{tabularx}
\RequirePackage{fancyhdr}

\definecolor{cvAccent}{HTML}{205B68}
\definecolor{cvText}{HTML}{20252B}
\definecolor{cvMuted}{HTML}{58616B}
\definecolor{cvRule}{HTML}{CCD5DA}
\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}
\setlength{\emergencystretch}{1.5em}
\setlist[itemize]{label=\textbullet,leftmargin=1.15em,labelsep=0.5em,
  topsep=2pt,itemsep=1.5pt,parsep=0pt,partopsep=0pt}
\widowpenalty=10000
\clubpenalty=10000
\raggedbottom

\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\fancyfoot[L]{\scriptsize\sffamily\color{cvMuted}Yueci Deng \enspace / \enspace Curriculum Vitae}
\fancyfoot[R]{\scriptsize\sffamily\color{cvMuted}\thepage}
\AtBeginDocument{\setlength{\headwidth}{\textwidth}}

\newcommand{\cvheading}[2]{%
  \noindent\begin{tabularx}{\linewidth}{@{}Xr@{}}%
    \textbf{#1} & {\fontsize{9}{10.5}\selectfont\color{cvMuted}#2}\\
  \end{tabularx}\par\nobreak
}
\newcommand{\cvrole}[1]{%
  {\fontsize{9.2}{11}\selectfont\color{cvAccent}#1\par}\nobreak
}
\newenvironment{rSection}[1]{%
  \par\addvspace{9pt}\Needspace{4\baselineskip}
  {\sffamily\fontsize{10}{12}\selectfont\bfseries\color{cvAccent}\MakeUppercase{#1}\par}
  \nobreak\vspace{3pt}{\color{cvRule}\hrule height 0.5pt}\nobreak\vspace{5pt}
}{\par}
\newenvironment{rSubsection}[4]{%
  \par\addvspace{5pt}\Needspace{5\baselineskip}
  \cvheading{#1}{#2}
  \cvrole{#3\if\relax\detokenize{#4}\relax\else\enspace\textbar\enspace#4\fi}
  \begin{itemize}
}{\end{itemize}\par}
\newcommand{\cveducation}[3]{%
  \par\addvspace{4pt}\Needspace{3\baselineskip}
  \cvheading{#1}{#2}
  {\fontsize{9.4}{11.5}\selectfont#3\par}
}
\newcommand{\cvproject}[4]{%
  \par\addvspace{5pt}\Needspace{4\baselineskip}
  \cvheading{#1}{#2}\cvrole{#3}
  {\fontsize{9.4}{11.5}\selectfont#4\par}
}
