import {
  // Services
  analyst,
  software,
  datasci,
  ml,
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
  digit,
  snake,
  ascii,
  flappybird,
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
    icon: software,
  },
  {
    title: "Data Analyst",
    icon: analyst,
  },
  {
    title: "Data Scientist",
    icon: datasci,
  },
  {
    title: "AI/ML Engineer",
    icon: ml,
  },
];

const experiences = [
  {
    title: "Software Engineer Intern",
    company_name: "NetApp, Inc.",
    icon: netapp,
    iconBg: "#383E65",
    date: "Jun 2026 - Present",
    points: [
      "Engineered data pipelines that collect, clean, and validate hardware telemetry across hosts, controllers, RAID configurations, and drive protocols.",
      "Developed and enhanced a Django-based Database Web Interface and PyNT automation system with Django, SQL, and Pytest to validate data and run test suites across preconfigured testbeds.",
      "Built scikit-learn and CatBoost surrogate models to predict random and sequential read/write performance, reducing configuration-tuning cycles from weeks to hours.",
      "Collaborated through Jira, Confluence, and Bitbucket to track work and deliver process improvements.",
    ],
  },
  {
    title: "Web Developer & Webmaster",
    company_name: "Pho 316 Restaurant",
    icon: pho316,
    iconBg: "#10372A",
    date: "Feb 2026 - Present",
    website_url: "https://pho316.com",
    points: [
      "Architected and deployed a responsive, mobile-first React website that established the restaurant's digital presence.",
      "Implemented Google Analytics 4 with react-ga4 to monitor acquisition sources and real-time traffic.",
      "Configured GitHub-to-Cloudflare Pages CI/CD for automated builds and zero-downtime content deployments.",
      "Improved page performance by compressing food media, adopting modern image formats, and reducing bundle size for sub-second load times.",
      "Instrumented outbound delivery and directions links to measure high-value customer conversion paths.",
    ],
  },
  {
    title: "Software Engineer in Test - Performance Benchmarking",
    company_name: "NetApp, Inc.",
    icon: netapp,
    iconBg: "#383E65",
    date: "Sep 2023 - Jun 2026",
    points: [
      "Designed YAML-driven testbeds for controller firmware validation across storage configurations.",
      "Built and benchmarked storage configurations spanning controllers and protocols using IOMeter and VDbench, surfacing results through a Database Web Interface for customer support.",
      "Collaborated through Confluence, Jira, and Bitbucket to coordinate performance-testing work and process improvements.",
    ],
  },
  {
    title: "Science Private Tutor",
    company_name: "D-Academy, Vietnam",
    icon: d_academy,
    iconBg: "#383E56",
    date: "Sep 2020 - Jun 2021",
    points: [
      "Mathematics, Physics, and Chemistry to students preparing for graduation",
      "Deepened my own understanding of fundamentals of my personal education",
      "Used a combination of in-person, and remote learning",
      "Collaborated with educators, and students' parents to develop a tailored tutoring plan",
    ],
  },
  {
    title: "Aerobic Gymnastics Professional Athlete",
    company_name: "Vietnam Gymnastics Federation, Vietnam",
    icon: vgf,
    iconBg: "#383E56",
    date: "Jan 2006 - Feb 2017",
    points: [
      "Competed at national and international levels in Aerobic Gymnastics",
      "Achieved the first prize (gold medal) in a men's individual performance at the Asian Championship 2015",
      "Demonstrated exceptional discipline, dedication, and perseverance in training and competition",
      "Developed strong teamwork, time management, and goal-setting skills",
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

const projects = [
  {
    name: "EzResume",
    description:
      "An AI-powered web app that generates ATS-friendly resumes from user input. Built with React and Python, integrates Gemini API for content generation, and automates a LaTeX-to-PDF workflow for clean, professional output.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "python", color: "green-text-gradient" },
      { name: "gemini-api", color: "pink-text-gradient" },
      { name: "latex", color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text" },
    ],
    image: ezresume,
    source_code_link: "https://github.com/khanghbduong02/EzResume-HackTheWu-2026",
    web_url: ""
  },
  {
    name: "Digital Banking & Channel Optimization",
    description:
      "Analyzed large-scale banking data to identify digital friction points and customer behavior patterns. Linked login failures and timeouts to increased support costs, and proposed solutions for authentication, session management, and digital experience.",
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
      "A Godot 2D platformer game where You are a wandering traveler journeys through a mythical forest and meets spirits who have lost their masks and their identities. A strange force has scattered them. To help the spirits, you set out on a journey to locate all masks.",
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
      "The implementation of nested and dense skip connection to R2U-net, called R2U-net++, for medical image segmentation. Evaluated on multiple datasets, R2U-net++ outperformed R2U-net and other models in accuracy and robustness, demonstrating its potential for improving medical image analysis.",
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
      "A silly face mask making Unity game where You work in the \"all natural\" face mask making department at a spa. Create face masks per the customer's request-- no matter how ridiculous! Make different colored masks and please the customer (or not)!",
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
      "A full-stack web platform for user registration and check-in via real-time facial recognition. Uses Flask for the backend and React with TailwindCSS for the frontend, with security-conscious handling of face image data.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "flask", color: "green-text-gradient" },
      { name: "ai-ml", color: "pink-text-gradient" },
      { name: "mediapipe", color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text" },
    ],
    image: frs,
    source_code_link: "https://github.com/user101623/FRS-Production",
    web_url: ""
  },
  {
    name: "Handwritten Digit Recognition",
    description:
      "A digit recognition tool using four neural network architectures, built with Python, scikit-learn, and Theano. Includes a drawable canvas for real-time testing and is structured for easy adaptation in future projects.",
    tags: [
      { name: "ai-ml", color: "blue-text-gradient" },
      { name: "neural-network", color: "green-text-gradient" },
      { name: "theano", color: "pink-text-gradient" },
      { name: "svm", color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text" },
    ],
    image: digit,
    source_code_link: "https://github.com/khanghbduong02/My-Projects/tree/main/DigitRecognition",
    web_url: "",
  },
  {
    name: "Basic Snake Game",
    description:
      "A classic Snake game built with JavaScript and HTML5 Canvas, featuring smooth controls, increasing speed, real-time scoring, and high-score tracking. Hosted online for anyone to play.",
    tags: [
      { name: "html", color: "blue-text-gradient" },
      { name: "js", color: "green-text-gradient" },
      { name: "2d-game", color: "pink-text-gradient" },
    ],
    image: snake,
    source_code_link: "https://github.com/khanghbduong02/My-Projects/tree/main/Games/jscode_snake",
    web_url: "https://khangduong.w3spaces.com",
  },
  {
    name: "File Converter to ASCII Art",
    description:
      "A Python tool that converts images and videos into ASCII art while preserving color and audio. Auto-detects file types, converts video frames bidirectionally, and maps pixels to ASCII characters using OpenCV and PIL.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "opencv", color: "green-text-gradient" },
      { name: "ascii-art", color: "pink-text-gradient" },
      { name: "file-conversion", color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text" },
    ],
    image: ascii,
    source_code_link: "https://github.com/khanghbduong02/My-Projects/tree/main/FileToASCII",
    web_url: "",
  },
  {
    name: "Flappy Bird Game",
    description:
      "A Flappy Bird clone built with Pygame featuring physics-based movement, randomized pipe generation, and high-score tracking. My first Python project, used to learn game timing, object movement, and collision detection.",
    tags: [
      { name: "pygame", color: "blue-text-gradient" },
      { name: "platformer", color: "green-text-gradient" },
      { name: "2d-game", color: "pink-text-gradient" },
    ],
    image: flappybird,
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

export { services, technologies, experiences, testimonials, projects };
