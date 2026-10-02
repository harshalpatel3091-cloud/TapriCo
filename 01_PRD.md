# Product Requirements Document (PRD)
## Tapri & Co. — Design-Preserving Web Experience
**Document status:** Draft for implementation  
**Source baseline:** Existing single-file HTML/CSS/JavaScript prototype supplied for review  
**Target direction:** Migrate to a maintainable component-based frontend without changing the existing visual design or user-facing behavior

## 1. Product summary
Tapri & Co. is a branded chai-stall website concept. The current page combines a narrative brand experience, menu browsing, a customizable chai builder, a client-side cart/order confirmation, a loyalty punch card, reviews, location/hours, and a visual gallery. The main product requirement is a technology migration—not a redesign.

## 2. Product goals
1. Preserve the current interface as closely as possible, including layout, spacing, colors, typography, copy, illustrations, animation timing, hover/focus states, and responsive behavior.
2. Preserve every currently represented interaction unless the product owner explicitly approves a change.
3. Improve maintainability by separating page sections, menu data, stateful interactions, and shared UI into components/modules.
4. Make the application testable and ready for later real backend integration.
5. Avoid introducing unnecessary dependencies or visual differences during migration.

## 3. Non-goals
- No visual redesign, rebranding, copy rewrite, new color palette, or new navigation model.
- No removal of existing sections or features.
- No assumption that the current checkout is a real order-processing system.
- No payment gateway, database, delivery integration, authentication, or admin panel unless separately approved.
- No conversion to a multi-page experience solely for architectural preference; the current anchor-based single-page flow is the baseline.

## 4. Users and primary scenarios
### Primary user
A local customer visiting the Tapri & Co. website to explore the stall, inspect menu items, customize a chai, and understand the location and hours.

### Core scenarios
- Discover the brand through the hero and visual story.
- Jump to menu and filter items by category or vegetarian-only status.
- Add menu items to a cart, update quantities, remove items, and view totals.
- Customize chai by vessel, milk, strength, ginger, masala, sweetness, and add-ons; view a live receipt/price and add the custom drink to the cart.
- View the current cart and see a simulated order-success state.
- Browse brewing principles, gallery, reviews, location, hours, and loyalty punch card.
- Navigate on mobile and use reduced-motion settings.

## 5. Information architecture / sections
1. Top ticker/marquee
2. Header/navigation and order/cart button
3. Decorative awning
4. Hero: brand headline, story copy, CTA buttons, steaming kulhad visual
5. Stats/counters
6. Menu: category tabs, vegetarian filter, product cards
7. Build-A-Chai: option groups, visual cup, live receipt, total, add-to-cart action
8. The Brew: four brewing principles
9. Diary/gallery: image cards
10. Reviews: horizontally navigable review strip
11. Find Us: loyalty punch card, hours, WhatsApp/phone actions, address/map visual
12. Footer with brand, internal anchors, social/other links
13. Cart drawer, overlay, toast notifications, order-success panel

## 6. Functional requirements
### FR-01 Navigation
- Header links scroll to the existing page anchors: Menu, Build-A-Chai, The Brew, Diary, Find Us.
- Brand mark returns to the page top.
- Header gains its scrolled visual state after the page scroll threshold currently represented in source.
- Mobile navigation behavior must remain visually and functionally consistent with the current source.

### FR-02 Menu catalogue
- Menu cards are generated from a central menu data collection.
- Each item includes ID, category, vegetarian flag, spice level, optional tag, English name, Hindi name, price, image seed/source, and description.
- Category tabs support All, Chai, Nashta/snacks, and Kulhad Specials.
- Vegetarian-only control filters to vegetarian items.
- Adding a menu item increments cart quantity for an existing same item, otherwise adds it.
- Preserve card order, text, prices, labels, and tags during migration.

### FR-03 Cart drawer
- Open from the header order button.
- Close from close button, overlay, and Escape key.
- Show empty-cart state when no items exist.
- Show line totals, quantity controls, remove actions, subtotal, and total.
- Cart badge reflects total quantity.
- Preserve toast feedback and add-button temporary feedback.
- The current implementation has no separate deposit calculation in the actual total logic; do not silently alter this during visual migration. Clarify the displayed kulhad-return policy separately before making it operational.

### FR-04 Build-A-Chai customizer
- Vessel choices: Cutting, Kulhad, Bada Lagan.
- Milk choices: Bhains Full-Cream, Toned, Badam Milk, Oat.
- Kadak strength slider: levels 1–5; level 5 adds the currently defined extra charge.
- Ginger choices: none, normal, double.
- Masala choices: skip, house blend, double.
- Sweetness choices: no sugar, less, regular, extra gud.
- Optional top-ups: malai, dry fruits, honey, extra kulhad.
- Update cup-liquid SVG visualization, color, receipt rows, strength label, and total when inputs change.
- Add the configured chai to cart with a human-readable configuration summary.
- Preserve current default selections and pricing values exactly unless separately approved.

### FR-05 Order confirmation
- The current prototype generates a random-looking token in the browser, clears the cart, and displays an estimated preparation message.
- In a migration-only scope, preserve this simulation and clearly treat it as a demo behavior.
- Do not represent it as a submitted or accepted real order until a backend/order API exists.

### FR-06 Brand story, gallery, reviews, location
- Preserve the four brewing-principle cards and all current narrative copy.
- Preserve gallery card layout and current image treatment.
- Review previous/next controls scroll the review strip.
- Display the current day highlight in the hours table.
- Preserve the loyalty punch-card interaction, including the unlocked free-chai state.
- Preserve the contact, location, hours, and footer content and links as they currently appear, but identify placeholders and non-functional links for later content-owner approval.

### FR-07 Motion and accessibility
- Preserve entrance/reveal effects, marquee, steam, number counters, text scramble, card transitions, toast, cart badge feedback, and smooth scrolling.
- Respect `prefers-reduced-motion`; motion-sensitive users must not depend on animation to access content.
- Keep semantic headings, button labels, image alt text, keyboard close behavior, visible focus styles, and status messaging.
- Improve accessibility only when the change does not alter the visual design; any visible differences should be reviewed.

## 7. Non-functional requirements
- Visual parity is the primary acceptance criterion.
- Support current evergreen desktop and mobile browsers.
- Responsive layout must preserve existing breakpoints and component stacking behavior.
- Keep assets lazy-loaded where currently appropriate.
- Avoid unnecessary layout shifts and console errors.
- Use typed, maintainable code if TypeScript is selected.
- No secrets or API keys in client code.
- Cart and order state persistence are not guaranteed by the current prototype; persistence must not be added without approval.

## 8. Success criteria
- All existing sections and interactions are accounted for in a feature inventory.
- Screenshot comparisons show no material visual differences at agreed viewport sizes.
- All manual regression tests pass.
- No TypeScript, lint, build, or browser-console errors.
- Reduced-motion mode remains usable.
- No existing behavior is removed without explicit approval.

## 9. Known prototype limitations requiring owner confirmation
- Checkout is client-side only; token is randomly generated, cart is cleared, and no order is transmitted.
- Image URLs use seeded `picsum.photos` placeholders.
- Several footer/social/contact links are intentionally disabled or point to placeholders.
- The location map image is a placeholder rather than a verified map embed.
- Menu, hours, phone, address, review counts, ratings, loyalty policy, delivery radius, and historical claims should be verified before production.
- The loyalty punch card can be stamped directly by a visitor in the browser; it is not persistent or fraud-resistant.
- Displayed kulhad deposit/return copy and total calculations need business confirmation before real commerce.
