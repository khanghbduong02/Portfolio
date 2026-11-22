import {
  // Works
  netapp,
  d_academy,
  pho316,
  vgf,
  // Technologies
  python,
  javascript,
  reactjs,
  tailwind,
  django,
  flask,
  sklearn,
  pytorch,
  mysql,
  numpy,
  git,
  docker,
  jupyter,
  threejs,
  mongodb,
  html,
  css,
  java,
  sql,
  cpp,
  unity,
  godot,
  // Projects
  ezresume,
  banking,
  elsewhere,
  segmentation,
  mask,
  frs,
  divoomPc,
  chocolateVision,
  faceDetection,
  fileToAscii,
  flappyBird,
  guardianTrail,
  handwrittenDigit,
  snakeGame,
  printFailure,
  infiniteMinesweeper,
  oAnQuan,
  // Testimonials
  philipq,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "tech",
    title: "Technologies",
  },
  {
    id: "project",
    title: "Project",
  },
  {
    id: "feedback",
    title: "Testimonials",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Software Developer",
  },
  {
    title: "Data Analyst",
  },
  {
    title: "Data Scientist",
  },
  {
    title: "AI/ML Engineer",
  },
];

const experiences = [
  {
    title: "Software Engineer Intern",
    company_name: "NetApp, Inc.",
    icon: netapp,
    date: "Jun 2026 - Present",
    points: [
      "Engineered data pipelines to collect, clean, and validate hardware telemetry across hosts, controllers, RAID configurations, and drive protocols.",
      "Developed and enhanced a Django-based Database Web Interface and PyNT automation system using Django, SQL, and Pytest to validate data and run test suites across preconfigured testbeds.",
      "Built scikit-learn and CatBoost surrogate models to predict random and sequential read/write performance, reducing configuration-tuning cycles from weeks to hours.",
      "Collaborated through Jira, Confluence, and Bitbucket to track work and deliver process improvements.",
    ],
  },
  {
    title: "Web Developer & Webmaster",
    company_name: "Pho 316 Restaurant",
    icon: pho316,
    date: "Feb 2026 - Present",
    website_url: "https://pho316.com",
    points: [
      "Architected and deployed a responsive, mobile-first React website, establishing the restaurant's digital presence.",
      "Implemented Google Analytics 4 with react-ga4 to monitor acquisition sources and real-time traffic.",
      "Configured GitHub-to-Cloudflare Pages CI/CD for automated builds and zero-downtime content deployments.",
      "Improved page performance by compressing food media, adopting modern image formats, and reducing bundle size to achieve sub-second load times.",
      "Instrumented outbound delivery and directions links to measure high-value conversion paths.",
    ],
  },
  {
    title: "Software Engineer in Test - Performance Benchmarking",
    company_name: "NetApp, Inc.",
    icon: netapp,
    date: "Sep 2023 - Jun 2026",
    points: [
      "Designed YAML-driven testbeds for controller firmware validation across storage configurations.",
      "Built and benchmarked storage configurations across controllers and protocols using IOMeter and VDbench, surfacing results through a database web interface for customer support.",
      "Collaborated through Confluence, Jira, and Bitbucket to coordinate performance-testing work and process improvements.",
    ],
  },
  {
    title: "Science Private Tutor",
    company_name: "D-Academy, Vietnam",
    icon: d_academy,
    date: "Sep 2020 - Jun 2021",
    points: [
      "Tutored students preparing for graduation in mathematics, physics, and chemistry.",
      "Deepened my understanding of core subjects and education fundamentals.",
      "Delivered a combination of in-person and remote instruction.",
      "Collaborated with educators and students' parents to develop tailored tutoring plans.",
    ],
  },
  {
    title: "Aerobic Gymnastics Professional Athlete",
    company_name: "Vietnam Gymnastics Federation, Vietnam",
    icon: vgf,
    date: "Jan 2006 - Feb 2017",
    points: [
      "Competed in aerobic gymnastics at national and international levels.",
      "Won first prize (gold medal) in the men's individual performance at the 2015 Asian Championship.",
      "Demonstrated discipline, dedication, and perseverance in training and competition.",
      "Developed teamwork, time-management, and goal-setting skills.",
    ],
  },
];

const technologies = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "SQL",
    icon: sql,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Django",
    icon: django,
  },
  {
    name: "Flask",
    icon: flask,
  },
  {
    name: "Scikit Learn",
    icon: sklearn,
  },
  {
    name: "PyTorch",
    icon: pytorch,
  },
  {
    name: "NumPy",
    icon: numpy,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "Jupyter",
    icon: jupyter,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "HTML",
    icon: html,
  },
  {
    name: "CSS",
    icon: css,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "C++",
    icon: cpp,
  },
  {
    name: "Unity",
    icon: unity,
  },
  {
    name: "Godot",
    icon: godot,
  },
];

const technologyGroups = [
  {
    title: "Machine Learning & Data",
    skills: [
      { name: "Python", evidence: "featured", orbit: 3 },
      { name: "PyTorch", evidence: "strong", orbit: 0 },
      { name: "NumPy", evidence: "strong", orbit: 7 },
      { name: "Scikit Learn", evidence: "strong", orbit: 1 },
      { name: "SQL", evidence: "strong", orbit: 2 },
      { name: "Jupyter", evidence: "working", orbit: 4 },
      { name: "MySQL", evidence: "working", orbit: 5 },
      { name: "MongoDB", evidence: "foundation", orbit: 6 },
    ],
  },
  {
    title: "Web Applications",
    skills: [
      { name: "React JS", evidence: "featured", orbit: 3 },
      { name: "JavaScript", evidence: "strong", orbit: 0 },
      { name: "Django", evidence: "strong", orbit: 1 },
      { name: "Flask", evidence: "strong", orbit: 2 },
      { name: "Tailwind CSS", evidence: "working", orbit: 4 },
      { name: "HTML", evidence: "foundation", orbit: 5 },
      { name: "CSS", evidence: "foundation", orbit: 6 },
    ],
  },
  {
    title: "Programming & Tooling",
    skills: [
      { name: "Git", evidence: "strong", orbit: 0 },
      { name: "Docker", evidence: "working", orbit: 1 },
      { name: "Java", evidence: "working", orbit: 2 },
      { name: "C++", evidence: "foundation", orbit: 3 },
    ],
  },
  {
    title: "Interactive Systems",
    skills: [
      { name: "Godot", evidence: "strong", orbit: 0 },
      { name: "Unity", evidence: "working", orbit: 1 },
      { name: "Three JS", evidence: "working", orbit: 2 },
    ],
  },
];

const projects = [
  {
    name: "Ô Ăn Quan RL",
    description:
    "Built an AlphaZero-style reinforcement-learning agent for Ô ăn quan, the Vietnamese mancala game. The project pairs an immutable rules engine with a 29-feature action-aware encoding, a hand-written NumPy policy/value network, PUCT search and a multiprocess self-play loop. A supervised warm start from a greedy teacher plus a terminal-value fix lifted the agent to 0.978, 0.891 and 0.884 against greedy, alpha-beta 4 and MCTS 100 at 400 simulations.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "numpy", color: "green-text-gradient" },
      { name: "reinforcement-learning", color: "pink-text-gradient" },
      { name: "alphazero", color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text" },
      { name: "mcts", color: "blue-text-gradient" },
      { name: "self-play", color: "green-text-gradient" },
    ],
    image: oAnQuan,
    coverLabel: "Ô Ăn Quan RL",
    source_code_link: "https://github.com/khanghbduong02/O-An-Quan-RL",
    web_url: "",
  },
  {
    name: "Infinite Minesweeper RL Agent",
    description:
    "Built an unbounded Minesweeper environment with deterministic chunked boards, an 11-channel local observation window and action masking. Trained a NumPy CNN Double-DQN with reveal and flag actions, then paired it with a memoized constraint solver that flags certain mines and restricts the policy to the lowest-risk moves. Across 500 matched boards the hybrid averaged 1,454 revealed cells and beat the rule-based and CSP baselines, while the standalone policies did not.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "numpy", color: "green-text-gradient" },
      { name: "reinforcement-learning", color: "pink-text-gradient" },
      { name: "dqn", color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text" },
      { name: "cnn", color: "blue-text-gradient" },
      { name: "constraint-solving", color: "green-text-gradient" },
    ],
    image: infiniteMinesweeper,
    coverLabel: "Infinite Minesweeper RL Agent",
    source_code_link: "https://github.com/khanghbduong02/Infinite-Minesweeper-RL-Agent",
    web_url: "",
  },
  {
    name: "Chocolate Vision — Chocolathon 2026",
    description:
    "Won 4th place on September 19, 2026. Integrated YOLOv8 image recognition and AssemblyAI live speech transcription into a cashier workflow for verifying chocolate-box orders. Built a React and Flask review flow that compares spoken and detected flavors, flags quantity mismatches, and lets cashiers correct orders before saving. Implemented order APIs and auditable records with transcripts, camera predictions, packing time, and original and annotated photos.",
    tags: [
      { name: "full-stack", color: "blue-text-gradient" },
      { name: "react", color: "blue-text-gradient" },
      { name: "flask", color: "green-text-gradient" },
      { name: "python", color: "green-text-gradient" },
      { name: "yolov8", color: "pink-text-gradient" },
      { name: "assemblyai", color: "pink-text-gradient" },
    ],
    image: chocolateVision,
    coverLabel: "Chocolate Vision",
    source_code_link: "",
    web_url: "https://chocolathon-chocolate-vision-sugar.vercel.app/",
  },
  {
    name: "Real-Time Failure Detection for 3D Printers",
    description:
    "Trained a 24M-parameter PyTorch CNN with a ResNet-style architecture and squeeze-and-excitation attention to classify five 3D-print failure modes. Built a real-time computer-vision pipeline with OpenCV, ONNX, and asynchronous Python, including temporal smoothing, Telegram alerts, and printer API auto-pause controls. Curated 5,000+ images with leak-free session splits and trained with class-weighted loss and automatic mixed precision.",
    tags: [
      { name: "pytorch", color: "blue-text-gradient" },
      { name: "computer-vision", color: "green-text-gradient" },
      { name: "onnx", color: "pink-text-gradient" },
      { name: "opencv", color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text" },
    ],
    image: printFailure,
    coverLabel: "3D Print Failure Detection",
    source_code_link: "https://github.com/khanghbduong02/KhangDuong-CS898BA-Project",
    web_url: "",
  },
  {
    name: "EzResume",
    description:
    "A privacy-first AI job-application workspace that generates tailored LaTeX resumes and cover letters with Gemini. React front end, Flask API, Firebase auth and an owner-only Firestore profile, drag-to-reorder sections and parallel document generation. A multi-agent reviewer, relevance pruner and visual inspector revise each draft before an ATS pass checks the rendered PDF, while real contact details are substituted locally and never sent to the model.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "flask", color: "green-text-gradient" },
      { name: "gemini", color: "pink-text-gradient" },
      { name: "firebase", color: "green-text-gradient" },
      { name: "latex", color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text" },
      { name: "ats", color: "blue-text-gradient" },
    ],
    image: ezresume,
    source_code_link: "https://github.com/khanghbduong02/EzResume",
    web_url: "https://ezresumeai.vercel.app",
  },
  {
    name: "Divoom Times Gate — Theme Studio",
    description:
      "Built a Windows app and React editor for the Divoom Times Gate, a five-panel 128×128 LCD. The FastAPI agent renders every panel with Pillow and streams CPU, GPU and network metrics over the LAN, skipping unchanged frames, re-pushing after reboots, and running from the tray with autostart. Includes drag-and-drop metric layers, gauges and line graphs, animated GIF backgrounds, presets, phone access, and a single-file PyInstaller build.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "react", color: "blue-text-gradient" },
      { name: "fastapi", color: "green-text-gradient" },
      { name: "pillow", color: "green-text-gradient" },
      { name: "windows", color: "pink-text-gradient" },
      { name: "websockets", color: "pink-text-gradient" },
    ],
    image: divoomPc,
    coverLabel: "Divoom Times Gate",
    source_code_link: "https://github.com/khanghbduong02/Divoom-PC",
    web_url: "https://site-5b02d7b84842479d9d6e7cd6dfc76009.freebuff.page",
  },
  {
    name: "Guardian Trail",
    description:
    "A cross-platform cooperative game centered on continuous player communication and coordination, with keyboard and controller support for Windows, Linux, and macOS.",
    tags: [
      { name: "multiplayer", color: "blue-text-gradient" },
      { name: "co-op", color: "green-text-gradient" },
      { name: "cross-platform", color: "pink-text-gradient" },
    ],
    image: guardianTrail,
    coverLabel: "Guardian Trail",
    source_code_link: "",
    web_url: "https://sugarkhang02.itch.io/guardian-trail",
  },
  {
    name: "Digital Banking & Channel Optimization",
    description:
      "Analyzed large-scale banking data to identify digital friction points and customer behavior patterns. Linked login failures and timeouts to increased support costs, then proposed improvements to authentication, session management, and the digital experience.",
    tags: [
      { name: "data-analysis", color: "blue-text-gradient" },
      { name: "hackathon", color: "green-text-gradient" },
      { name: "banking", color: "pink-text-gradient" },
    ],
    image: banking,
    source_code_link: "https://github.com/khanghbduong02/HackThePlains-2026",
    web_url: ""
  },
  {
    name: "Elsewhere",
    description:
      "A Godot 2D platformer about a wandering traveler in a mythical forest. After a strange force scatters the masks and identities of the spirits they meet, the traveler sets out to recover them.",
    tags: [
      {
        name: "godot",
        color: "blue-text-gradient",
      },
      {
        name: "platformer",
        color: "green-text-gradient",
      },
      {
        name: "2d-game",
        color: "pink-text-gradient",
      },
    ],
    image: elsewhere,
    source_code_link: "https://github.com/Rererayren/WinterGameJam",
    web_url: "https://sugarkhang02.itch.io/elsewhere"
  },
  {
    name: "Medical Image Segmentation: R2U-net & R2U-net++",
    description:
      "An implementation of R2U-net++ for medical image segmentation that adds nested and dense skip connections to R2U-net. Evaluated across multiple datasets, R2U-net++ outperformed R2U-net and other models in accuracy and robustness, showing potential to improve medical image analysis.",
    tags: [
      {
        name: "deep-learning",
        color: "blue-text-gradient",
      },
      {
        name: "medical-imaging",
        color: "green-text-gradient",
      },
      {
        name: "segmentation",
        color: "pink-text-gradient",
      },
      {
        name: "pytorch",
        color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text",
      },
    ],
    image: segmentation,
    source_code_link: "https://github.com/khanghbduong02/Medical_Image_Segmentation",
    web_url: ""
  },
  {
    name: "MadeYouMask!",
    description:
      "A playful Unity game where you work in the \"all natural\" face-mask department of a spa. Create custom masks for each customer's request, no matter how ridiculous, by mixing colors to please the customer, or not.",
    tags: [
      {
        name: "unity",
        color: "blue-text-gradient",
      },
      {
        name: "point-n-click",
        color: "green-text-gradient",
      },
      {
        name: "2d-game",
        color: "pink-text-gradient",
      },
    ],
    image: mask,
    source_code_link: "https://github.com/khanghbduong02/MadeYouMask",
    web_url: "https://sugarkhang02.itch.io/madeyoumask"
  },
  {
    name: "Face Recognition Systems Web Interface",
    description:
      "A full-stack web platform for user registration and check-in using real-time facial recognition. Built with Flask, React, and Tailwind CSS, it removes training images after processing to support more security-conscious handling of face data.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "flask", color: "green-text-gradient" },
      { name: "ai-ml", color: "pink-text-gradient" },
      { name: "mediapipe", color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text" },
    ],
    image: frs,
    source_code_link: "https://github.com/khanghbduong02/FRS-Prod",
    web_url: ""
  },
  {
    name: "Face Detection",
    description:
      "A real-time computer-vision application that uses a pre-trained Haar Cascade and webcam input to detect faces from live video.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "opencv", color: "green-text-gradient" },
      { name: "computer-vision", color: "pink-text-gradient" },
    ],
    image: faceDetection,
    coverLabel: "Real-Time Face Detection",
    source_code_link: "https://github.com/khanghbduong02/My-Projects/tree/main/FaceDetection",
    web_url: "",
  },
  {
    name: "Handwritten Digit Recognition",
    description:
      "A digit-recognition tool built with Python, scikit-learn, and Theano that compares four neural-network architectures. Includes a drawable canvas for real-time testing and is structured for future adaptation.",
    tags: [
      { name: "ai-ml", color: "blue-text-gradient" },
      { name: "neural-network", color: "green-text-gradient" },
      { name: "theano", color: "pink-text-gradient" },
      { name: "svm", color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text" },
    ],
    image: handwrittenDigit,
    source_code_link: "https://github.com/khanghbduong02/My-Projects/tree/main/DigitRecognition",
    web_url: "",
  },
  {
    name: "Basic Snake Game",
    description:
      "A classic Snake game built with JavaScript and HTML5 Canvas, featuring smooth controls, increasing speed, real-time scoring, and high-score tracking. It is hosted online for anyone to play.",
    tags: [
      { name: "html", color: "blue-text-gradient" },
      { name: "js", color: "green-text-gradient" },
      { name: "2d-game", color: "pink-text-gradient" },
    ],
    image: snakeGame,
    source_code_link: "https://github.com/khanghbduong02/My-Projects/tree/main/Games/jscode_snake",
    web_url: "https://khangduong.w3spaces.com",
  },
  {
    name: "File Converter to ASCII Art",
    description:
      "A Python tool that converts images and videos into ASCII art while preserving color and audio. It auto-detects file types, converts video frames bidirectionally, and maps pixels to ASCII characters using OpenCV and PIL.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "opencv", color: "green-text-gradient" },
      { name: "ascii-art", color: "pink-text-gradient" },
      { name: "file-conversion", color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text" },
    ],
    image: fileToAscii,
    source_code_link: "https://github.com/khanghbduong02/My-Projects/tree/main/FileToASCII",
    web_url: "",
  },
  {
    name: "Flappy Bird Game",
    description:
      "A Flappy Bird clone built with Pygame, featuring physics-based movement, randomized pipe generation, and high-score tracking. My first Python project, it taught me about game timing, object movement, and collision detection.",
    tags: [
      { name: "pygame", color: "blue-text-gradient" },
      { name: "platformer", color: "green-text-gradient" },
      { name: "2d-game", color: "pink-text-gradient" },
    ],
    image: flappyBird,
    source_code_link: "https://github.com/khanghbduong02/My-Projects/tree/main/Games/Flappy%20Bird",
    web_url: "",
  },
];

const testimonials = [
  {
    testimonial:
      "Khang has been a tremendous asset to our team and has helped us improving our Python script and analyzing performance data with his amazing tools. Khang's dedication, enthusiasm and commitment to doing great work shine through in everything he does. He always goes the extra mile to ensure our projects succeed and has shown himself to be a dependable, hardworking and team player. It's been a privilege to collaborate with him and I wholeheartedly recommend Khang for any future opportunities.",
    name: "Philip Quang",
    designation: "Performance Engineer",
    company: "NetApp, Inc.",
    image: philipq,
  },
];

export { services, technologies, technologyGroups, experiences, testimonials, projects };
