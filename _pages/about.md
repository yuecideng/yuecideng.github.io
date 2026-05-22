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

My research interests are mainly in the following areas:
- **Systems**:
    - High-performance, Heterogeneous and GPU-accelerated Simulation Engine Architecture
    - Data Generation and Model Training Systems for Embodied Intelligence

- **Generative Simulation**:
    - Generative Model for Simulation
    - Differentiable Rendering and Physics
    - Neural Representation for Simulation

- **Embodied Intelligence**:
    - Physics-Structured Model Architecture
    - Online and Continual Learning for Embodied Agents
    - Sim2Real Transfer and Domain Adaptation


## Collaborations & Opportunities

I welcome research or open source project collaborations on Embodied Intelligence and Simulation Infrastructure. If you're interested in joint projects, code sharing, student internships, or industry partnerships, please contact me at <a href="mailto:yuecideng@link.cuhk.edu.cn">yuecideng@link.cuhk.edu.cn</a>.

## Projects {#projects}

<div class="card">
  <div class="card-image">
    <img src="images/embodichain_teaser.jpg" alt="EmbodiChain">
  </div>
  <div class="card-content">
    <a href="https://github.com/DexForce/EmbodiChain" class="papertitle">EmbodiChain: An end-to-end, GPU-accelerated, and modular platform for building generalized Embodied Intelligence</a>
    <div class="card-links">
      <a href="https://dexforce.com/embodichain/index.html#/">Website</a> | <a href="https://github.com/DexForce/EmbodiChain">Code</a>
    </div>
    <p class="card-desc"><strong>Description:</strong> EmbodiChain is a unified, GPU-accelerated framework designed for pushing the boundaries of embodied AI research and development. It integrates high-performance simulation, data collection via automated generative simulation techniques, data scaling pipeline, modular model architectures, and efficient training & evaluation tools. All of these components work seamlessly together to facilitate rapid experimentation and deployment of embodied intelligence and perform Sim2Real transfer into real-world robotic systems.</p>
  </div>
</div>

<div class="card">
  <div class="card-image">
    <img src="images/open3d.png" alt="Open3D">
  </div>
  <div class="card-content">
    <a href="https://www.open3d.org/" class="papertitle">Open3D: A Modern Library for 3D Data Processing</a>
    <div class="card-links">
      <a href="https://www.open3d.org/">Website</a> | <a href="https://github.com/isl-org/Open3D">Code</a>
    </div>
    <p class="card-desc"><strong>Description:</strong> The leading open-source library for 3D processing with 400K+ monthly downloads from PyPI. Open3D exposes a set of carefully selected data structures and algorithms in both C++ and Python for 3D data processing tasks including point cloud processing, mesh processing, and 3D visualization.</p>
  </div>
</div>

## Publications {#publications}

<div id="pub-filter-bar">
  <button class="pub-filter-btn active" data-filter="all">All</button>
  <button class="pub-filter-btn" data-filter="2026">2026</button>
  <button class="pub-filter-btn" data-filter="2025">2025</button>
  <button class="pub-filter-btn" data-filter="position">Position Papers</button>
</div>

<div class="card pub-card" data-year="2026">
  <div class="card-image">
    <img src="images/research/agent-chord.jpeg" alt="AgentChord">
  </div>
  <div class="card-content">
    <span class="papertitle">From Reaction to Anticipation: Proactive Failure Recovery through Agentic Task Graph for Robotic Manipulation</span>
    <div class="card-authors">
      <a href="https://shengxu.net/">Sheng Xu</a>,
      Ruixing Jin,
      <a href="https://hnuzhy.github.io/">Huayi Zhou</a>,
      Bo Yue,
      <a href="https://qiaoguanren.github.io/">Guanren Qiao</a>,
      Yunxin Tai,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      <a href="http://kuijia.site/">Kui Jia</a>,
      <a href="http://guiliang.me/">Guiliang Liu</a>,
    </div>
    <div class="card-venue">Robotics: Science and Systems (RSS), 2026</div>
    <div class="card-links">
      <a href="https://arxiv.org/abs/2605.11951">Paper</a> /
      <a href="https://shengxu.net/AgentChord/">Project</a> /
      <a href="https://github.com/EDEM-AI/AgentChord">Code</a>
    </div>
    <p class="card-desc"><strong>Description:</strong> A recovery-aware task-graph system that helps real robots anticipate disturbances, switch to prepared recovery branches, and keep long-horizon manipulation moving.</p>
  </div>
</div>

<div class="card pub-card" data-year="2026">
  <div class="card-image">
    <img src="images/research/yoto++.png" alt="YOTO++">
  </div>
  <div class="card-content">
    <span class="papertitle">YOTO++: Learning Long-Horizon Closed-Loop Bimanual Manipulation from One-Shot Human Video Demonstrations</span>
    <div class="card-authors">
      <a href="https://hnuzhy.github.io/">Huayi Zhou</a>,
      <a href="https://robbinw.github.io/">Ruixiang Wang</a>,
      Yunxin Tai,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      <a href="http://guiliang.me/">Guiliang Liu</a>,
      <a href="http://kuijia.site/">Kui Jia</a>
    </div>
    <div class="card-venue">Transactions on Pattern Analysis and Machine Intelligence (TPAMI), 2026</div>
    <div class="card-links">
      <a href="https://ieeexplore.ieee.org/document/11495283/">Paper</a> /
      <a href="https://hnuzhy.github.io/projects/YOTOPlus/">Project</a> /
      <a href="https://hnuzhy.github.io/projects/YOTOPlus/final_YOTO++.pdf">PDF</a> /
      <a href="https://github.com/hnuzhy/YOTO">Code</a>
    </div>
    <p class="card-desc"><strong>Description:</strong> YOTO++ (extended from the conference version You Only Teach Once) enables cross-embodiment deployment (from the contralateral to humanoid dual-arm setups), and facilitates diverse bimanual tasks including asynchronous, synchronous and tool-using scenarios, with closed-loop control under dynamic disturbances during pre-grasping.</p>
  </div>
</div>

<div class="card pub-card" data-year="2026">
  <div class="card-image">
    <img src="images/research/ewa.png" alt="EWA">
  </div>
  <div class="card-content">
    <span class="papertitle">EWA: Aligning Video World Models with Executable Robot Actions via Inverse Dynamics Rewards</span>
    <div class="card-authors">
      <a href="https://robbinw.github.io/">Ruixiang Wang</a>,
      <a href="https://github.com/MobiusLqm">Qingming Liu</a>,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      <a href="http://guiliang.me/">Guiliang Liu</a>,
      <a href="https://itszhen.com/">Zhen Liu</a>,
      <a href="http://kuijia.site/">Kui Jia</a>
    </div>
    <div class="card-links">
      <a href="https://arxiv.org/pdf/2603.17808">Paper</a> /
      <a href="https://eva-project-page.github.io/">Project</a> /
      <a href="https://github.com/RobbinW/EVA">Code</a>
    </div>
    <p class="card-desc"><strong>Description:</strong> A reward-aligned post-training framework that bridges visually plausible video rollouts and executable robot actions via inverse dynamics rewards.</p>
  </div>
</div>

<div class="card pub-card" data-year="2026">
  <div class="card-image">
    <img src="images/sim2real-vla.png" alt="Sim2Real-VLA">
  </div>
  <div class="card-content">
    <a href="https://openreview.net/pdf?id=H4SyKHjd4c" class="papertitle">Sim2Real VLA: Zero-Shot Generalization of Synthesized Skills to Realistic Manipulation</a>
    <div class="card-authors">
      <a href="https://github.com/ZhaoRunyi">Runyi Zhao</a>,
      <a href="https://shengxu.net/">Sheng Xu</a>,
      Ruixing Jin,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      Yunxin Tai,
      <a href="http://kuijia.site/">Kui Jia</a>,
      <a href="http://guiliang.me/">Guiliang Liu</a>
    </div>
    <div class="card-venue">International Conference on Learning Representations (ICLR), 2026 Poster</div>
    <div class="card-links">
      <a href="https://openreview.net/pdf?id=AVVXX0erKT">Paper</a> /
      <a href="https://github.com/DexForce/EmbodiChain">Code</a>
    </div>
    <p class="card-desc"><strong>Description:</strong> This paper introduces Sim2Real-VLA, a generalist robotic control model that enables zero-shot transfer from synthetic simulation to real-world manipulation tasks.</p>
  </div>
</div>

<div class="card pub-card" data-year="2025" data-category="position">
  <div class="card-image">
    <img src="images/gs-world.png" alt="GS-World">
  </div>
  <div class="card-content">
    <span class="papertitle">GS-World: An Engine-driven Learning Paradigm for Pursuing Embodied Intelligence using World Models of Generative Simulation</span>
    <span class="pub-tag">Position paper</span>
    <div class="card-authors">
      <a href="http://guiliang.me/">Guiliang Liu</a>,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      <a href="https://itszhen.com/">Zhen Liu</a>,
      <a href="http://kuijia.site/">Kui Jia</a>
    </div>
    <div class="card-links">
      <a href="https://www.researchgate.net/profile/Guiliang-Liu-2/publication/396641390_GS-World_An_Efficient_Engine-driven_Learning_Paradigm_for_Pursuing_Embodied_Intelligence_using_World_Models_of_Generative_Simulation/links/68f33c277d9a4d4e870a9a9d/GS-World-An-Efficient-Engine-driven-Learning-Paradigm-for-Pursuing-Embodied-Intelligence-using-World-Models-of-Generative-Simulation.pdf">Paper</a>
    </div>
  </div>
</div>

<div class="card pub-card" data-year="2025">
  <div class="card-image">
    <img src="images/research/dexscale.png" alt="DexScale">
  </div>
  <div class="card-content">
    <a href="https://edem-ai.github.io/dexscale.github.io/" class="papertitle">DexScale: Automating Data Scaling for Sim2Real Generalizable Robot Control</a>
    <div class="card-authors">
      <a href="http://guiliang.me/">Guiliang Liu</a><sup>*</sup>,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a><sup>*</sup>,
      <a href="https://github.com/ZhaoRunyi">Runyi Zhao</a>,
      <a href="https://hnuzhy.github.io/">Huayi Zhou</a>,
      Jian Chen,
      Jietao Chen,
      Ruiyan Xu,
      Yunxin Tai,
      <a href="http://kuijia.site/">Kui Jia</a>
    </div>
    <div class="card-note">(*Equal contribution)</div>
    <div class="card-venue">International Conference on Machine Learning (ICML), 2025 Poster</div>
    <div class="card-links">
      <a href="https://openreview.net/pdf?id=AVVXX0erKT">Paper</a> /
      <a href="https://github.com/DexForce/EmbodiChain">Code</a>
    </div>
    <p class="card-desc"><strong>Description:</strong> A novel data engine for automating data generation and scaling for sim-to-real transfer of robotic manipulation tasks.</p>
  </div>
</div>

<div class="card pub-card" data-year="2025">
  <div class="card-image">
    <img src="images/yoto.png" alt="YOTO">
  </div>
  <div class="card-content">
    <a href="https://hnuzhy.github.io/projects/YOTO" class="papertitle">You Only Teach Once: Learn One-Shot Bimanual Robotic Manipulation from Video Demonstrations</a>
    <div class="card-authors">
      <a href="https://hnuzhy.github.io/">Huayi Zhou</a>,
      <a href="https://robbinw.github.io/">Ruixiang Wang</a>,
      Yunxin Tai,
      <a href="https://yuecideng.github.io"><strong>Yueci Deng</strong></a>,
      <a href="http://guiliang.me/">Guiliang Liu</a>,
      <a href="http://kuijia.site/">Kui Jia</a>
    </div>
    <div class="card-venue">Robotics: Science and Systems (RSS), 2025</div>
    <div class="card-links">
      <a href="https://arxiv.org/abs/2501.14208">Paper</a> /
      <a href="https://github.com/hnuzhy/YOTO">Code</a>
    </div>
    <p class="card-desc"><strong>Description:</strong> This work proposes the YOTO (You Only Teach Once), which can extract and then inject patterns of bimanual actions from as few as a single binocular observation of hand movements, and teach dual robot arms various complex tasks.</p>
  </div>
</div>

<script src="{{ '/assets/js/pub-filter.js' | relative_url }}" defer></script>
