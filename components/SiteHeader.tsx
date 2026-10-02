export default function SiteHeader() {
  return (
    <>
      

  <header id="header">
    <nav className="nav"> <a className="brand" href="#top"> <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M5 8h20l-3 17a3 3 0 0 1-3 2.5H11a3 3 0 0 1-3-2.5L5 8Z" fill="#c05a2e" />
          <ellipse cx="15" cy="8" rx="10" ry="2.6" fill="#e0a23f" />
          <path d="M12 3c-.8 1.4.8 1.8 0 3.2M17 2.4c-.8 1.4.8 1.8 0 3.2" stroke="#f4e8d2" strokeWidth="1.4"
            strokeLinecap="round" />
        </svg> <span><b>TAPRI &amp; CO.</b><small>est. 1987 · jaipur</small></span> </a>
      <div className="nav-links"> <a href="#menu">Menu</a> <a href="#builder">Build-A-Chai</a> <a href="#brew">The Brew</a>
        <a href="#gallery">Diary</a> <a href="#find">Find Us</a> </div> <button className="cart-btn" id="cartBtn"
        aria-label="Open your order"> <svg width="17" height="17" viewBox="0 0 30 30" fill="none">
          <path d="M5 8h20l-3 17a3 3 0 0 1-3 2.5H11a3 3 0 0 1-3-2.5L5 8Z" fill="currentColor" />
        </svg> Order <span className="cart-count" id="cartCount">0</span> </button>
    </nav>
  </header>

    </>
  );
}
