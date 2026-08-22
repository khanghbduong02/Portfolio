# Portfolio Design System Plan

## Current Status

- [x] Create WebP copies for all raster assets while retaining original source files.
- [x] Prefer WebP for application imagery and retain SVG for vector icons.
- [x] Establish shared design tokens before changing individual components.

## Implementation Order

### 1. Define the Design System

- [x] Create semantic color tokens for page background, surfaces, primary text, muted text, borders, focus, and one intentional accent color.
- [x] Decide whether violet is a deliberate part of Khang's personal brand. If not, replace the current violet gradients and glows with the chosen accent treatment.
- [x] Define a spacing scale and use it for section padding, card padding, gaps, and paragraph margins.
- [x] Limit radii to three values: controls, cards, and fully round media.
- [x] Define a type scale with display, section title, card title, body, metadata, and label styles, including matching line heights and font weights.
- [x] Define standard motion durations and cubic-bezier curves, plus a reduced-motion policy.

### 2. Repair the Hero

- [x] Resolve the desktop collision between the summary copy and FaceID prompt.
- [x] Keep the FaceID/CNN interaction because it demonstrates machine-learning work directly.
- [x] Remove the sparkle from the prompt and reduce the decorative glow, ripple, and hover treatment.
- [x] Use the new type and spacing tokens for the hero title, summary, prompt, controls, and scroll indicator.

### 3. Standardize Shared Components

- [x] Replace 3D tilt cards with a consistent card pattern and a subtle focus or hover state.
- [x] Use one button treatment for project links, contact actions, and employer links.
- [x] Align icon sizes, icon-to-label gaps, borders, shadows, and hover behavior across those controls.
- [x] Apply the radius, type, spacing, and color tokens to service, project, testimonial, and contact components.

### 4. Make Motion Intentional

- [x] Replace generic spring defaults with explicit cubic-bezier transitions where appropriate.
- [x] Use short stagger intervals for related content and avoid long index-based delays on lower project cards.
- [x] Keep motion that supports hierarchy, interaction, or the portfolio's visual identity; the animated technology balls, Earth, and star field are intentional ambient motion.
- [x] Add consistent section-reveal effects and lazy-mount the interactive technology systems when the Technologies section becomes visible.
- [x] Respect `prefers-reduced-motion` for scrolling indicators, canvas effects, and entrance animations.

### 5. Improve Interaction Feedback

- [x] Disable the contact submit button while EmailJS is sending and expose a clear busy state.
- [x] Replace blocking alerts with inline success and error feedback that is announced to assistive technology.
- [x] Preserve the working project, GitHub, LinkedIn, email, employer, and CNN restart links.
- [x] Provide focusable, pause-on-hover/focus controls for the interactive technology systems.
- [x] Do not add skeleton screens for bundled static portfolio content; reserve them for future fetched data.

### 6. Refine Content and Accessibility

- Replace the generic hero phrase with a concrete statement of the work Khang does.
- Edit project and experience copy for grammar, sentence case, and scanability without inventing accomplishments.
- Keep the named testimonial only if it is approved and accurately attributed.
- Verify keyboard focus, touch targets, image alt text, color contrast, and responsive layouts at mobile and desktop widths.

### 7. Verify Before Release

- Test WebP loading and PNG/JPEG glTF fallbacks in supported browsers.
- Run production build, lint, and visual checks after each component group is migrated.
- Compare Lighthouse performance before and after the changes.