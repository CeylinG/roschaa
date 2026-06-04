import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-kelebek.png";
import philosophyImg from "@/assets/philosophy-updated.png";
import product1Img from "@/assets/product1.jpg";
import product2Img from "@/assets/product2.jpg";
import benefitsImg from "@/assets/benefits.jpg";
import roseGardenImg from "@/assets/rose-garden-updated.png";
import matchaImg from "@/assets/matcha-updated.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ROSCHA — Turkish Delight with Matcha & Rose" },
      { name: "description", content: "Luxury Turkish delight reimagined. Zero added sugar, ceremonial matcha, and Isparta rose. Crafted for the conscious soul." },
      { property: "og:title", content: "ROSCHA — Turkish Delight with Matcha & Rose" },
      { property: "og:description", content: "Luxury Turkish delight reimagined. Zero added sugar, ceremonial matcha, and Isparta rose." },
    ],
  }),
  component: Index,
});

type Product = { id: string; name: string; weight: string; price: number; img: string };

const PRODUCTS: Product[] = [
  { id: "petit", name: "PERSONAL RITUAL", weight: "250 g · 12 pieces", price: 799, img: product1Img },
  { id: "grand", name: "GOURMET GIFT", weight: "500 g · 24 pieces", price: 1499, img: product2Img },
];

type CartItem = Product & { qty: number };

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.qty * i.price, 0);

  const addToCart = (p: Product) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === p.id);
      if (ex) return c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...p, qty: 1 }];
    });
    setAddedId(p.id);
    setToast(`${p.name} added`);
    setTimeout(() => setAddedId(null), 1500);
    setTimeout(() => setToast(""), 2400);
  };
  const updateQty = (id: string, delta: number) =>
    setCart((c) => c.flatMap((i) => (i.id === id ? (i.qty + delta <= 0 ? [] : [{ ...i, qty: i.qty + delta }]) : [i])));
  const remove = (id: string) => setCart((c) => c.filter((i) => i.id !== id));

  return (
    <>
      <nav className={`roscha-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="nav-logo">ROSCHA</a>
        <ul className="nav-links">
          <li><a href="#story">Our Story</a></li>
          <li><a href="#ingredients">Ingredients</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#wellness">Wellness</a></li>
        </ul>
        <button className="nav-cart" onClick={() => setCartOpen(true)}>
          Cart <span className="cart-badge">{totalQty}</span>
        </button>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">Turkish Delight Reimagined</div>
          <h1 className="hero-title">WHERE<br/>MATCHA<br/><em>MEETS</em><br/>ROSE</h1>
          <p className="hero-subtitle">Zero sugar. Pure botanicals.<br/>Ancient craft. Modern intention.</p>
          <div className="hero-cta">
            <a href="#shop" className="btn-primary">Discover ROSCHA</a>
            <a href="#story" className="btn-ghost">Our Story</a>
          </div>
        </div>
        <div className="hero-right">
          <img src={heroImg} alt="ROSCHA Turkish delight with matcha and rose" className="hero-img" />
          <div className="hero-ornament">
            <div className="ornament-line" />
            <span className="ornament-text">Scroll</span>
          </div>
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} style={{ display: "flex" }}>
              {["Zero Added Sugar","✦","Ceremonial Matcha","✦","Isparta Rose","✦","Diabetic Friendly","✦","Vegan · Gluten Free","✦","Crafted in Istanbul","✦"].map((t, i) => (
                <span key={i} className={`marquee-item ${t === "✦" ? "marquee-sep" : ""}`}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="section" id="story">
        <div className="reveal">
          <div className="section-label">Our Philosophy</div>
          <h2 className="section-heading">Crafted for the <em>Conscious Soul</em></h2>
        </div>
        <div className="philosophy-grid">
          <div className="philosophy-text reveal">
            <p>ROSCHA was born from a singular question: why should indulgence come at the cost of wellbeing? We reimagined the centuries-old tradition of Turkish Delight stripping away refined sugars, preservatives, and artifice  to reveal something truer and more beautiful beneath.</p>
            <p>Every piece carries the verdant depth of Japanese ceremonial matcha and the floral grace of Isparta roses, harvested from Turkey's fragrant Rose Valley. Together, they create a sensory dialogue between East and West, ancient wisdom and modern clarity.</p>
            <p>Our sweetness comes only from nature making ROSCHA the first luxury Turkish Delight designed for those who refuse to choose between pleasure and health.</p>
            <div className="philosophy-stats">
              <div><div className="stat-num">Zero</div><div className="stat-label">Added Sugar</div></div>
              <div><div className="stat-num">100%</div><div className="stat-label">Natural Colors</div></div>
              <div><div className="stat-num">2</div><div className="stat-label">Hero Botanicals</div></div>
            </div>
            <div className="philosophy-extra-images">
              <img src={roseGardenImg} alt="Rose garden at golden hour" />
              <img src={matchaImg} alt="Ceremonial matcha preparation" />
            </div>



          </div>
          <div className="philosophy-img-wrap reveal">
            <img src={philosophyImg} alt="Artisan crafting ROSCHA" className="philosophy-img" loading="lazy" />
            <div className="philosophy-img-accent" />
          </div>
        </div>
      </section>

      <section className="ingredients" id="ingredients">
        <div className="reveal">
          <div className="section-label">The Botanicals</div>
          <h2 className="section-heading">Two Worlds,<br/><em>One Exquisite Union</em></h2>
        </div>
        <div className="ing-grid">
          {[
            { n:"01", name:"Ceremonial Matcha", desc:"First-harvest Japanese matcha, stone-ground from shade-grown tencha leaves. Rich in L-theanine for focused, calm energy without the crash.", tag:"Clean Energy" },
            { n:"02", name:"Isparta Rose", desc:"Handpicked Damask roses from Turkey's Valley of Roses. Naturally soothing, antioxidant-rich petals that support emotional well-being.", tag:"Emotional Calm" },
            { n:"03", name:"Natural Sweetness", desc:"Plant-derived sweetness with zero glycemic impact. Diabetic-friendly, calorie-free, indistinguishable from sugar in depth of flavor.", tag:"Zero Sugar" },
            { n:"04", name:"Pure Tradition", desc:"Our base follows the original Ottoman method no gelatin, no artificial additives. The same craft, purified.", tag:"Artisan Craft" },
          ].map((i) => (
            <div className="ing-card reveal" key={i.n}>
              <div className="ing-number">{i.n}</div>
              <h3 className="ing-name">{i.name}</h3>
              <p className="ing-desc">{i.desc}</p>
              <span className="ing-tag">{i.tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="shop" id="shop">
        <div className="reveal">
          <div className="section-label">The Collection</div>
          <h2 className="section-heading">Select Your <em>ROSCHA</em></h2>
        </div>
        <div className="shop-grid">
          {PRODUCTS.map((p, idx) => (
            <article className="product-card reveal" key={p.id}>
              <div className="product-img-wrap">
                <img src={p.img} alt={p.name} className="product-img" loading="lazy" />
              </div>
              <div className="product-info">
                <span className="product-badge">{idx === 0 ? "Signature Collection" : "Grand Collection · Connoisseur Box"}</span>
                <h3 className="product-name">{p.name}</h3>
                <p className="product-desc">
                  {idx === 0
                    ? "Perfect for personal mindfulness and daily clean energy."
                    : "Ideal for gifting and sharing a sophisticated culinary experience."}
                </p>
                <div className="product-footer">
                  <div>
                    <div className="product-price">{p.price.toLocaleString("tr-TR")} TL</div>
                    <div className="product-weight">{p.weight}</div>
                  </div>
                  <button
                    className={`add-to-cart ${addedId === p.id ? "added" : ""}`}
                    onClick={() => addToCart(p)}
                  >
                    {addedId === p.id ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="benefits" id="wellness">
        <div className="reveal">
          <div className="section-label">Why ROSCHA</div>
          <h2 className="section-heading">Pleasure with <em>Purpose</em></h2>
        </div>
        <div className="benefits-layout">
          <div className="benefit-list">
            {[
              { n:"01", t:"Zero Added Sugar", d:"Traditional Turkish Delight contains up to 80% refined sugar. ROSCHA contains none — sweetened exclusively with Stevia and Erythritol." },
              { n:"02", t:"Clean, Focused Energy", d:"Matcha's L-theanine and natural caffeine deliver smooth, sustained mental clarity — no spike, no crash." },
              { n:"03", t:"Antioxidant Abundance", d:"Catechins from green tea and flavonoids from Damask rose — a potent pairing that supports cellular health." },
              { n:"04", t:"Naturally Vibrant", d:"The vivid green and blush hues come solely from high-grade botanical extracts. No artificial dyes. No synthetic anything." },
            ].map((b) => (
              <div className="benefit-item reveal" key={b.n}>
                <div className="benefit-num">{b.n}</div>
                <div>
                  <h4 className="benefit-title">{b.t}</h4>
                  <p className="benefit-text">{b.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="benefits-visual">
            <img src={benefitsImg} alt="Matcha ROSCHA piece with rose petal" className="benefits-img" loading="lazy" />
            <p className="benefits-caption">"Where ancient craft meets modern consciousness"</p>
          </div>
        </div>
      </section>

      <section className="experience">
        <div className="reveal" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label">The Ritual</div>
          <h2 className="section-heading">More than a sweet.<br/><em>A new shade of delight.</em></h2>
          <p className="experience-text">
            "Two ancient rituals — Anatolian rose gardens and Uji tea ceremonies — re-imagined into a single cube. Each ROSCHA piece is an invitation to slow down. "
          </p>
          <a href="#shop" className="btn-primary">Begin Your Ritual</a>
        </div>
      </section>

      <footer className="roscha-footer">
        <div>
          <span className="footer-logo">ROSCHA</span>
          <p className="footer-tagline">Turkish Delight with Matcha & Rose. Get rituals, new drops, and quiet notes from our garden.</p>
        </div>
        <div>
          <h5 className="footer-heading">Navigate</h5>
          <ul className="footer-links">
            <li><a href="#story">Our Story</a></li>
            <li><a href="#ingredients">Ingredients</a></li>
            <li><a href="#shop">Shop</a></li>
            <li><a href="#wellness">Wellness</a></li>
          </ul>
        </div>
        <div>
          <h5 className="footer-heading">Information</h5>
          <ul className="footer-links">
            <li><a href="#">Shipping</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Wholesale</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>
        <div>
          <h5 className="footer-heading">Connect</h5>
          <ul className="footer-links">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Pinterest</a></li>
            <li><a href="mailto:contact@roscha.com">contact@roscha.com</a></li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 ROSCHA. All rights reserved.</span>
        <span className="footer-copy">Crafted with intention · Istanbul & Isparta</span>
      </div>

      {/* Cart Drawer */}
      <div className={`cart-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3 className="cart-title">Your Selection</h3>
          <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Close cart">✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">◇</div>
              <p>Your cart is empty</p>
              <p style={{ fontSize: "0.65rem", opacity: 0.7 }}>Discover the ROSCHA collection</p>
            </div>
          ) : (
            cart.map((i) => (
              <div className="cart-item" key={i.id}>
                <div className="cart-item-body">
                  <div className="cart-item-name">{i.name}</div>
                  <div className="cart-item-weight">{i.weight}</div>
                  <div className="cart-item-price">{(i.price * i.qty).toLocaleString("tr-TR")} TL</div>
                  <div className="cart-item-qty">
                    <button className="qty-btn" onClick={() => updateQty(i.id, -1)}>−</button>
                    <span className="qty-num">{i.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(i.id, 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => remove(i.id)}>Remove</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span className="cart-total-label">Total</span>
            <span className="cart-total-price">{totalPrice.toLocaleString("tr-TR")} TL</span>
          </div>
          <button className="checkout-btn" disabled={cart.length === 0}>Complete Order</button>
          <p className="cart-note">Complimentary gift wrapping on all orders</p>
        </div>
      </aside>

      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
    </>
  );
}
