const styles = {
  paddingX: "px-page",
  paddingY: "py-section",
  padding: "px-page py-section",

  heroHeadText:
    "font-display text-content text-display mt-stack-xs",
  heroSubText:
    "text-muted font-body text-body-lg",

  sectionHeadText:
    "text-content text-center font-display text-section",
  sectionSubText:
    "text-center text-eyebrow text-muted font-label uppercase tracking-normal",
};

const motion = {
  duration: {
    fast: 0.16,
    standard: 0.28,
    enter: 0.5,
    exit: 0.2,
  },
  easing: {
    standard: [0.2, 0, 0, 1],
    enter: [0.16, 1, 0.3, 1],
    exit: [0.7, 0, 0.84, 0],
  },
  stagger: 0.08,
};

export { motion, styles };
