"use client";

import { useState } from "react";
import { MENU } from "@/lib/menuData";

type CartItem = { name: string; hn: string; price: number; qty: number; meta?: string };
type Cart = Map<string, CartItem>;

// Global cart state (shared with CartDrawer via events)
let globalCart: Cart = new Map();

function dispatchCartUpdate(cart: Cart) {
  window.dispatchEvent(new CustomEvent("cartUpdate", { detail: cart }));
}

export default function MenuSection() {
  const [filter, setFilter] = useState("all");
  const [vegOnly, setVegOnly] = useState(false);

  const toastMsgs = ["Kulhad mein daal diya!", "Bhatti pe chadh gaya!", "Ek minute, garam ho rahi hai!", "Chacha ne nod kar diya ✓"];
  let toastI = 0;

  function showToast(msg?: string) {
    const t = document.getElementById("toast");
    const m = document.getElementById("toastMsg");
    if (!t || !m) return;
    m.textContent = msg || toastMsgs[toastI++ % toastMsgs.length];
    t.classList.add("show");
    clearTimeout((t as any)._h);
    (t as any)._h = setTimeout(() => t.classList.remove("show"), 2400);
  }

  function addItem(key: string, entry: CartItem) {
    if (globalCart.has(key)) globalCart.get(key)!.qty += entry.qty || 1;
    else globalCart.set(key, entry);
    dispatchCartUpdate(globalCart);
    showToast();
    // update badge
    let n = 0; globalCart.forEach((i) => (n += i.qty));
    const b = document.getElementById("cartCount");
    if (b) { b.textContent = String(n); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
  }

  const visible = MENU.filter((m) => {
    const catOk = filter === "all" || m.cat === filter;
    const vegOk = !vegOnly || m.veg === 1;
    return catOk && vegOk;
  });

  return (
    <section id="menu">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow" data-scramble data-reveal>01 · AAJ KA MENU</span>
            <h2 className="h-big lines">
              <span className="ln"><span>Bhatti garam hai,</span></span>
              <span className="ln"><span>menu ready hai.</span></span>
            </h2>
          </div>
          <p className="note" data-reveal>
            Sab kuch ussi din, ussi bharti pe. Khatam matlab khatam — kal subah 6 baje phir milega.
          </p>
        </div>

        <div className="tabs" data-reveal>
          {[
            { f: "all", label: "Sab kuch" },
            { f: "chai", label: "Chai" },
            { f: "snack", label: "Nashta" },
            { f: "special", label: "Kulhad Specials" },
          ].map(({ f, label }) => (
            <button
              key={f}
              className={`tab${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {label}
            </button>
          ))}
          <label className="veg-toggle">
            <input
              type="checkbox"
              id="vegOnly"
              className="sr"
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
            />
            <span className="box"></span>Shudh shakahari
          </label>
        </div>

        <div className="dishes" id="dishGrid">
          {visible.map((m, i) => (
            <article
              key={m.id}
              className="dish pop"
              data-cat={m.cat}
              data-veg={m.veg}
              style={{ animationDelay: `${(i % 8) * 45}ms` }}
            >
              <div className="dish-img">
                <img
                  src={m.img ?? `https://picsum.photos/seed/${m.seed}/600/400`}
                  alt={m.name}
                  loading="lazy"
                />
                {m.tag && (
                  <span className={`tag${m.tag === "New" ? " new" : ""}`}>{m.tag}</span>
                )}
              </div>
              <div className="dish-body">
                <div className="dish-top">
                  <span className={`vegdot${m.veg ? "" : " nonveg"}`} title={m.veg ? "Veg" : "Non-veg"}>
                    <i></i>
                  </span>
                  <h3>{m.name}</h3>
                  <span className="price">₹{m.price}</span>
                </div>
                <p className="hn">{m.hn}</p>
                <p className="desc">{m.desc}</p>
                <div className="dish-foot">
                  <span className="spice" title="Spice level">
                    {"🔥".repeat(m.spice) || "—"}
                  </span>
                  <AddButton
                    onClick={() =>
                      addItem("m-" + m.id, { name: m.name, hn: m.hn, price: m.price, qty: 1 })
                    }
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AddButton({ onClick }: { onClick: () => void }) {
  const [added, setAdded] = useState(false);
  function handleClick() {
    onClick();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }
  return (
    <button className={`add-btn${added ? " added" : ""}`} onClick={handleClick}>
      {added ? "✓ Added" : "Add +"}
    </button>
  );
}