import { motion } from '../styles'

export const textVariant = (delay = 0) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: motion.duration.enter,
        delay,
        ease: motion.easing.enter,
      },
    },
  };
};

export const fadeIn = (direction, delay = 0, duration = motion.duration.enter) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        delay,
        duration,
        ease: motion.easing.enter,
      },
    },
  };
};

export const zoomIn = (delay = 0, duration = motion.duration.enter) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay,
        duration,
        ease: motion.easing.enter,
      },
    },
  };
};

export const slideIn = (direction, delay = 0, duration = motion.duration.enter) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: "tween",
        delay,
        duration,
        ease: motion.easing.enter,
      },
    },
  };
};

export const staggerContainer = (staggerChildren = 0, delayChildren = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};
