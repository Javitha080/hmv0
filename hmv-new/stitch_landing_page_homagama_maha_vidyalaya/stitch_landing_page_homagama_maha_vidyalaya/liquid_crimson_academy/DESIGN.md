# Design System Document: Academic Editorial & Liquid Glass

## 1. Overview & Creative North Star
**Creative North Star: The Scholarly Prism**
This design system moves beyond the rigid, boxy layouts of traditional educational portals to embrace an "Editorial Prism" aesthetic. It captures the prestige of a historic institution through high-contrast serif typography and breathes modern life into the experience through "Liquid Glass" layering. 

We break the "template" look by utilizing intentional asymmetry—placing content off-center to create dynamic movement—and overlapping glass containers that blur the lines between the background imagery and the functional UI. The goal is a digital experience that feels as authoritative as a leather-bound book but as fluid as a modern gallery.

## 2. Colors
Our palette is rooted in a deep, scholarly Red and a vibrant, intellectual Yellow. These colors must be used to guide the eye, not just decorate the page.

*   **Primary (`#610000`)**: A deep, rich red used for the most critical brand moments and primary actions.
*   **Secondary (`#705d00`)**: A vibrant yellow used sparingly as an accent to highlight achievements or specific calls to attention.
*   **Surface Hierarchy**: We utilize the `surface-container` tiers to create depth without visual clutter.
    *   **The "No-Line" Rule**: Prohibit the use of 1px solid borders for sectioning. Boundaries must be defined solely through background shifts (e.g., a `surface-container-low` section sitting on a `surface` background).
    *   **Surface Nesting**: Treat the UI as physical layers. Use `surface-container-lowest` for the base and `surface-container-highest` for top-level floating cards.
*   **The "Glass & Gradient" Rule**: For hero sections and floating navigation, use a semi-transparent `surface` color with a `backdrop-blur` (20px-40px). 
*   **Signature Textures**: Use a subtle linear gradient from `primary` (`#610000`) to `primary_container` (`#8b0000`) for primary buttons and hero banners to add "soul" and dimension.

## 3. Typography
Typography is the voice of the institution. We pair a timeless Serif with a high-utility Sans-Serif to balance tradition and modernity.

*   **Display & Headlines (Noto Serif)**: These levels carry the "Academic" weight. Large tracking and deliberate line heights (1.2) should be used to give headers a "Life at Reid Avenue" editorial feel.
*   **Body & Titles (Manrope)**: This clean sans-serif ensures readability across dense academic information.
*   **Hierarchy as Identity**: Use `display-lg` (3.5rem) sparingly for high-impact landing messages. Overlap these large text elements with glass containers to create a sense of three-dimensional depth.

## 4. Elevation & Depth
Depth in this system is achieved through "Tonal Layering" rather than harsh structural lines or heavy shadows.

*   **The Layering Principle**: Stack containers based on importance. An "Event" card (`surface-container-lowest`) should sit on a "News" section (`surface-container-low`) to create a natural, soft lift.
*   **Ambient Shadows**: When a component must "float" (like a Modal or FAB), use a wide-diffusion shadow (Blur: 32px) at 6% opacity, tinted with the `on-surface` color. Avoid pure black shadows.
*   **The "Ghost Border" Fallback**: If a boundary is required for accessibility, use the `outline-variant` token at 15% opacity. Never use 100% opaque borders.
*   **Liquid Glass**: Use backdrop blurs on containers that sit over photography. This creates a "frosted glass" effect, allowing the colors of the school campus to bleed through the UI, making the layout feel integrated and prestigious.

## 5. Components

### Buttons
*   **Primary**: Gradient of `primary` to `primary_container`. Text in `on_primary`. Roundedness: `md` (0.375rem).
*   **Secondary**: Solid `secondary_container` with `on_secondary_container` text.
*   **Glass Variant**: A semi-transparent `surface` button with heavy backdrop blur, used over dark photographic backgrounds.

### Cards & Lists
*   **Constraint**: Forbid divider lines. Use `spacing-6` (2rem) of vertical white space or a subtle shift to `surface-container-low` to separate items.
*   **Editorial Cards**: Images should have a subtle inner glow or a glass overlay at the bottom for captions.

### Input Fields
*   **Styling**: Use `surface-container-high` for the field background with a "Ghost Border" that becomes `primary` on focus.
*   **Labels**: Use `label-md` in `on_surface_variant` for high readability and a clean, modern look.

### Additional Components: The "Academy Badge"
*   A custom floating glass element used to display the school crest or important alerts. It should always utilize `surface-container-highest` with a 40px backdrop blur and `shadow-xl`.

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins (e.g., 10% left, 20% right) to create a sophisticated editorial feel.
*   **Do** use `Noto Serif` for all numerical data in stats sections to emphasize prestige.
*   **Do** ensure that text over glass containers meets WCAG 2.1 high-contrast requirements by using `on_surface` or `on_primary` tokens.

### Don't
*   **Don't** use a 1px solid border to separate the Header from the Body. Use a subtle `surface` to `surface-container-low` transition instead.
*   **Don't** use standard "Drop Shadows." Only use the Ambient Shadow specification defined in Section 4.
*   **Don't** crowd the interface. If an element feels tight, increase spacing using the `spacing-8` or `spacing-10` tokens. White space is a luxury; use it.