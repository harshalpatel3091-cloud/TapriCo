# UI/UX Design Brief
## Tapri & Co. — Preserve the Supplied Design

## 1. Design mandate
This is a visual-preservation project. The existing HTML page is the source of truth. The target implementation must reproduce the current site rather than reinterpret it. No redesign, visual simplification, new component styling, or copy changes without explicit approval.

## 2. Brand personality
- Local, warm, nostalgic, playful, street-side chai-stall identity.
- Bilingual Hinglish/Hindi flavor and conversational microcopy.
- Editorial, handmade feel rather than a generic SaaS or restaurant template.
- Strong use of typography, textured color blocks, illustrative SVGs, marquess, and motion.

## 3. Visual tokens currently present
CSS variables in the source include:
- Ink/dark browns: `--ink`, `--ink-2`, `--ink-soft`
- Paper/chalk backgrounds: `--paper`, `--paper-2`, `--chalk`
- Clay/rust accents: `--clay`, `--clay-d`, `--clay-x`
- Amber highlights: `--amber`, `--amber-d`
- Green tones: `--green`, `--green-d`
- Red accent: `--red`
- Shadow token: `--shadow`
- Display font: Fraunces with Georgia fallback
- Hindi font: Yatra One with Fraunces fallback
- Body font: Epilogue with system fallback

Preserve the actual values and font import/loading configuration from the source CSS. Do not substitute fonts during the migration without approval.

## 4. Layout and composition
- Top: animated ticker, followed by navigation/header.
- Decorative awning creates a distinctive transition into the hero.
- Hero is a two-column composition on wider screens: headline/copy/actions and illustrated steaming kulhad.
- Stats sit immediately after the hero.
- Menu cards use image, tag, veg/non-veg indicator, bilingual naming, description, spice indicator, price, and add action.
- Builder combines option groups and a visual cup/receipt panel; the cup panel becomes non-sticky/stacked at narrower widths as in the source.
- Brewing principles use numbered editorial cards.
- Gallery uses framed/photo-diary treatment.
- Reviews are a horizontally scrollable strip.
- Find Us combines loyalty card, hours/contact, and location/map card.
- Footer includes marquee, brand copy, internal links, and social/secondary links.
- Cart appears as a side drawer with overlay and success state.

## 5. Color, type, and content hierarchy
- Maintain existing warm paper backgrounds, dark brown text, clay buttons, amber accents, green accents, and outlined/soft-shadow elements.
- Preserve heading sizes, line breaks, italic emphasis, Hindi lettering, uppercase/eyebrow styling, labels, and decorative details.
- Preserve section order and copy, including punctuation and multilingual phrasing.
- Do not replace placeholder content during the visual migration; record it for content-owner review instead.

## 6. Motion specification
Keep the existing behaviors and source timings:
- Repeating ticker/marquee.
- Steam wisps and floating cup treatment.
- Hero entrance and split/line heading reveals.
- Scroll-triggered section reveals with stagger delays.
- Text scramble effect on the designated eyebrow.
- Count-up statistics.
- Cart badge bump and toast transitions.
- Price pop animation in builder.
- Smooth scrolling for anchors/review controls where enabled.
- Header shadow/state change on scroll.
- Reduced-motion media query that suppresses or minimizes animation.

Animations must not block access to content. Reduced-motion support is a requirement, not an optional enhancement.

## 7. Responsive behavior
The current CSS contains breakpoints around 1000, 960, 920, 860, 760, 640 pixels. Preserve the source media queries and breakpoint-specific layout changes:
- Hide desktop navigation links at the current mobile breakpoint.
- Stack the hero and move the cup visual above text when the source specifies.
- Stack builder panels and remove sticky positioning on narrower layouts.
- Stack brew cards and allow Hindi labels to wrap.
- Change menu/section grids and footer columns according to source rules.
- Ensure no horizontal overflow in the cart, review strip, builder, or menu cards.

## 8. Accessibility requirements
- Preserve semantic HTML and heading order.
- Ensure menu tabs and filters have accessible names and active states.
- Maintain descriptive button labels and image alt text.
- Support keyboard interaction, including Escape to close the cart.
- Ensure drawer semantics (`dialog`, `aria-modal`) remain.
- Keep live feedback announced through the existing status/toast region.
- Ensure controls are reachable by keyboard and have a visible focus state.
- Test at 200% zoom and with reduced motion.
- Avoid relying on color alone for category, vegetarian, success, or selected states.

## 9. Visual QA protocol
- Capture baseline screenshots before migration.
- Compare at the same browser, viewport, zoom, and font-loading conditions.
- Required initial viewports: desktop 1440×900, tablet 768×1024, mobile 390×844; include a narrow 360px check if feasible.
- Compare all sections, not only the hero.
- Validate hover, focus, active, scrolled header, drawer open, empty cart, populated cart, builder options, toast, loyalty-complete, and reduced-motion states.
- Accept only intentional technical differences that have been reviewed; default expectation is pixel-level visual parity.

## 10. Content integrity notes
The source contains placeholder or potentially illustrative business information (including seeded placeholder images, contact/location details, ratings/review counts, opening hours, historical claims, delivery radius, and non-functional footer links). Preserve these during migration, but do not represent them as verified facts in production until the owner confirms them.
