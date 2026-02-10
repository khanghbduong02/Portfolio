import {
  // Services
  web,
  software,
  datasci,
  ml,
  // Technologies
  python,
  cpp,
  java,
  html,
  css,
  javascript,
  reactjs,
  threejs,
  tailwind,
  django,
  flask,
  sklearn,
  sql,
  mongodb,
  mysql,
  git,
  docker,
  unity,
  godot,
  // Works
  netapp,
  d_academy,
  vgf,
  // Projects
  elsewhere,
  segmentation,
  mask,
  frs,
  digit,
  snake,
  ascii,
  flappybird,
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
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Software Developer",
    icon: software,
  },
  {
    title: "Data Scientist",
    icon: datasci,
  },
  {
    title: "Machine Learning Engineer",
    icon: ml,
  },
];

const technologies = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "C++",
    icon: cpp,
  },
  {
    name: "Java",
    icon: java,
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
    name: "Three JS",
    icon: threejs,
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
    name: "MongoDB",
    icon: mongodb,
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
    name: "Unity",
    icon: unity,
  },
  {
    name: "Godot",
    icon: godot,
  },
];

const experiences = [
  {
    title: "Software Engineer in Test - Performance Benchmarking",
    company_name: "NetApp, Inc.",
    icon: netapp,
    iconBg: "#383E65",
    date: "Oct 2022 - Now",
    points: [
      "Designed and conducted testbeds with YML for controller firmware (CFW) testing on configurations",
      "Analyzed and interpreted data from hardware components",
      "Developed and optimized automation processes with a Database Web Interface using Django to read, verify, analyze data, and automatically run tests on many different configurations using pre-setup testbeds",
      "Managed performance benchmarking for various configurations with different Storage Controllers and different Protocols using tools like IO Meter, VDbench on a Database Web Interface",
      "Utilized tools such as Confluence, Jira, and Bitbucket for task tracking and management",
      "The engineering content of these responsibilities includes practical application of systems engineering principles, data analysis, and process optimization",
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

const testimonials = [
  {
    testimonial:
      "Khang has been a tremendous asset to our team and has helped us improving our Python script and analyzing performance data with his amazing tools. Khang's dedication, enthusiasm and commitment to doing great work shine through in everything he does. He always goes the extra mile to ensure our projects succeed and has shown himself to be a dependable, hardworking and team player. It's been a privilege to collaborate with him and I wholeheartedly recommend Khang for any future opportunities.",
    name: "Philip Quang",
    designation: "Performance Engineer",
    company: "NetApp, Inc.",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHCTOFXge5Dow/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1683066757311?e=1772064000&v=beta&t=IGpnCqc4uIbZA9_ElWJ5SIuOS0nEDdhE3UtsRy6legs",
  },
  // {
  //   testimonial:
  //     "I've never met a web developer who truly cares about their clients' success like Rick does.",
  //   name: "Chris Brown",
  //   designation: "COO",
  //   company: "DEF Corp",
  //   image: "https://randomuser.me/api/portraits/men/5.jpg",
  // },
  // {
  //   testimonial:
  //     "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
  //   name: "Lisa Wang",
  //   designation: "CTO",
  //   company: "456 Enterprises",
  //   image: "https://randomuser.me/api/portraits/women/6.jpg",
  // },
];

const projects = [
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
    name: "Medical Image Segmentation Using R2U-net and R2U-net++ Across Multiple Medical Datasets",
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
    source_code_link: "https://github.com/Khang261002/Medical_Image_Segmentation",
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
    source_code_link: "https://github.com/Khang261002/MadeYouMask",
    web_url: "https://sugarkhang02.itch.io/madeyoumask"
  },
  {
    name: "Face Recognition Systems Web Interface",
    description:
      "A web platform for user registration and check-in via facial recognition. Built with React, Tailwind CSS, and AI/ML for real-time detection and authentication.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "ai-ml",
        color: "pink-text-gradient",
      },
      {
        name: "mediapipe",
        color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text",
      },
    ],
    image: frs,
    source_code_link: "https://github.com/user101623/FRS-Production",
    web_url: ""
  },
  {
    name: "Handwritten Digit Recognition",
    description:
      "A robust handwritten digit recognition tool using four neural networks, built with Python, scikit-learn, and Theano. Features a user-friendly interface for seamless input, testing, and future adaptability.",
    tags: [
      {
        name: "ai-ml",
        color: "blue-text-gradient",
      },
      {
        name: "neural-network",
        color: "green-text-gradient",
      },
      {
        name: "theano",
        color: "pink-text-gradient",
      },
      {
        name: "svm",
        color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text",
      },
    ],
    image: digit,
    source_code_link: "https://github.com/Khang261002/My-Projects/tree/main/DigitRecognition",
    web_url: "",
  },
  {
    name: "Basic Snake Game",
    description:
      "A classic Snake game built with JavaScript and HTML5 Canvas, featuring smooth controls, increasing speed, and self-collision detection. Includes a real-time score, highest score tracking, and a replay option for endless fun.",
    tags: [
      {
        name: "html",
        color: "blue-text-gradient",
      },
      {
        name: "js",
        color: "green-text-gradient",
      },
      {
        name: "2d-game",
        color: "pink-text-gradient",
      },
    ],
    image: snake,
    source_code_link: "https://github.com/Khang261002/My-Projects/tree/main/Games/jscode_snake",
    web_url: "https://khangduong.w3spaces.com/",
  },
  {
    name: "File Converter to ASCII Art",
    description: "A Python-based tool that converts images and videos into ASCII art while preserving color and audio for videos. Uses OpenCV and PIL for efficient processing.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "opencv",
        color: "green-text-gradient",
      },
      {
        name: "ascii-art",
        color: "pink-text-gradient",
      },
      {
        name: "file-conversion",
        color: "bg-gradient-to-r from-yellow-400 to-yellow-500 inline-block text-transparent bg-clip-text",
      },
    ],
    image: ascii,
    source_code_link: "https://github.com/Khang261002/My-Projects/tree/main/FileToASCII",
    web_url: "",
  },
  {
    name: "Flappy Bird Game",
    description: "A classic Flappy Bird clone built with Pygame, featuring smooth physics-based movement, randomized pipe generation, and a scoring system with high-score tracking. Provides an engaging gameplay experience with simple controls and dynamic difficulty.",
    tags: [
      {
        name: "pygame",
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
    image: flappybird,
    source_code_link: "https://github.com/Khang261002/My-Projects/tree/main/Games/Flappy%20Bird",
    web_url: "",
  },
];

export { services, technologies, experiences, testimonials, projects };
