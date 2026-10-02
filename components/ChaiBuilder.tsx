"use client";

import { useState, useEffect, useRef } from "react";

type CartItem = { name: string; hn: string; price: number; qty: number; meta?: string };

const kadakLabels = [
  "",
  "Patli — ye chai hai ya paani?",
  "Halki — theek hai, chalega",
  "Level 3 — barabar, jaisi honi chahiye",
  "Kadak — ab aayi na baat pe",
  "KADAK MAX — extra patti, extra izzat",
];

function hexMix(a: string, b: string, t: number) {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [ar, ag, ab] = p(a), [br, bg, bb] = p(b);
  const h = (v: number) => Math.round(v).toString(16).padStart(2, "0");
  return "#" + h(ar + (br - ar) * t) + h(ag + (bg - ag) * t) + h(ab + (bb - ab) * t);
}

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function ChaiBuilder() {
  // vessel: cutting=12/.55, kulhad=25/.8, lagan=38/.97
  const [vessel, setVessel] = useState({ value: "kulhad", price: 25, vol: 0.8 });
  // milk: bhains=0/#c68b59, toned=0/#b97f4e, badam=12/#c8996a, oat=22/#c9a87e
  const [milk, setMilk] = useState({ value: "bhains", price: 0, col: "#c68b59" });
  const [kadak, setKadak] = useState(3);
  // adrak: nahi=0, normal=0, double=5
  const [adrak, setAdrak] = useState({ value: "normal", price: 0 });
  // masala: skip=0, house=0, double=6
  const [masala, setMasala] = useState({ value: "house", price: 0 });
  // meetha: nosugar=0, kam=0, barabar=0, gud=4
  const [meetha, setMeetha] = useState({ value: "barabar", price: 0 });
  // tops checkboxes
  const [tops, setTops] = useState<{ value: string; price: number; label: string }[]>([]);

  const vessels = [
    { id: "v1", value: "cutting", label: "Cutting", price: 12, vol: 0.55 },
    { id: "v2", value: "kulhad", label: "Kulhad", price: 25, vol: 0.8 },
    { id: "v3", value: "lagan", label: "Bada Lagan", price: 38, vol: 0.97 },
  ];
  const milks = [
    { id: "m1", value: "bhains", label: "Bhains Full-Cream", price: 0, col: "#c68b59" },
    { id: "m2", value: "toned", label: "Toned", price: 0, col: "#b97f4e" },
    { id: "m3", value: "badam", label: "Badam Milk", price: 12, col: "#c8996a" },
    { id: "m4", value: "oat", label: "Oat", price: 22, col: "#c9a87e" },
  ];
  const adraks = [
    { id: "a1", value: "nahi", label: "Nahi chahiye", price: 0 },
    { id: "a2", value: "normal", label: "Barabar", price: 0 },
    { id: "a3", value: "double", label: "Double, kuti hui", price: 5 },
  ];
  const masalas = [
    { id: "s1", value: "skip", label: "Skip", price: 0 },
    { id: "s2", value: "house", label: "House Blend", price: 0 },
    { id: "s3", value: "double", label: "Double Mashala", price: 6 },
  ];
  const meethas = [
    { id: "g1", value: "nosugar", label: "No Sugar", price: 0 },
    { id: "g2", value: "kam", label: "Kam", price: 0 },
    { id: "g3", value: "barabar", label: "Barabar", price: 0 },
    { id: "g4", value: "gud", label: "Extra Gud", price: 4 },
  ];
  const topOptions = [
    { id: "t1", value: "malai", label: "Malai maar ke", price: 8 },
    { id: "t2", value: "dryfruit", label: "Dry Fruits", price: 15 },
    { id: "t3", value: "honey", label: "Honey", price: 12 },
    { id: "t4", value: "extrakulhad", label: "Ek Kulhad Aur", price: 10 },
  ];

  const total =
    vessel.price +
    milk.price +
    (kadak === 5 ? 3 : 0) +
    adrak.price +
    masala.price +
    meetha.price +
    tops.reduce((s, t) => s + t.price, 0);

  // cup visual
  const maxY = 196, minY = 92;
  const liqH = (maxY - minY) * vessel.vol;
  const liqY = maxY - liqH;
  const liqCol = hexMix(milk.col, "#5a2f14", ((kadak - 1) / 4) * 0.55);
  const surfCol = hexMix(liqCol, "#f4e8d2", 0.4);

  // receipt rows
  const rows: [string, number][] = [
    [vessel.value === "cutting" ? "Cutting" : vessel.value === "kulhad" ? "Kulhad" : "Bada Lagan", vessel.price],
    ["Doodh: " + milk.value, milk.price],
    ["Kadak " + kadak + (kadak === 5 ? " (+patti)" : ""), kadak === 5 ? 3 : 0],
  ];
  if (adrak.price) rows.push(["Double adrak", 5]);
  if (masala.price) rows.push(["Double mashala", 6]);
  if (meetha.price) rows.push(["Extra gud", 4]);
  tops.forEach((t) => rows.push([t.value === "extrakulhad" ? "Ek kulhad aur" : t.value, t.price]));

  // total pop animation ref
  const totalRef = useRef<HTMLSpanElement>(null);
  const prevTotal = useRef(total);
  useEffect(() => {
    if (prevTotal.current !== total && totalRef.current) {
      totalRef.current.classList.remove("pop-amt");
      void totalRef.current.offsetWidth;
      totalRef.current.classList.add("pop-amt");
    }
    prevTotal.current = total;
  }, [total]);

  function toggleTop(opt: typeof topOptions[0]) {
    setTops((prev) =>
      prev.find((t) => t.value === opt.value)
        ? prev.filter((t) => t.value !== opt.value)
        : [...prev, { value: opt.value, price: opt.price, label: opt.label }]
    );
  }

  function handleOrderAdd() {
    const meta = `${vessel.value} · ${milk.value} doodh · kadak ${kadak} · adrak ${adrak.value}${tops.length ? " · " + tops.map((t) => t.value).join(", ") : ""}`;
    const entry: CartItem = { name: "Meri Wali Chai", hn: "मेरी वाली चाय", price: total, qty: 1, meta };

    // update global cart via event
    const cartUpdateEvent = new CustomEvent("builderAdd", { detail: { key: "b-" + Date.now(), entry } });
    window.dispatchEvent(cartUpdateEvent);

    // open drawer
    document.body.classList.add("drawer-open");
    document.getElementById("orderSuccess")?.classList.remove("show");
  }

  return (
    <section id="builder">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow" data-scramble data-reveal>02 · BUILD-A-CHAI</span>
            <h2 className="h-big lines">
              <span className="ln"><span>Apni chai,</span></span>
              <span className="ln"><span>apne rules.</span></span>
            </h2>
          </div>
          <p className="note" data-reveal>
            Batao kaisi chahiye — hum bharti pe waise hi banayenge. Receipt live banti hai.
          </p>
        </div>

        <div className="builder-grid">
          {/* Cup panel */}
          <div className="cup-panel" data-reveal>
            <div className="mini-stage">
              <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
              <svg width="200" height="190" viewBox="0 0 260 240" fill="none">
                <defs>
                  <clipPath id="cupClip">
                    <path d="M72 80 L188 80 L175 196 Q171 216 130 216 Q89 216 85 196 Z" />
                  </clipPath>
                </defs>
                <path d="M68 76 L192 76 L177 198 Q173 220 130 220 Q87 220 83 198 Z" fill="#b1502a" />
                <g clipPath="url(#cupClip)">
                  <rect id="liq" x="70" y={liqY} width="120" height={liqH} fill={liqCol} />
                  <ellipse id="surf" cx="130" cy={liqY + 2} rx="56" ry="9" fill={surfCol} />
                </g>
                <ellipse cx="130" cy="76" rx="62" ry="13" fill="#8f3f1e" />
                <ellipse cx="130" cy="75" rx="54" ry="10" fill="#3c1e0c" />
                <path d="M84 160 L176 160" stroke="#7d3416" strokeWidth="3" opacity=".5" />
              </svg>
            </div>

            <div className="receipt">
              <h4>PARCHI <span className="hindi" style={{ fontSize: "13px" }}>परची</span></h4>
              <div id="receiptRows">
                {rows.map(([label, price], i) => (
                  <div className="r-row" key={i}>
                    <span>{label}</span>
                    <span>{price ? `+₹${price}` : "—"}</span>
                  </div>
                ))}
              </div>
              <div className="r-row total">
                <span>Total</span>
                <span className="amt" id="buildTotal" ref={totalRef}>{inr.format(total)}</span>
              </div>
            </div>

            <button className="btn btn-solid builder-add" id="builderAdd" onClick={handleOrderAdd}>
              Order mein daalo <span className="arr">→</span>
            </button>
          </div>

          {/* Options */}
          <div>
            {/* Vessel */}
            <div className="opt-group" data-reveal>
              <h3>Bartan <span className="hn">बर्तन</span></h3>
              <p className="hint">Kitni pyaas hai, pehle ye batao.</p>
              <div className="pills">
                {vessels.map((v) => (
                  <span key={v.id}>
                    <input type="radio" name="vessel" id={v.id} value={v.value}
                      defaultChecked={v.value === "kulhad"}
                      onChange={() => setVessel({ value: v.value, price: v.price, vol: v.vol })} />
                    <label htmlFor={v.id}>{v.label}{v.price ? <span className="amt"> ₹{v.price}</span> : null}</label>
                  </span>
                ))}
              </div>
            </div>

            {/* Milk */}
            <div className="opt-group" data-reveal style={{ "--D": ".06s" } as React.CSSProperties}>
              <h3>Doodh <span className="hn">दूध</span></h3>
              <p className="hint">Subah 5 baje ka taaza, wada pakka.</p>
              <div className="pills">
                {milks.map((m) => (
                  <span key={m.id}>
                    <input type="radio" name="milk" id={m.id} value={m.value}
                      defaultChecked={m.value === "bhains"}
                      onChange={() => setMilk({ value: m.value, price: m.price, col: m.col })} />
                    <label htmlFor={m.id}>{m.label}{m.price ? <span className="amt"> +₹{m.price}</span> : null}</label>
                  </span>
                ))}
              </div>
            </div>

            {/* Kadak */}
            <div className="opt-group" data-reveal style={{ "--D": ".1s" } as React.CSSProperties}>
              <h3>Kadak Level <span className="hn">कड़क</span></h3>
              <p className="hint">Slider upar, patti zyada. Level 5 pe extra patti lagti hai.</p>
              <input type="range" id="kadak" min="1" max="5" value={kadak}
                aria-label="Kadak level" onChange={(e) => setKadak(+e.target.value)} />
              <div className="range-lbls"><span>Patli</span><span>Barabar</span><span>KADAK</span></div>
              <div className="kadak-read" id="kadakRead">
                Level {kadak} — {kadakLabels[kadak].split("—")[1]?.trim()}
              </div>
            </div>

            {/* Adrak */}
            <div className="opt-group" data-reveal style={{ "--D": ".14s" } as React.CSSProperties}>
              <h3>Adrak <span className="hn">अदरक</span></h3>
              <div className="pills">
                {adraks.map((a) => (
                  <span key={a.id}>
                    <input type="radio" name="adrak" id={a.id} value={a.value}
                      defaultChecked={a.value === "normal"}
                      onChange={() => setAdrak({ value: a.value, price: a.price })} />
                    <label htmlFor={a.id}>{a.label}{a.price ? <span className="amt"> +₹{a.price}</span> : null}</label>
                  </span>
                ))}
              </div>
            </div>

            {/* Masala */}
            <div className="opt-group" data-reveal style={{ "--D": ".18s" } as React.CSSProperties}>
              <h3>Masala <span className="hn">मसाला</span></h3>
              <div className="pills">
                {masalas.map((s) => (
                  <span key={s.id}>
                    <input type="radio" name="masala" id={s.id} value={s.value}
                      defaultChecked={s.value === "house"}
                      onChange={() => setMasala({ value: s.value, price: s.price })} />
                    <label htmlFor={s.id}>{s.label}{s.price ? <span className="amt"> +₹{s.price}</span> : null}</label>
                  </span>
                ))}
              </div>
            </div>

            {/* Meetha */}
            <div className="opt-group" data-reveal style={{ "--D": ".22s" } as React.CSSProperties}>
              <h3>Meetha <span className="hn">मीठा</span></h3>
              <div className="pills">
                {meethas.map((g) => (
                  <span key={g.id}>
                    <input type="radio" name="meetha" id={g.id} value={g.value}
                      defaultChecked={g.value === "barabar"}
                      onChange={() => setMeetha({ value: g.value, price: g.price })} />
                    <label htmlFor={g.id}>{g.label}{g.price ? <span className="amt"> +₹{g.price}</span> : null}</label>
                  </span>
                ))}
              </div>
            </div>

            {/* Top-ups */}
            <div className="opt-group" data-reveal style={{ "--D": ".26s" } as React.CSSProperties}>
              <h3>Top-ups <span className="hn">ऊपर से</span></h3>
              <div className="pills">
                {topOptions.map((t) => (
                  <span key={t.id}>
                    <input type="checkbox" id={t.id} value={t.value}
                      checked={tops.some((x) => x.value === t.value)}
                      onChange={() => toggleTop(t)} />
                    <label htmlFor={t.id}>{t.label} <span className="amt">+₹{t.price}</span></label>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}