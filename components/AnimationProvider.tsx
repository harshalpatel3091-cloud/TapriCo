"use client";

import { useEffect } from "react";

type CartItem = { name: string; hn: string; price: number; qty: number; meta?: string };
type Cart = Map<string, CartItem>;

export default function AnimationProvider() {
  useEffect(() => {
    const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

    // ── hero entrance ──────────────────────────────────────────────
    const heroTimer = setTimeout(() => document.body.classList.add("is-loaded"), 80);

    // ── header shadow ──────────────────────────────────────────────
    const handleScroll = () => {
      document.getElementById("header")?.classList.toggle("scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ── scramble ───────────────────────────────────────────────────
    const CHARS = "-^-'#%&,1*+<>";
    function scramble(el: HTMLElement) {
      if (RM) return;
      const final = el.textContent || "";
      let f = 0;
      const total = Math.max(14, final.length);
      const iv = setInterval(() => {
        f++;
        el.textContent = final
          .split("")
          .map((c, i) => (i < (f / total) * final.length ? c : c === " " ? " " : CHARS[(Math.random() * CHARS.length) | 0]))
          .join("");
        if (f >= total) { el.textContent = final; clearInterval(iv); }
      }, 34);
    }

    // ── reveals & count-up ─────────────────────────────────────────
    const io = new IntersectionObserver((es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          if (e.target.hasAttribute("data-scramble")) scramble(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }), { threshold: 0.18 });

    const cio = new IntersectionObserver((es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = parseFloat(el.dataset.count || "0");
        const dec = +(el.dataset.dec || 0);
        const suf = el.dataset.suffix || "";
        cio.unobserve(el);
        if (RM) { el.textContent = (dec ? target.toFixed(dec) : Math.round(target)) + suf; return; }
        const t0 = performance.now(), dur = 1400;
        (function tick(now: number) {
          const p = Math.min(1, (now - t0) / dur), ease = 1 - Math.pow(1 - p, 3), v = target * ease;
          el.textContent = (dec ? v.toFixed(dec) : Math.round(v)) + suf;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      }), { threshold: 0.5 });

    const renderTimer = setTimeout(() => {
      document.querySelectorAll("[data-reveal], .lines, [data-scramble]").forEach((el) => io.observe(el));
      document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));
    }, 100);

    // ── cart state ─────────────────────────────────────────────────
    const cart: Cart = new Map();

    function cartQty() { let n = 0; cart.forEach((i) => (n += i.qty)); return n; }

    function updateBadge() {
      const b = document.getElementById("cartCount");
      if (!b) return;
      b.textContent = String(cartQty());
      b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
    }

    function renderCart() {
      const box = document.getElementById("drawerItems");
      if (!box) return;
      if (!cart.size) {
        box.innerHTML = `<div class="cart-empty"><div class="big">अरे, खाली?</div><p>Kulhad khali hai, dil bhi. Menu se kuch uthao — bharti garam hai.</p></div>`;
      } else {
        box.innerHTML = [...cart.entries()].map(([k, it]) => `
          <div class="c-item">
            <h4>${it.name}</h4>
            <div class="line-tot">${inr.format(it.price * it.qty)}</div>
            ${it.meta ? `<div class="meta">${it.meta}</div>` : ""}
            <div class="qty">
              <button data-q="-1" data-k="${k}" aria-label="less">−</button>
              <span>${it.qty}</span>
              <button data-q="1" data-k="${k}" aria-label="more">+</button>
            </div>
            <button class="rm" data-rm="${k}">hatao</button>
          </div>`).join("");
      }
      let sub = 0; cart.forEach((i) => (sub += i.price * i.qty));
      const subEl = document.getElementById("subAmt");
      const grandEl = document.getElementById("grandAmt");
      const foot = document.getElementById("drawerFoot");
      if (subEl) subEl.textContent = inr.format(sub);
      if (grandEl) grandEl.textContent = inr.format(sub);
      if (foot) foot.style.display = cart.size ? "block" : "none";
    }

    // listen for cart updates from MenuSection / ChaiBuilder
    function onCartUpdate(e: Event) {
      const incoming: Cart = (e as CustomEvent).detail;
      cart.clear();
      incoming.forEach((v, k) => cart.set(k, { ...v }));
      updateBadge();
      renderCart();
    }
    window.addEventListener("cartUpdate", onCartUpdate);

    // listen for builder add from ChaiBuilder
    function onBuilderAdd(e: Event) {
      const { key, entry } = (e as CustomEvent).detail;
      if (cart.has(key)) cart.get(key)!.qty += entry.qty || 1;
      else cart.set(key, entry);
      updateBadge();
      renderCart();
    }
    window.addEventListener("builderAdd", onBuilderAdd);

    // drawer items click (qty +/-)
    document.getElementById("drawerItems")?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const qBtn = target.closest<HTMLElement>("[data-q]");
      const rmBtn = target.closest<HTMLElement>("[data-rm]");
      if (qBtn) {
        const k = qBtn.dataset.k!;
        const it = cart.get(k);
        if (it) { it.qty += +qBtn.dataset.q!; if (it.qty <= 0) cart.delete(k); }
        updateBadge(); renderCart();
      }
      if (rmBtn) { cart.delete(rmBtn.dataset.rm!); updateBadge(); renderCart(); }
    });

    // ── drawer open/close ──────────────────────────────────────────
    const openDrawer = () => {
      document.body.classList.add("drawer-open");
      document.getElementById("orderSuccess")?.classList.remove("show");
    };
    const closeDrawer = () => document.body.classList.remove("drawer-open");

    document.getElementById("cartBtn")?.addEventListener("click", openDrawer);
    document.getElementById("closeDrawer")?.addEventListener("click", closeDrawer);
    document.getElementById("overlay")?.addEventListener("click", closeDrawer);
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

    // ── checkout ───────────────────────────────────────────────────
    document.getElementById("checkout")?.addEventListener("click", () => {
      if (!cart.size) return;
      const tok = "T-" + Math.floor(400 + Math.random() * 500);
      const tokEl = document.getElementById("tokenNo");
      const msgEl = document.getElementById("successMsg");
      const foot = document.getElementById("drawerFoot");
      const successEl = document.getElementById("orderSuccess");
      if (tokEl) tokEl.textContent = tok;
      const n = cartQty();
      if (msgEl) msgEl.textContent = `${n} item${n > 1 ? "s" : ""} bhatti pe. Ready in ~8 min — kulhad garam ho rahe hain.`;
      cart.clear(); updateBadge(); renderCart();
      const box = document.getElementById("drawerItems");
      if (box) box.innerHTML = "";
      if (foot) foot.style.display = "none";
      successEl?.classList.add("show");
    });

    document.getElementById("newOrder")?.addEventListener("click", () => {
      document.getElementById("orderSuccess")?.classList.remove("show");
      closeDrawer();
      document.getElementById("menu")?.scrollIntoView({ behavior: RM ? "auto" : "smooth" });
    });

    // ── hours: highlight today ─────────────────────────────────────
    const today = new Date().getDay();
    document.querySelectorAll(".hours tr").forEach((r) => {
      if (+(r as HTMLElement).dataset.d! === today) r.classList.add("today");
    });

    // ── reviews scroll ─────────────────────────────────────────────
    const strip = document.getElementById("revStrip");
    const revNext = document.getElementById("revNext");
    const revPrev = document.getElementById("revPrev");
    if (strip && revNext) revNext.onclick = () => strip.scrollBy({ left: 380, behavior: RM ? "auto" : "smooth" });
    if (strip && revPrev) revPrev.onclick = () => strip.scrollBy({ left: -380, behavior: RM ? "auto" : "smooth" });

    // ── initial cart render ────────────────────────────────────────
    renderCart();

    return () => {
      clearTimeout(heroTimer);
      clearTimeout(renderTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cartUpdate", onCartUpdate);
      window.removeEventListener("builderAdd", onBuilderAdd);
      io.disconnect();
      cio.disconnect();
    };
  }, []);

  return null;
}
