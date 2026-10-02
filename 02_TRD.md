# Technical Requirements Document (TRD)
## Tapri & Co. — Design-Preserving Migration
**Status:** Proposed technical baseline  
**Principle:** Reproduce the supplied HTML/CSS/JS experience first; optimize or redesign only with explicit approval.

## 1. Current technical baseline
The supplied artifact is a single HTML document with:
- Inline CSS, CSS custom properties, responsive media queries, keyframe animations, and reduced-motion rules.
- Inline SVG illustrations and icon-like graphics.
- Inline JavaScript for menu rendering/filtering, cart state, custom chai pricing/visualization, loyalty punch card, review strip controls, hours highlighting, scroll header state, reveal observers, text scramble, count-up animations, and page entrance.
- Image sources using seeded `picsum.photos` URLs.
- No evident backend API, database, authentication, payment integration, or durable order persistence in the supplied code.

## 2. Proposed stack
**Recommended target:** Next.js App Router + React + TypeScript, retaining the existing CSS as the styling source of truth.
- Next.js: app structure, routing if later needed, deployment and metadata support.
- React: reusable section components and declarative interaction state.
- TypeScript: explicit types for menu entries, cart items, custom chai options, and UI state.
- Existing CSS: preserve exact class names and CSS variables during the first migration pass.
- Existing inline SVGs: retain as-is initially; convert to components only where that does not alter rendering.
- No styling framework migration during the parity phase. Do not rewrite the site into Tailwind or CSS Modules as part of the initial move.
- No backend is required to reproduce current prototype behavior.

If the project owner prefers the smallest migration surface, React + Vite is also viable. The implementation should select one framework before coding; do not mix Next.js and Vite assumptions.

## 3. Proposed architecture
Example Next.js structure:
```text
tapri-co/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── TopTicker.tsx
│   ├── SiteHeader.tsx
│   ├── Awning.tsx
│   ├── HeroSection.tsx
│   ├── StatsSection.tsx
│   ├── MenuSection.tsx
│   ├── MenuCard.tsx
│   ├── ChaiBuilder.tsx
│   ├── BrewSection.tsx
│   ├── GallerySection.tsx
│   ├── ReviewsSection.tsx
│   ├── FindUsSection.tsx
│   ├── LoyaltyPunchCard.tsx
│   ├── SiteFooter.tsx
│   ├── CartDrawer.tsx
│   ├── Toast.tsx
│   └── OrderSuccess.tsx
├── data/
│   └── menu.ts
├── lib/
│   ├── pricing.ts
│   ├── cart.ts
│   └── formatters.ts
├── types/
│   └── index.ts
└── public/
    └── assets/  (only if assets are copied locally)
```

## 4. Component and state boundaries
- `page.tsx`: compose sections in the exact existing order.
- `SiteHeader`: navigation anchors, scroll state, cart badge/open action.
- `MenuSection`: category selection, vegetarian-only filter, filtered menu display.
- `MenuCard`: presentational item card and add action.
- `ChaiBuilder`: controlled option state, SVG cup preview, receipt and total.
- `CartDrawer`: open/close behavior, items, quantity edits, remove, totals, checkout simulation.
- `LoyaltyPunchCard`: client-side stamps and unlock state.
- `ReviewsSection`: review strip scrolling controls.
- `FindUsSection`: hours/day highlight, location and contact details.
- Motion helpers: shared IntersectionObserver hook or component, counter animation, text scramble, and scroll header behavior.
- `data/menu.ts`: exact menu records and ordering.
- `lib/pricing.ts`: pure price calculations with tests; values must be transcribed from the source without rounding or reinterpretation.

## 5. Data types
```ts
type MenuCategory = "chai" | "snack" | "special";

type MenuItem = {
  id: string;
  cat: MenuCategory;
  veg: boolean;
  spice: number;
  tag?: string;
  name: string;
  hindiName: string;
  price: number;
  imageSeed: string;
  description: string;
};

type CartItem = {
  key: string;
  name: string;
  hindiName?: string;
  price: number;
  quantity: number;
  meta?: string;
  source: "menu" | "builder";
};

type ChaiConfiguration = {
  vessel: "cutting" | "kulhad" | "lagan";
  milk: "bhains" | "toned" | "badam" | "oat";
  kadak: 1 | 2 | 3 | 4 | 5;
  adrak: "nahi" | "normal" | "double";
  masala: "skip" | "house" | "double";
  meetha: "nosugar" | "kam" | "barabar" | "gud";
  toppings: string[];
};
```

## 6. Pricing and business logic
- Use a single source of truth for prices.
- Preserve the exact existing source values for menu items and builder options.
- Cart subtotal is the sum of each item's price multiplied by quantity.
- Custom chai total is the sum of vessel, milk, kadak surcharge, ginger, masala, sweetness, and selected toppings as represented in the source.
- Do not calculate or apply a kulhad deposit unless business rules are clarified and approved. Current visible copy and actual total behavior may not align.
- Format currency with Indian locale and INR, matching current presentation.

## 7. Client/server boundary
The current experience is interactive and should be treated as a client-side interface. In Next.js:
- Mark stateful/DOM-dependent components with `"use client"`.
- Avoid reading `window`, `document`, `matchMedia`, or `IntersectionObserver` during server render.
- Initialize browser-only behavior in `useEffect`, and clean up listeners/observers.
- Render stable default markup so server and client output match.
- Keep the page single-page and anchor-based in the first migration unless routes are explicitly required.

## 8. Animation and browser behavior
- Preserve existing CSS animations and transitions verbatim initially.
- Keep the reduced-motion media query and verify all key content remains visible.
- Rebuild IntersectionObserver behavior using effects and clean up observers.
- Rebuild count-up with `requestAnimationFrame`, cancel on unmount.
- Rebuild text scramble with a cancellable timer and restore exact final text.
- Scroll header listener must be passive and cleaned up.
- Use the same thresholds, durations, delays, and breakpoints as the source wherever they are defined.

## 9. Security, reliability, and accessibility
- Do not render untrusted HTML through `dangerouslySetInnerHTML`.
- Use stable React keys and safe data-driven rendering.
- Add focus management to the cart drawer if it can be done without altering the visual design; return focus to the trigger on close.
- Ensure keyboard controls, Escape close, status announcements, labels, and focus visibility.
- Escape any user-generated content if real customer notes are added later.
- Do not expose secrets or rely on browser-generated tokens for real order acceptance.
- A production order API must validate item IDs, options, prices, totals, availability, and order status on the server.

## 10. Testing and quality gates
- Build, lint, and TypeScript checks must pass.
- Unit tests: pricing, filter logic, cart add/increment/decrement/remove, custom chai configuration total, loyalty state.
- Component tests: menu filters, builder changes, drawer close paths, checkout simulation.
- Browser tests: desktop and mobile flows, keyboard interaction, reduced motion.
- Visual regression: reference screenshots at desktop 1440×900, tablet 768×1024, mobile 390×844 (or the project’s agreed viewports).
- Browser console and network inspection for missing assets and runtime errors.

## 11. Deployment assumptions
- Deployable to a standard Next.js host such as Vercel, or another Node-compatible platform.
- Environment variables are not needed for the current client-only prototype.
- Real ordering later requires a separate backend/API, persistent order storage, and an operational process; those are outside the current migration baseline.
