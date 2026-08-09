---
permalink: /
title: ""
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

<div class="intro">
  <div class="intro-photo">
    <img src="images/dyc.png" alt="Yueci Deng">
  </div>
  <div class="intro-bio">
    <h1 class="intro-name">Yueci Deng (邓岳慈)</h1>
    <p class="intro-affil">Ph.D. Student, School of Data Science, CUHK-SZ</p>
    <p class="intro-text">I am a first-year CS Ph.D. student at the Chinese University of Hong Kong, Shenzhen (CUHK-SZ), supervised by Prof <a href="http://kuijia.site/">Kui Jia</a>. I received my B.S. from UESTC (2014-2018) and M.S. from NTU, Singapore (2018-2019). Before joining CUHK-SZ, I worked as an architect at <a href="https://en.dexforce.com/core.html">DexForce Technology</a>, where I led the development of DexVerse<sup>TM</sup>, a Sim2Real AI Platform for Embodied Intelligence.</p>
    <div class="intro-links">
      <a href="mailto:yuecideng@link.cuhk.edu.cn"><i class="fas fa-envelope"></i> Email</a>
      <a href="https://scholar.google.com/citations?user=URHu9IUAAAAJ"><i class="ai ai-google-scholar"></i> Scholar</a>
      <a href="https://github.com/yuecideng"><i class="fab fa-github"></i> GitHub</a>
    </div>
  </div>
</div>

<section class="research-agenda-section" markdown="1">

## Research {#research}

<p class="research-summary">I build high-performance, scalable systems that connect generative worlds, hybrid simulation, and Sim2Real learning, enabling embodied agents to continually learn from their own rollouts in both simulated and real-world environments.</p>

<figure class="research-agenda-figure">
  <a class="research-agenda-link" href="images/research/sim2real-embodied-ai-agenda.png" aria-describedby="research-agenda-caption">
    <picture>
      <source srcset="images/research/sim2real-embodied-ai-agenda.webp" type="image/webp">
      <img src="images/research/sim2real-embodied-ai-agenda.png" alt="Closed-loop Sim2Real research agenda: generate executable worlds, combine physics-based and neural world simulation, learn from verified experience, deploy to real robots, evaluate results, and feed failures back into world generation and calibration." width="1536" height="1024" loading="lazy" decoding="async">
    </picture>
  </a>
  <figcaption id="research-agenda-caption">Select the diagram to view it at full resolution.</figcaption>
</figure>

</section>


## Collaborations & Opportunities

I welcome research or open source project collaborations on Embodied Intelligence and Simulation Infrastructure. If you're interested in joint projects, code sharing, student internships, or industry partnerships, please contact me at <a href="mailto:yuecideng@link.cuhk.edu.cn">yuecideng@link.cuhk.edu.cn</a>.

<section class="research-section research-projects-section" markdown="1">

## Projects {#projects}

<div class="project-list" aria-label="Research projects">
<article class="research-row project-row">
  <div class="card-image">
    <img src="images/embodichain_teaser.jpg" alt="EmbodiChain">
  </div>
  <div class="card-content">
    <h3 class="card-title"><a href="https://github.com/DexForce/EmbodiChain" class="papertitle">EmbodiChain: An end-to-end, GPU-accelerated, and modular platform for building generalized Embodied Intelligence</a></h3>
    <div class="card-links">
      <a href="https://dexforce.com/embodichain/index.html#/">Website</a> | <a href="https://github.com/DexForce/EmbodiChain">Code</a>
    </div>
    <p class="card-desc">EmbodiChain is a unified, GPU-accelerated framework designed for pushing the boundaries of embodied AI research and development. It integrates high-performance simulation, data collection via automated generative simulation techniques, data scaling pipeline, modular model architectures, and efficient training & evaluation tools. All of these components work seamlessly together to facilitate rapid experimentation and deployment of embodied intelligence and perform Sim2Real transfer into real-world robotic systems.</p>
  </div>
</article>

<article class="research-row project-row">
  <div class="card-image">
    <img src="images/open3d.png" alt="Open3D">
  </div>
  <div class="card-content">
    <h3 class="card-title"><a href="https://www.open3d.org/" class="papertitle">Open3D: A Modern Library for 3D Data Processing</a></h3>
    <div class="card-links">
      <a href="https://www.open3d.org/">Website</a> | <a href="https://github.com/isl-org/Open3D">Code</a>
    </div>
    <p class="card-desc">The leading open-source library for 3D processing with 400K+ monthly downloads from PyPI. Open3D exposes a set of carefully selected data structures and algorithms in both C++ and Python for 3D data processing tasks including point cloud processing, mesh processing, and 3D visualization.</p>
  </div>
</article>
</div>

</section>

<section class="research-section research-publications-section" markdown="1">

## Publications {#publications}

<div id="pub-filter-bar">
  <button class="pub-filter-btn active" data-filter="all" aria-pressed="true">All</button>
  <button class="pub-filter-btn" data-filter="2026" aria-pressed="false">2026</button>
  <button class="pub-filter-btn" data-filter="2025" aria-pressed="false">2025</button>
  <button class="pub-filter-btn" data-filter="position" aria-pressed="false">Position Papers</button>
</div>

<p class="publication-author-legend"><sup>*</sup> Equal contribution; <sup>†</sup> Corresponding author</p>

<div class="publication-list" aria-label="Selected publications">
<article class="research-row publication-row pub-card" data-year="2026">
  <div class="card-image">
    <img src="images/research/pact.jpeg" alt="PAct">
  </div>
  <div class="card-content">
    <h3 class="card-title"><a href="https://pact-project.github.io/" class="papertitle">PAct: Part-Decomposed Single-View Articulated Object Generation</a></h3>
    <div class="card-authors">
      <a href="https://github.com/MobiusLqm">Qingming Liu</a>,
      <a href="https://scholar.google.com/citations?user=ZOf_esUAAAAJ">Xinyue Yao</a>,
      <a href="https://sanbingyouyong.github.io/">Shuyuan Zhang</a>,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      <a href="http://guiliang.me/">Guiliang Liu</a>,
      <a href="https://itszhen.com/">Zhen Liu</a><sup>†</sup>,
      <a href="http://kuijia.site/">Kui Jia</a>
    </div>
    <div class="card-venue venue-pill">ACM SIGGRAPH Asia 2026</div>
    <div class="action-links publication-links">
      <a href="https://arxiv.org/abs/2602.14965" class="action-link"><i class="ai ai-arxiv" aria-hidden="true"></i> arXiv</a>
      <a href="https://pact-project.github.io/" class="action-link"><i class="fas fa-globe" aria-hidden="true"></i> Project</a>
      <a href="https://github.com/Mobiuslqm/PAct" class="action-link"><i class="fab fa-github" aria-hidden="true"></i> Code</a>
    </div>
    <p class="card-desc">PAct generates complete, part-decomposed articulated 3D objects from a single-view image, synthesizing high-fidelity geometry and appearance while estimating kinematic structures for direct use in physics-based simulation.</p>
  </div>
</article>

<article class="research-row publication-row pub-card" data-year="2026">
  <div class="card-image">
    <img src="images/research/apg_vs_ppo.png" alt="APG vs PPO">
  </div>
  <div class="card-content">
    <h3 class="card-title"><span class="papertitle">Backpropagating Through Simulation: Analytic Policy Gradients for Sample and Learning Efficient Differentiable Continuous Control</span></h3>
    <div class="card-authors">
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a><sup>†</sup>,
    </div>
    <div class="action-links publication-links">
      <a href="https://arxiv.org/pdf/2606.21525" class="action-link"><i class="fas fa-file-alt" aria-hidden="true"></i> Paper</a>
      <a href="https://github.com/yuecideng/analytic_policy_gradients" class="action-link"><i class="fab fa-github" aria-hidden="true"></i> Code</a>
    </div>
    <p class="card-desc">A differentiable-control benchmark and training framework that compares Analytic Policy Gradients with PPO across continuous control tasks, using backpropagation through simulation to study sample-efficient policy optimization.</p>
  </div>
</article>

<article class="research-row publication-row pub-card" data-year="2026">
  <div class="card-image">
    <img src="images/research/ftc.png" alt="FTC">
  </div>
  <div class="card-content">
    <h3 class="card-title"><span class="papertitle">Focus-Then-Contact: Speeding Up Robotic Contact-Rich Task Learning with Affordance-Guided Real-World Residual Reinforcement Learning</span></h3>
    <div class="card-authors">
      <a href="https://qiaoguanren.github.io/">Guanren Qiao</a>,
      Ruixiang Ouyang,
      <a href="https://shengxu.net/">Sheng Xu</a>,
      Ruixing Jin,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      Yunxin Tai,
      <a href="http://kuijia.site/">Kui Jia</a>,
      <a href="http://guiliang.me/">Guiliang Liu</a><sup>†</sup>
    </div>
    <div class="card-venue venue-pill">International Conference on Machine Learning (ICML), 2026</div>
    <div class="action-links publication-links">
      <span class="action-status">Paper / Project / Code (Coming Soon)</span>
    </div>
    <p class="card-desc">A lightweight real-world RL method that uses residual RL and affordance-guided rewards to speed up contact-rich robot manipulation learning with minimal human-in-the-loop effort.</p>
  </div>
</article>

<article class="research-row publication-row pub-card" data-year="2026">
  <div class="card-image">
    <img src="images/research/agent-chord.jpeg" alt="AgentChord">
  </div>
  <div class="card-content">
    <h3 class="card-title"><span class="papertitle">From Reaction to Anticipation: Proactive Failure Recovery through Agentic Task Graph for Robotic Manipulation</span></h3>
    <div class="card-authors">
      <a href="https://shengxu.net/">Sheng Xu</a>,
      Ruixing Jin,
      <a href="https://hnuzhy.github.io/">Huayi Zhou</a>,
      Bo Yue,
      <a href="https://qiaoguanren.github.io/">Guanren Qiao</a>,
      Yunxin Tai,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      <a href="http://kuijia.site/">Kui Jia</a>,
      <a href="http://guiliang.me/">Guiliang Liu</a><sup>†</sup>,
    </div>
    <div class="card-venue venue-pill">Robotics: Science and Systems (RSS), 2026</div>
    <div class="action-links publication-links">
      <a href="https://arxiv.org/abs/2605.11951" class="action-link"><i class="fas fa-file-alt" aria-hidden="true"></i> Paper</a>
      <a href="https://shengxu.net/AgentChord/" class="action-link"><i class="fas fa-globe" aria-hidden="true"></i> Project</a>
      <a href="https://github.com/EDEM-AI/AgentChord" class="action-link"><i class="fab fa-github" aria-hidden="true"></i> Code</a>
    </div>
    <p class="card-desc">A recovery-aware task-graph system that helps real robots anticipate disturbances, switch to prepared recovery branches, and keep long-horizon manipulation moving.</p>
  </div>
</article>

<article class="research-row publication-row pub-card" data-year="2026">
  <div class="card-image">
    <img src="images/research/yoto++.png" alt="YOTO++">
  </div>
  <div class="card-content">
    <h3 class="card-title"><span class="papertitle">YOTO++: Learning Long-Horizon Closed-Loop Bimanual Manipulation from One-Shot Human Video Demonstrations</span></h3>
    <div class="card-authors">
      <a href="https://hnuzhy.github.io/">Huayi Zhou</a>,
      <a href="https://robbinw.github.io/">Ruixiang Wang</a>,
      Yunxin Tai,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      <a href="http://guiliang.me/">Guiliang Liu</a>,
      <a href="http://kuijia.site/">Kui Jia</a><sup>†</sup>
    </div>
    <div class="card-venue venue-pill">Transactions on Pattern Analysis and Machine Intelligence (TPAMI), 2026</div>
    <div class="action-links publication-links">
      <a href="https://ieeexplore.ieee.org/document/11495283/" class="action-link"><i class="fas fa-file-alt" aria-hidden="true"></i> Paper</a>
      <a href="https://hnuzhy.github.io/projects/YOTOPlus/" class="action-link"><i class="fas fa-globe" aria-hidden="true"></i> Project</a>
      <a href="https://hnuzhy.github.io/projects/YOTOPlus/final_YOTO++.pdf" class="action-link"><i class="fas fa-file-pdf" aria-hidden="true"></i> PDF</a>
      <a href="https://github.com/hnuzhy/YOTO" class="action-link"><i class="fab fa-github" aria-hidden="true"></i> Code</a>
    </div>
    <p class="card-desc">YOTO++ (extended from the conference version You Only Teach Once) enables cross-embodiment deployment (from the contralateral to humanoid dual-arm setups), and facilitates diverse bimanual tasks including asynchronous, synchronous and tool-using scenarios, with closed-loop control under dynamic disturbances during pre-grasping.</p>
  </div>
</article>

<article class="research-row publication-row pub-card" data-year="2026">
  <div class="card-image">
    <img src="images/research/ewa.png" alt="EWA">
  </div>
  <div class="card-content">
    <h3 class="card-title"><span class="papertitle">EWA: Aligning Video World Models with Executable Robot Actions via Inverse Dynamics Rewards</span></h3>
    <div class="card-authors">
      <a href="https://robbinw.github.io/">Ruixiang Wang</a>,
      <a href="https://github.com/MobiusLqm">Qingming Liu</a>,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      <a href="http://guiliang.me/">Guiliang Liu</a>,
      <a href="https://itszhen.com/">Zhen Liu</a><sup>†</sup>,
      <a href="http://kuijia.site/">Kui Jia</a>
    </div>
    <div class="action-links publication-links">
      <a href="https://arxiv.org/pdf/2603.17808" class="action-link"><i class="fas fa-file-alt" aria-hidden="true"></i> Paper</a>
      <a href="https://eva-project-page.github.io/" class="action-link"><i class="fas fa-globe" aria-hidden="true"></i> Project</a>
      <a href="https://github.com/RobbinW/EVA" class="action-link"><i class="fab fa-github" aria-hidden="true"></i> Code</a>
    </div>
    <p class="card-desc">A reward-aligned post-training framework that bridges visually plausible video rollouts and executable robot actions via inverse dynamics rewards.</p>
  </div>
</article>

<article class="research-row publication-row pub-card" data-year="2026">
  <div class="card-image">
    <img src="images/sim2real-vla.png" alt="Sim2Real-VLA">
  </div>
  <div class="card-content">
    <h3 class="card-title"><a href="https://openreview.net/pdf?id=H4SyKHjd4c" class="papertitle">Sim2Real VLA: Zero-Shot Generalization of Synthesized Skills to Realistic Manipulation</a></h3>
    <div class="card-authors">
      <a href="https://github.com/ZhaoRunyi">Runyi Zhao</a>,
      <a href="https://shengxu.net/">Sheng Xu</a>,
      Ruixing Jin,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      Yunxin Tai,
      <a href="http://kuijia.site/">Kui Jia</a>,
      <a href="http://guiliang.me/">Guiliang Liu</a><sup>†</sup>
    </div>
    <div class="card-venue venue-pill">International Conference on Learning Representations (ICLR), 2026 Poster</div>
    <div class="action-links publication-links">
      <a href="https://openreview.net/pdf?id=AVVXX0erKT" class="action-link"><i class="fas fa-file-alt" aria-hidden="true"></i> Paper</a>
      <a href="https://github.com/DexForce/EmbodiChain" class="action-link"><i class="fab fa-github" aria-hidden="true"></i> Code</a>
    </div>
    <p class="card-desc">This paper introduces Sim2Real-VLA, a generalist robotic control model that enables zero-shot transfer from synthetic simulation to real-world manipulation tasks.</p>
  </div>
</article>

<article class="research-row publication-row pub-card" data-year="2025" data-category="position">
  <div class="card-image">
    <img src="images/gs-world.png" alt="GS-World">
  </div>
  <div class="card-content">
    <h3 class="card-title"><span class="papertitle">GS-World: An Engine-driven Learning Paradigm for Pursuing Embodied Intelligence using World Models of Generative Simulation</span></h3>
    <span class="pub-tag">Position paper</span>
    <div class="card-authors">
      <a href="http://guiliang.me/">Guiliang Liu</a>,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      <a href="https://itszhen.com/">Zhen Liu</a>,
      <a href="http://kuijia.site/">Kui Jia</a><sup>†</sup>
    </div>
    <div class="action-links publication-links">
      <a href="https://www.researchgate.net/profile/Guiliang-Liu-2/publication/396641390_GS-World_An_Efficient_Engine-driven_Learning_Paradigm_for_Pursuing_Embodied_Intelligence_using_World_Models_of_Generative_Simulation/links/68f33c277d9a4d4e870a9a9d/GS-World-An-Efficient-Engine-driven-Learning-Paradigm-for-Pursuing-Embodied-Intelligence-using-World-Models-of-Generative-Simulation.pdf" class="action-link"><i class="fas fa-file-alt" aria-hidden="true"></i> Paper</a>
    </div>
  </div>
</article>

<article class="research-row publication-row pub-card" data-year="2025">
  <div class="card-image">
    <img src="images/research/dexscale.png" alt="DexScale">
  </div>
  <div class="card-content">
    <h3 class="card-title"><a href="https://edem-ai.github.io/dexscale.github.io/" class="papertitle">DexScale: Automating Data Scaling for Sim2Real Generalizable Robot Control</a></h3>
    <div class="card-authors">
      <a href="http://guiliang.me/">Guiliang Liu</a><sup>*</sup>,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a><sup>*</sup>,
      <a href="https://github.com/ZhaoRunyi">Runyi Zhao</a>,
      <a href="https://hnuzhy.github.io/">Huayi Zhou</a>,
      Jian Chen,
      Jietao Chen,
      Ruiyan Xu,
      Yunxin Tai,
      <a href="http://kuijia.site/">Kui Jia</a><sup>†</sup>
    </div>
    <div class="card-venue venue-pill">International Conference on Machine Learning (ICML), 2025 Poster</div>
    <div class="action-links publication-links">
      <a href="https://openreview.net/pdf?id=AVVXX0erKT" class="action-link"><i class="fas fa-file-alt" aria-hidden="true"></i> Paper</a>
      <a href="https://github.com/DexForce/EmbodiChain" class="action-link"><i class="fab fa-github" aria-hidden="true"></i> Code</a>
    </div>
    <p class="card-desc">A novel data engine for automating data generation and scaling for sim-to-real transfer of robotic manipulation tasks.</p>
  </div>
</article>

<article class="research-row publication-row pub-card" data-year="2025">
  <div class="card-image">
    <img src="images/yoto.png" alt="YOTO">
  </div>
  <div class="card-content">
    <h3 class="card-title"><a href="https://hnuzhy.github.io/projects/YOTO" class="papertitle">You Only Teach Once: Learn One-Shot Bimanual Robotic Manipulation from Video Demonstrations</a></h3>
    <div class="card-authors">
      <a href="https://hnuzhy.github.io/">Huayi Zhou</a>,
      <a href="https://robbinw.github.io/">Ruixiang Wang</a>,
      Yunxin Tai,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      <a href="http://guiliang.me/">Guiliang Liu</a>,
      <a href="http://kuijia.site/">Kui Jia</a><sup>†</sup>
    </div>
    <div class="card-venue venue-pill">Robotics: Science and Systems (RSS), 2025</div>
    <div class="action-links publication-links">
      <a href="https://arxiv.org/abs/2501.14208" class="action-link"><i class="fas fa-file-alt" aria-hidden="true"></i> Paper</a>
      <a href="https://github.com/hnuzhy/YOTO" class="action-link"><i class="fab fa-github" aria-hidden="true"></i> Code</a>
    </div>
    <p class="card-desc">This work proposes the YOTO (You Only Teach Once), which can extract and then inject patterns of bimanual actions from as few as a single binocular observation of hand movements, and teach dual robot arms various complex tasks.</p>
  </div>
</article>
</div>

</section>

<script src="{{ '/assets/js/pub-filter.js' | relative_url }}" defer></script>
