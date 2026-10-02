"use client";
export default function FindUsSection() {
  return (
    <>
      

  <section id="find">
    <div className="wrap">
      <div className="sec-head">
        <div> <span className="eyebrow" data-scramble data-reveal>06 · AA JAO KABHI</span>
          <h2 className="h-big lines"><span className="ln"><span>Tapri kahaan</span></span><span
              className="ln"><span>milegi.</span></span></h2>
        </div>
        <p className="note" data-reveal>Ghadi mat dekho, smell follow karo. Nukkad tak pahunch gaye toh samajh lo aadha
          raasta ho gaya.</p>
      </div>
      <div className="find-grid">
        <div>
          <div className="pass-card" data-reveal id="passCard">
            <h3>Chai Pass <span className="hn">चाय पास</span></h3>
            <p style={{"fontSize":"13.5px"}}>Har kulhad pe ek thappa. Card bhar gaya toh agla wala hamari taraf se.</p>
            <div className="stamps" id="stamps"></div>
            <p className="pass-note">10 kulhad = 1 FREE · Hamesha, bina shart.</p>
            <p className="free">🎉 BAS HO GAYA — FREE CHAI UNLOCKED!</p>
          </div>
          <div className="hours" data-reveal style={{"--D":".1s"} as React.CSSProperties}>
            <h3>Timings</h3>
            <table>
              <tbody>
              <tr data-d="1">
                <td>Somvar (Mon)</td>
                <td>6:00 — 23:00</td>
              </tr>
              <tr data-d="2">
                <td>Mangal (Tue)</td>
                <td>6:00 — 23:00</td>
              </tr>
              <tr data-d="3">
                <td>Budh (Wed)</td>
                <td>6:00 — 23:00</td>
              </tr>
              <tr data-d="4">
                <td>Guru (Thu)</td>
                <td>6:00 — 23:00</td>
              </tr>
              <tr data-d="5">
                <td>Shukra (Fri)</td>
                <td>6:00 — 23:00</td>
              </tr>
              <tr data-d="6">
                <td>Shanivar (Sat)</td>
                <td>6:00 — 23:30</td>
              </tr>
              <tr data-d="0">
                <td>Ravivar (Sun)</td>
                <td>7:00 — 22:00</td>
              </tr>
            </tbody>
            </table>
            <div className="contact-row"> <a className="wa-btn" href="#" onClick={(e) => e.preventDefault()}><svg width="16" height="16"
                  viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.3 14.1c-.2.7-1.3 1.3-1.8 1.3-.5.1-1.1.2-3.6-.8-3-1.2-5-4.3-5.1-4.5-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.7.9-.5 1.2.8 1.4 1.8 2.2 3.2 2.9.3.2.5.1.7-.1l.7-.9c.2-.3.4-.2.7-.1l2 1c.3.2.5.2.6.4 0 .2 0 .8-.2 1.4Z" />
                </svg>WhatsApp: +91 98-2900-1987</a> <a className="dir-btn" href="#find" onClick={(e) => e.preventDefault()}>☎
                0141-CHA-1987</a> </div>
          </div>
        </div>
        <div className="map-box" data-reveal style={{"--D":".15s"} as React.CSSProperties}> <img
            src="https://picsum.photos/seed/jaipur-old-market-map/900/700" alt="Map to the tapri" loading="lazy" />
          <div className="map-pin"><span className="lbl">TAPRI &amp; CO.</span>
            <div className="dot"></div>
          </div>
          <div className="addr"><b>Shop No. 3, Purani Mandir Gali</b>Old Market Road, Jaipur 302001 · bade neem ke ped ke
            neeche, neeli cycle wali bench ke saamne.</div>
        </div>
      </div>
    </div>
  </section>

  
    </>
  );
}