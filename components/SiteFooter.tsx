"use client";
export default function SiteFooter() {
  return (
    <>
      

  <footer>
    <div className="foot-marquee marquee" aria-hidden="true">
      <div className="marquee-track"> <span>चाय पियो ✦ गपशप करो ✦ फिर आना ✦</span><span>चाय पियो ✦ गपशप करो ✦ फिर आना
          ✦</span> </div>
    </div>
    <div className="wrap foot-body">
      <div className="foot-grid">
        <div className="foot-brand"> <span className="hindi" style={{"fontSize":"34px","color":"var(--amber)"}}>टपरी &amp; को.</span>
          <p>A stubborn little chai stall pretending to be a website. Do ubaal since 1987.</p>
        </div>
        <div>
          <h4>Wander</h4>
          <ul>
            <li><a href="#menu">Aaj ka menu</a></li>
            <li><a href="#builder">Build-a-chai</a></li>
            <li><a href="#brew">The four asools</a></li>
            <li><a href="#gallery">Tapri diary</a></li>
          </ul>
        </div>
        <div>
          <h4>Fake Links</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Kulhad return scheme</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Catering for shaadi</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Bhatti apprenticeship</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Secret masala (no)</a></li>
          </ul>
        </div>
        <div>
          <h4>Follow</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Instagram — @tapriandco</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>WhatsApp broadcast</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Zomato ★ 4.9</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Chacha's YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom"> <span>© 2026 Tapri &amp; Co. — brewed with do ubaal, poured with one arm.</span>
        <span>Return your kulhad, get ₹5 back. Mitti izzat maangti hai.</span> </div>
    </div>
  </footer>

  
    </>
  );
}