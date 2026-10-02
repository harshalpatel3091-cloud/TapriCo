export default function CartDrawer() {
  return (
    <>
      

  <div className="overlay" id="overlay"></div>
  <aside className="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Your order">
    <div className="drawer-head">
      <div>
        <h3>Your Order</h3><span className="hn">आपका ऑर्डर</span>
      </div> <button className="close-x" id="closeDrawer" aria-label="Close order">✕</button>
    </div>
    <div className="drawer-items" id="drawerItems"></div>
    <div className="success" id="orderSuccess">
      <div className="steam" style={{"position":"relative","margin":"0 auto","width":"80px","height":"70px"}} aria-hidden="true">
        <i></i><i></i><i></i></div>
      <div className="hn">ऑर्डर भट्टी पर चढ़ गया!</div>
      <div className="tok" id="tokenNo">T-412</div>
      <p id="successMsg">Ready in ~8 minutes. Kulhad garam kar rahe hain.</p> <button className="btn btn-clay" id="newOrder"
        style={{"marginTop":"22px"}}>Naya Order <span className="arr">→</span></button>
    </div>
    <div className="drawer-foot" id="drawerFoot">
      <div className="sub-row"><span>Subtotal</span><span id="subAmt">₹0</span></div>
      <div className="sub-row"><span>Kulhad deposit (refundable)</span><span>₹0 — earth is free</span></div>
      <div className="sub-row grand"><span>Total</span><span className="amt" id="grandAmt">₹0</span></div>
      <p className="note-k">Kulhads wapas karo, ₹5 per kulhad wapas pao. Plastic strictly mana hai.</p> <button
        className="btn btn-clay checkout" id="checkout">Bhatti pe bhejo <span className="arr">→</span></button>
    </div>
  </aside>

  <div className="toast" id="toast" role="status"><span className="t-ic">☕</span><span id="toastMsg">Kulhad mein daal
      diya!</span></div>
    </>
  );
}