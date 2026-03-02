import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneContainer from './components/Scene';
import {
  ArrowRight, Leaf, Shield, Zap, TrendingUp,
  Wheat, Droplets, Sun, PackageCheck, Award, Eye,
  Snowflake, FileCheck, MapPin, Truck
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

/* ——————————————————————————
   DATA
—————————————————————————— */
const visionItems = [
  { icon: Zap, title: 'Precision Milling', desc: 'State-of-the-art milling technology that preserves nutritional integrity while delivering consistent quality in every batch of wheat we process.' },
  { icon: Shield, title: 'Quality Assurance', desc: 'We select only plump, golden-amber grains with high hardness — ensuring superior protein content, higher water absorption, and softer rotis.' },
  { icon: FileCheck, title: 'FCI Procurement', desc: 'We procure premium wheat directly from the Food Corporation of India through an official government tender process, guaranteeing certified quality.' },
  { icon: Snowflake, title: 'Cold Storage & Supply Chain', desc: 'Our company-owned cold storage facility ensures seamless supply chain management, preserving freshness from procurement to delivery.' },
];

const products = [
  { title: 'Sharbati Wheat Atta', desc: 'Milled from premium Sharbati wheat sourced from Madhya Pradesh — known for its golden hue, natural sweetness, and soft rotis.', tag: 'Flagship', icon: Wheat },
  { title: 'Lokwan Wheat Atta', desc: 'High-protein Lokwan variety from Maharashtra, ideal for chapatis with excellent elasticity and nutritional value.', tag: 'Premium', icon: Sun },
  { title: 'GW 322 Wheat Flour', desc: 'Superior GW 322 variety from Uttar Pradesh, prized for its high water absorption and consistent texture in every batch.', tag: 'Select Grade', icon: PackageCheck },
  { title: 'Fortified Atta Blend', desc: 'Our signature multi-nutrient fortified wheat flour — enriched with iron, folic acid, and vitamins for wholesome daily nutrition.', tag: 'Health+', icon: Droplets },
];

const marqueeText = 'Premium Quality • FCI Certified • Since 2003 • Hojai, Assam • One of the Biggest in Assam • Sharbati • Lokwan • GW 322 • Cold Storage Facility • ';

/* ——————————————————————————
   HOOKS
—————————————————————————— */

/** Animated counter that counts from 0 to `end` when visible */
function useCounter(end, suffix = '', duration = 2) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => setValue(Math.round(obj.val)),
        });
      },
    });

    return () => st.kill();
  }, [end, duration]);

  return { ref, display: `${value}${suffix}` };
}

/** 3D tilt effect on mouse move */
function useTilt(strength = 15) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateX: -y * strength,
      rotateY: x * strength,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' });
  }, []);

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}

/* ——————————————————————————
   SUB-COMPONENTS
—————————————————————————— */

function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div ref={glowRef} className="cursor-glow" />;
}

function GrainOverlay() {
  return <div className="grain-overlay" />;
}

function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 3 + Math.random() * 5,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 10,
    opacity: 0.1 + Math.random() * 0.25,
  }));

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

function MarqueeBanner() {
  return (
    <div className="marquee-banner" aria-hidden="true">
      <div className="marquee-track">
        {[...Array(4)].map((_, i) => (
          <span key={i}>{marqueeText}</span>
        ))}
      </div>
    </div>
  );
}

/* ——————————————————————————
   SECTION COMPONENTS
—————————————————————————— */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="navbar-brand" aria-label="Hojai Food Product homepage">
        <Leaf size={24} />
        Hojai Food Product Pvt. Ltd.
      </a>
      <ul className="navbar-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#vision">Vision</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#established">Established</a></li>
      </ul>
      <button className="navbar-cta">Get In Touch</button>
    </nav>
  );
}

function Hero() {
  const stat1 = useCounter(22, '+');
  const stat2 = useCounter(50, '+');
  const stat3 = useCounter(10, 'K+');
  const stat4 = useCounter(100, '%');

  return (
    <section id="hero" className="section hero" aria-label="Hero banner">
      <div className="hero-content">
        <div className="section-label hero-anim">
          <Wheat size={14} /> One of the Biggest Food Manufacturers in Assam
        </div>
        <h1 className="hero-title hero-anim">
          Select Quality Wheat, <br />
          <span className="highlight">Milled to Perfection</span>
        </h1>
        <p className="hero-desc hero-anim">
          Hojai Food Product Pvt. Ltd. procures premium wheat from Madhya Pradesh, Uttar Pradesh & more through FCI government tenders — and mills it into the finest atta with cutting-edge technology.
        </p>
        <div className="hero-actions hero-anim">
          <button className="btn-primary" id="explore-products-btn">
            Explore Products <ArrowRight size={18} />
          </button>
          <button className="btn-secondary" id="our-story-btn">Our Story</button>
        </div>
        <div className="hero-stats hero-anim">
          <div className="hero-stat">
            <h3 ref={stat1.ref} className="counter">{stat1.display}</h3>
            <p>Years Legacy</p>
          </div>
          <div className="hero-stat">
            <h3 ref={stat2.ref} className="counter">{stat2.display}</h3>
            <p>Products</p>
          </div>
          <div className="hero-stat">
            <h3 ref={stat3.ref} className="counter">{stat3.display}</h3>
            <p>Happy Clients</p>
          </div>
          <div className="hero-stat">
            <h3 ref={stat4.ref} className="counter">{stat4.display}</h3>
            <p>Natural</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section id="vision" className="section vision" aria-label="Our vision">
      <header className="vision-header">
        <div className="section-label" style={{ margin: '0 auto 16px' }}>
          <Eye size={14} /> Our Guiding Principles
        </div>
        <h2 className="section-title">Our Vision</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          To be the most trusted food manufacturer in Northeast India — delivering uncompromising quality through FCI-certified procurement and precision milling.
        </p>
      </header>
      <div className="vision-grid">
        {visionItems.map((item, i) => (
          <article key={i} className="vision-card reveal">
            <div className="vision-card-icon">
              <item.icon size={28} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, index }) {
  const tilt = useTilt(12);
  return (
    <div className="tilt-card reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
      <article
        className="product-card"
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
      >
        <div className="product-card-img">
          <product.icon size={48} />
        </div>
        <div className="product-card-body">
          <h3>{product.title}</h3>
          <p>{product.desc}</p>
          <span className="product-card-tag">{product.tag}</span>
        </div>
        <button className="product-card-btn" id={`product-btn-${index}`}>View Details</button>
      </article>
    </div>
  );
}

function Products() {
  return (
    <section id="products" className="section products" aria-label="Our products">
      <header className="products-header">
        <div className="section-label" style={{ margin: '0 auto 16px' }}>
          <PackageCheck size={14} /> What We Offer
        </div>
        <h2 className="section-title">Our Products</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          A curated range of premium food products — processed with care, packed with goodness.
        </p>
      </header>
      <div className="products-grid">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}

function Established() {
  const statYear = useCounter(2003, '', 2.5);
  const statStates = useCounter(5, '+');
  const statYears = useCounter(22, '+');

  return (
    <section id="established" className="section established" aria-label="Company history">
      <div className="established-grid">
        <div className="established-text reveal">
          <div className="section-label">
            <Award size={14} /> Established 23rd December 2003
          </div>
          <h2>
            Two Decades of <br />
            <span className="highlight">Trusted Quality</span>
          </h2>
          <p>
            Founded on 23rd December 2003, Hojai Food Product Pvt. Ltd. has grown into one of the biggest food manufacturing companies in Assam. We procure select-quality wheat from Madhya Pradesh, Uttar Pradesh, and other prime regions through FCI government tenders — choosing only plump, golden-amber grains like Sharbati, Lokwan, and GW 322 with high hardness for superior protein content and softer rotis. Our company also owns a dedicated cold storage facility, essential for seamless supply chain management.
          </p>
          <div className="established-stats">
            <div className="established-stat">
              <h3 ref={statYear.ref} className="counter">{statYear.display}</h3>
              <p>Founded</p>
            </div>
            <div className="established-stat">
              <h3 ref={statStates.ref} className="counter">{statStates.display}</h3>
              <p>Source States</p>
            </div>
            <div className="established-stat">
              <h3 ref={statYears.ref} className="counter">{statYears.display}</h3>
              <p>Years</p>
            </div>
          </div>
        </div>
        <div className="established-visual reveal">
          <div className="timeline-badge">
            <div className="year">2003</div>
            <div className="label">EST. 23 DEC • Hojai, Assam</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div>
        <div className="footer-brand">Hojai Food Product Pvt. Ltd.</div>
        <p className="footer-copy">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
      <ul className="footer-links">
        <li><a href="#vision">Vision</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#established">About</a></li>
      </ul>
    </footer>
  );
}

/* ——————————————————————————
   APP
—————————————————————————— */
function App() {
  const mainRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance with stagger */
      gsap.from('.hero-anim', {
        y: 80,
        opacity: 0,
        duration: 1.3,
        ease: 'power4.out',
        stagger: 0.15,
      });

      /* Scroll-triggered reveals with stagger per grid */
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      /* Section title scale-in */
      gsap.utils.toArray('.section-title').forEach((el) => {
        gsap.from(el, {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      /* Parallax on established visual */
      gsap.to('.established-visual', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.established',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      /* Navbar brand subtle entrance */
      gsap.from('.navbar', {
        y: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      /* Marquee slight parallax */
      gsap.to('.marquee-banner', {
        backgroundPosition: '200% center',
        ease: 'none',
        scrollTrigger: {
          trigger: '.marquee-banner',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef}>
      <CursorGlow />
      <GrainOverlay />
      <Particles />
      <SceneContainer />
      <Navbar />
      <Hero />
      <MarqueeBanner />
      <Vision />
      <Products />
      <Established />
      <Footer />
    </main>
  );
}

export default App;
