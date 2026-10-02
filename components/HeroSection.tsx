export default function HeroSection() {
  return (
    <>
      

  <section className="hero">
    <div className="wrap">
      <div className="hero-grid">
        <div> <span className="eyebrow" data-scramble>स्थापना १९८७ · जयपुर की सबसे ज़िद्दी टपरी</span>
          <h1 className="h-big lines" id="heroLines"> <span className="ln"><span>Ek kulhad,</span></span> <span className="ln"><span
                className="hindi">चाय</span></span> <span className="ln"><span>aur <em>garam</em> gupshup.</span></span> </h1>
          <p className="lede">Patti double-ubaali jaati hai, doodh bhains ka, kulhad mitti ke bhatte se seedha. No machine,
            no shortcut — bas bharti, khoyi, aur ek ungli ka ishara: <em className="h-ital">"Bhaiya, ek aur."</em></p>
          <div className="btn-row"> <a className="btn btn-solid" href="#menu">Dekho Menu <span className="arr">→</span></a> <a
              className="btn btn-ghost" href="#builder">Apni Chai Banao <span className="arr">↗</span></a> </div>
        </div>
        <div className="cup-stage">
          <div className="cup-float" style={{"position":"relative"}}>
            <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div> <svg width="250" height="240"
              viewBox="0 0 260 240" fill="none" aria-label="Steaming kulhad of chai">
              <ellipse cx="130" cy="222" rx="86" ry="12" fill="rgba(0,0,0,.35)" />
              <path d="M68 76 L192 76 L177 198 Q173 220 130 220 Q87 220 83 198 Z" fill="#b1502a" />
              <path d="M68 76 L192 76 L188 108 L72 108 Z" fill="#c9653a" />
              <path d="M79 150 L181 150 L178 172 L82 172 Z" fill="#8f3f1e" opacity=".7" />
              <ellipse cx="130" cy="76" rx="62" ry="13" fill="#8f3f1e" />
              <ellipse cx="130" cy="75" rx="53" ry="10" fill="#6b3a1b" />
              <ellipse cx="130" cy="74" rx="47" ry="8" fill="#a45f2b">
                <animate attributeName="ry" values="8;8.8;8" dur="3s" repeatCount="indefinite" />
              </ellipse>
              <path d="M96 116 q6 10 0 20 M130 112 q7 12 0 24 M164 116 q6 10 0 20" stroke="#7d3416" strokeWidth="3"
                strokeLinecap="round" opacity=".55" />
            </svg>
          </div> <span className="chip-float chip-a">Open · <b>6 AM – 11 PM</b></span> <span className="chip-float chip-b">★
            <b>4.9</b> · 2,400 regulars</span> <span className="chip-float chip-c">Chai <b>₹12 se shuru</b></span> <svg
            className="stamp-badge" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="58" fill="#e0a23f" />
            <circle cx="60" cy="60" r="34" fill="none" stroke="#221208" strokeWidth="1.5" strokeDasharray="3 4" />
            <path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" fill="none" /> <text fontSize="11.5"
              fontWeight="800" letterSpacing="2.4" fill="#221208">
              <textPath href="#circ">KULHAD MEIN HI · NO PLASTIC · SINCE 1987 ·</textPath>
            </text> <text x="60" y="66" textAnchor="middle" fontSize="17" fontWeight="900" fill="#221208"
              fontFamily="Fraunces,serif">40 SAAL</text>
          </svg>
        </div>
      </div>
      <div className="stats">
        <div className="stat">
          <div className="num" data-count="40" data-suffix=" saal">0</div>
          <div className="lbl">same bharti, same nukkad</div>
        </div>
        <div className="stat">
          <div className="num" data-count="400" data-suffix="+">0</div>
          <div className="lbl">kulhad roz gaye hain</div>
        </div>
        <div className="stat">
          <div className="num" data-count="15" data-suffix="">0</div>
          <div className="lbl">chai varieties on board</div>
        </div>
        <div className="stat">
          <div className="num" data-count="4.9" data-dec="1" data-suffix="★">0</div>
          <div className="lbl">2,400 regulars rate</div>
        </div>
      </div>
    </div>
  </section>

    </>
  );
}
