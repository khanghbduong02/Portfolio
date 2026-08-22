/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-raised": "rgb(var(--color-surface-raised) / <alpha-value>)",
        content: "rgb(var(--color-content) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-strong": "rgb(var(--color-accent-strong) / <alpha-value>)",
        focus: "rgb(var(--color-focus) / <alpha-value>)",
        primary: "rgb(var(--color-canvas) / <alpha-value>)",
        secondary: "rgb(var(--color-muted) / <alpha-value>)",
        tertiary: "rgb(var(--color-surface) / <alpha-value>)",
        "black-100": "rgb(var(--color-surface-raised) / <alpha-value>)",
        "black-200": "rgb(var(--color-canvas) / <alpha-value>)",
        "white-100": "rgb(var(--color-content) / <alpha-value>)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
      screens: {
        xs: "450px",
      },
      spacing: {
        page: "var(--space-page)",
        section: "var(--space-section)",
        "stack-xs": "var(--space-2)",
        "stack-sm": "var(--space-3)",
        "stack-md": "var(--space-5)",
        "stack-lg": "var(--space-8)",
      },
      borderRadius: {
        control: "var(--radius-control)",
        card: "var(--radius-card)",
        round: "var(--radius-round)",
      },
      fontSize: {
        display: ["clamp(2.5rem, 6vw, 4.75rem)", { lineHeight: "1.05" }],
        section: ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.1" }],
        "card-title": ["1.5rem", { lineHeight: "1.25" }],
        "body-lg": ["clamp(1rem, 1.5vw, 1.25rem)", { lineHeight: "1.65" }],
        body: ["1rem", { lineHeight: "1.6" }],
        meta: ["0.875rem", { lineHeight: "1.5" }],
        eyebrow: ["0.875rem", { lineHeight: "1.4" }],
      },
      fontWeight: {
        display: "700",
        heading: "700",
        label: "600",
        body: "400",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        standard: "var(--duration-standard)",
        enter: "var(--duration-enter)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
        enter: "var(--ease-enter)",
        exit: "var(--ease-exit)",
      },
    },
  },
  plugins: [],
};
