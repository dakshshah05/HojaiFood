import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneContainer from './components/Scene';
import { ArrowRight, Leaf, Shield, Zap, TrendingUp, Wheat, Factory, Droplets, Sun, PackageCheck, Award, Users } from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

/* ——— DATA ——— */
const visionItems = [
  {
    icon: Zap,
    title: 'Precision Processing',
    desc: 'State-of-the-art milling technology that preserves nutritional integrity while delivering consistent quality in every batch.',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    desc: 'End-to-end quality control from farm gate to finished product, certified by international food safety standards.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Sourcing',
    desc: 'Direct partnerships with local farmers ensuring fair trade practices and environmentally responsible agriculture.',
  },
];

const products = [
  {
    title: 'Premium Rice Flour',
    desc: 'Ultra-fine ground rice flour perfect for traditional and modern culinary applications.',
    tag: 'Best Seller',
    icon: Wheat,
  },
  {
    title: 'Organic Mustard Oil',
    desc: 'Cold-pressed, pure mustard oil sourced from the finest seeds of Assam\'s fertile lands.',
    tag: 'Organic',
    icon: Droplets,
  },
  {
    title: 'Multi-Grain Atta',
    desc: 'A power blend of 7 grains, stone-ground for maximum fiber and nutrition retention.',
    tag: 'Health+',
    icon: Sun,
  },
  {
    title: 'Golden Turmeric Powder',
    desc: 'High-curcumin turmeric, naturally dried and finely milled for vibrant color and potency.',
    tag: 'Pure',
    icon: PackageCheck,
  },
];

/* ——— COMPONENTS ——— */

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Leaf size={24} />
        Hojai Food Product Pvt. Ltd.
      </div>
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
  return (
    <section id="hero" className="section hero">
      <div className="hero-content">
        <div className="section-label">
          <Leaf size={14} /> From Farm to Table, Excellence in Every Grain
        </div>
        <h1 className="hero-title hero-anim">
          Nourishing Lives <br />
          with <span className="highlight">Pure Goodness</span>
        </h1>
        <p className="hero-desc hero-anim">
          Hojai Food Product Pvt. Ltd. brings you premium, ethically sourced food products — processed with cutting-edge technology and rooted in tradition.
        </p>
        <div className="hero-actions hero-anim">
          <button className="btn-primary">
            Explore Products <ArrowRight size={18} />
          </button>
          <button className="btn-secondary">Our Story</button>
        </div>
        <div className="hero-stats hero-anim">
          <div className="hero-stat">
            <h3>15+</h3>
            <p>Years Legacy</p>
          </div>
          <div className="hero-stat">
            <h3>50+</h3>
            <p>Products</p>
          </div>
          <div className="hero-stat">
            <h3>10K+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="hero-stat">
            <h3>100%</h3>
            <p>Natural</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section id="vision" className="section vision">
      <div className="vision-header">
        <div className="section-label" style={{ margin: '0 auto 16px' }}>
          <TrendingUp size={14} /> Our Guiding Principles
        </div>
        <h2 className="section-title">Our Vision</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          We believe in building a food ecosystem that is transparent, sustainable, and deeply connected to the communities we serve.
        </p>
      </div>
      <div className="vision-grid">
        {visionItems.map((item, i) => (
          <div key={i} className="vision-card reveal">
            <div className="vision-card-icon">
              <item.icon size={28} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="section products">
      <div className="products-header">
        <div className="section-label" style={{ margin: '0 auto 16px' }}>
          <PackageCheck size={14} /> What We Offer
        </div>
        <h2 className="section-title">Our Products</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          A curated range of premium food products — processed with care, packed with goodness.
        </p>
      </div>
      <div className="products-grid">
        {products.map((product, i) => (
          <div key={i} className="product-card reveal">
            <div className="product-card-img">
              <product.icon size={48} />
            </div>
            <div className="product-card-body">
              <h3>{product.title}</h3>
              <p>{product.desc}</p>
              <span className="product-card-tag">{product.tag}</span>
            </div>
            <button className="product-card-btn">View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Established() {
  return (
    <section id="established" className="section established">
      <div className="established-grid">
        <div className="established-text reveal">
          <div className="section-label">
            <Award size={14} /> Our Heritage
          </div>
          <h2>
            Tradition Meets <br />
            <span className="highlight">Innovation</span>
          </h2>
          <p>
            Since its inception, Hojai Food Product Pvt. Ltd. has been committed to delivering the finest agro-based food products from the heart of Assam to tables across the nation. Our state-of-the-art milling facilities blend ancestral knowledge with modern precision.
          </p>
          <div className="established-stats">
            <div className="established-stat">
              <h3>2009</h3>
              <p>Founded</p>
            </div>
            <div className="established-stat">
              <h3>200+</h3>
              <p>Farmers</p>
            </div>
            <div className="established-stat">
              <h3>15+</h3>
              <p>Years</p>
            </div>
          </div>
        </div>
        <div className="established-visual reveal">
          <div className="timeline-badge">
            <div className="year">2009</div>
            <div className="label">EST. Hojai, Assam</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Hojai Food Product Pvt. Ltd. All rights reserved.</p>
    </footer>
  );
}

/* ——— APP ——— */
function App() {
  const mainRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.from('.hero-anim', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.18,
      });

      /* Global reveal-on-scroll */
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
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
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.established',
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
      <SceneContainer />
      <Navbar />
      <Hero />
      <Vision />
      <Products />
      <Established />
      <Footer />
    </main>
  );
}

export default App;
