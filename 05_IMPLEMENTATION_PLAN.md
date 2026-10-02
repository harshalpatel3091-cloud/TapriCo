# Implementation Plan
## Tapri & Co. — Controlled Migration with Visual Parity

## Guiding rule
**Freeze the design first. Migrate technology second.** Do not combine migration with redesign, copy editing, asset replacement, pricing changes, or new commerce features.

## Phase 0 — Baseline and scope lock
### Tasks
1. Preserve the supplied HTML file as a read-only baseline.
2. Record the current page sections, CSS variables, breakpoints, interactions, text, image URLs, prices, and animation timings.
3. Run the original page in a browser and capture full-page and state-specific screenshots.
4. Inventory all links and mark each as working, anchor-only, placeholder, or disabled.
5. Confirm whether Next.js + React + TypeScript is the approved target; this plan assumes that choice.
### Deliverables
- Baseline source archive
- Screenshot set
- Feature inventory
- List of placeholder/owner-confirmation items
### Exit criteria
No implementation starts until baseline artifacts and feature inventory exist.

## Phase 1 — Project setup
### Tasks
1. Create a clean Next.js App Router project with TypeScript.
2. Configure fonts and global styles to match the original page.
3. Copy the original CSS with minimal changes into `app/globals.css`.
4. Preserve CSS variables, selectors, breakpoints, keyframes, and reduced-motion rules.
5. Add the page shell and verify the baseline fonts, body background, and width constraints.
### Exit criteria
A blank or static shell renders without unexpected style changes or console errors.

## Phase 2 — Static section extraction
### Tasks
Extract sections in source order into components without changing their HTML structure unnecessarily:
1. TopTicker
2. SiteHeader
3. Awning
4. HeroSection
5. StatsSection
6. MenuSection shell
7. ChaiBuilder shell
8. BrewSection
9. GallerySection
10. ReviewsSection
11. FindUsSection
12. SiteFooter
13. CartDrawer / overlay / toast / order success
Keep exact copy, inline SVGs, class names, IDs where useful, and decorative markup. Convert `class` to `className` and other JSX syntax carefully.
### Exit criteria
Static rendering visually matches the baseline before interactive behavior is migrated.

## Phase 3 — Menu data and filtering
### Tasks
1. Move the exact `MENU` collection into `data/menu.ts`.
2. Define TypeScript types.
3. Render menu cards with stable keys.
4. Implement category filter and vegetarian-only filter using React state.
5. Preserve default category, card order, tags, labels, image source pattern, and prices.
6. Verify combined category + vegetarian filtering.
### Exit criteria
All menu combinations match the original behavior and screenshots.

## Phase 4 — Cart state and drawer
### Tasks
1. Implement cart state in a dedicated hook or state owner.
2. Preserve menu-item aggregation behavior and custom-builder line-item behavior.
3. Implement quantity increment/decrement, remove, subtotal, total, badge, empty state, and toast.
4. Implement open/close via trigger, close button, overlay, and Escape.
5. Preserve the demo checkout flow, token format, success copy, and cart reset for parity only.
6. Ensure drawer focus and event listeners are cleaned up.
### Exit criteria
Every cart action passes manual and automated regression tests.

## Phase 5 — Build-A-Chai
### Tasks
1. Model the exact current option groups and default selections.
2. Extract pricing into a pure, unit-testable function.
3. Implement controlled inputs.
4. Preserve SVG cup fill height/color calculations and receipt display.
5. Preserve strength label and price pop animation.
6. Add configured chai to cart and open drawer.
7. Test every option individually and combinations of paid add-ons.
### Exit criteria
Builder total and receipt agree with source behavior for representative and edge-case combinations.

## Phase 6 — Motion and scroll behavior
### Tasks
1. Rebuild reveal observers with cleanup.
2. Rebuild count-up animations with cancellation on unmount.
3. Rebuild text scramble with cleanup and reduced-motion handling.
4. Rebuild header scrolled state with a passive scroll listener.
5. Preserve marquee, steam, hover, drawer, toast, and button effects through existing CSS.
6. Confirm reduced-motion mode does not hide or delay content.
### Exit criteria
Motion behavior is visually consistent and no leaked observers/listeners/timers remain.

## Phase 7 — Loyalty, reviews, hours, and content details
### Tasks
1. Implement the client-only punch card with the same toggle/unlock behavior.
2. Implement review strip previous/next controls.
3. Highlight current weekday in the hours table.
4. Preserve anchor navigation and footer behavior.
5. Verify all links and identify disabled/placeholders without silently changing them.
### Exit criteria
All non-commerce interactions match the baseline.

## Phase 8 — Visual and functional regression
### Tasks
1. Compare screenshots at agreed desktop/tablet/mobile viewports.
2. Test all hover/focus/active states and cart/builder states.
3. Test keyboard-only navigation and Escape close.
4. Test reduced-motion mode.
5. Test images loading, no horizontal overflow, and browser console.
6. Run typecheck, lint, production build, unit tests, and browser tests.
### Exit criteria
No known functional regressions, no critical visual differences, no build/runtime errors.

## Phase 9 — Deployment readiness
### Tasks
1. Confirm production build output and environment configuration.
2. Deploy to preview.
3. Run the full smoke suite against the preview URL.
4. Compare preview screenshots against baseline.
5. Obtain owner sign-off before production.
### Exit criteria
Preview is approved and all required checks pass.

## Phase 10 — Future production-commerce work (separate scope)
Do not include in the design-preserving migration unless separately approved:
- Real order API and persistent database records
- Server-side price/availability validation
- Real unique order IDs and status lifecycle
- Payment provider integration, if required
- Customer contact/delivery details and consent
- Order confirmation via WhatsApp/SMS/email
- Real loyalty persistence and abuse prevention
- Verified map embed, contact details, and operational business content
- Admin order management and operational notifications

## Suggested test matrix
| Area | Test cases |
|---|---|
| Navigation | Each anchor, brand-to-top, scrolled header |
| Menu | All/category filters, veg-only, combined filters, add item |
| Cart | Empty, add, duplicate add, quantity +/- , remove, close via all paths, Escape, checkout |
| Builder | Each option, paid options, level 5 surcharge, multiple toppings, add custom chai |
| Loyalty | Toggle stamps, all stamped, unstamp after completion |
| Reviews | Previous/next, narrow viewport |
| Hours | Current day highlight |
| Motion | Reveal, count-up, scramble, reduced motion |
| Responsive | 1440px, 768px, 390px, 360px |
| Quality | Console, missing assets, build, lint, typecheck |

## Definition of done
- The supplied experience is preserved.
- All visible sections and interactions are implemented.
- No unapproved visual or content changes exist.
- No broken navigation or missing interaction.
- No critical console/build errors.
- Visual QA and owner acceptance are complete.
- Prototype limitations are clearly documented rather than disguised as production functionality.
