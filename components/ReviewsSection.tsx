export default function ReviewsSection() {
  return (
    <>
      

  <section id="reviews">
    <div className="wrap">
      <div className="sec-head">
        <div> <span className="eyebrow" data-scramble data-reveal>05 · LOG KYA KEHTE HAIN</span>
          <h2 className="h-big lines"><span className="ln"><span>Muh phat regulars,</span></span><span className="ln"><span>sachhi
                raay.</span></span></h2>
        </div>
        <div className="rev-nav"><button className="rev-btn" id="revPrev" aria-label="Previous reviews">←</button><button
            className="rev-btn" id="revNext" aria-label="Next reviews">→</button></div>
      </div>
    </div>
    <div className="wrap">
      <div className="rev-strip" id="revStrip">
        <article className="review"><span className="q">"</span>
          <p>Yahan ki adrak chai pi ke office ka pura stress bhag jaata hai. Meeting cancel karke aata hoon.</p>
          <div className="who"><img src="https://picsum.photos/seed/regular-rohit/100/100" alt="" />
            <div><b>Rohit Khandelwal</b><span>REGULAR SINCE 2015 · BANK MANAGER</span></div>
          </div>
        </article>
        <article className="review"><span className="q">"</span>
          <p>Beta IIT yahan ki chai se hi nikla. Roz do kulhad, exam ke din teen. Hisab rakhta hoon.</p>
          <div className="who"><img src="https://picsum.photos/seed/regular-sharma/100/100" alt="" />
            <div><b>Sharma Ji</b><span>RETIRED PROFESSOR · 30 SAAL SE</span></div>
          </div>
        </article>
        <article className="review"><span className="q">"</span>
          <p>Tandoori chai is not a chai, it's an emotion wrapped in smoke. Jaipur's best, full stop.</p>
          <div className="who"><img src="https://picsum.photos/seed/regular-meera/100/100" alt="" />
            <div><b>Meera Rathore</b><span>FOOD BLOGGER · @KHAJAIPUR</span></div>
          </div>
        </article>
        <article className="review"><span className="q">"</span>
          <p>Shaadi ke 25 saal ho gaye — roz shaam ek cutting pakka, isi bench pe, isi nukkad pe.</p>
          <div className="who"><img src="https://picsum.photos/seed/regular-couple/100/100" alt="" />
            <div><b>Prakash &amp; Sunita</b><span>WEDDING ANNIVERSARY EVERY DAY</span></div>
          </div>
        </article>
        <article className="review"><span className="q">"</span>
          <p>Best bun maska in Jaipur. Fight me. Hostel ke saare log isi bench par milte hain.</p>
          <div className="who"><img src="https://picsum.photos/seed/regular-aditya/100/100" alt="" />
            <div><b>Aditya Singh</b><span>ENGINEERING STUDENT · BUNK SPECIALIST</span></div>
          </div>
        </article>
      </div>
    </div>
  </section>

  
    </>
  );
}