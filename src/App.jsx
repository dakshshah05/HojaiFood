import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneContainer from './components/Scene';
import {
  ArrowRight, Leaf, Shield, Zap, Eye,
  Wheat, Droplets, Sun, PackageCheck, Award,
  Snowflake, FileCheck, Factory, Cog, Truck,
  CheckCircle, Star, Gem, Layers, X,
  Phone, Mail, MapPin, Clock, ChevronDown
} from 'lucide-react';
import './App.css';

/* Asset images */
import attaImg from './assets/atta.jpeg';
import sujiImg from './assets/suji.jpeg';
import wheatImg from './assets/wheat.jpeg';
import wheatBranImg from './assets/wheatBran.jpeg';

gsap.registerPlugin(ScrollTrigger);

/* ——————————————————————————
   HELPER: Smooth scroll to section
—————————————————————————— */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ——————————————————————————
   DATA
—————————————————————————— */

const visionItems = [
  { icon: Zap, title: 'Precision Milling', desc: 'State-of-the-art Roller Mill and traditional Chakki Mill technology that preserves nutritional integrity while delivering consistent quality in every batch.' },
  { icon: Shield, title: 'Quality First', desc: 'We select only plump, golden-amber grains with high hardness — ensuring superior protein content, higher water absorption, and softer rotis.' },
  { icon: FileCheck, title: 'FCI Procurement', desc: 'We procure premium wheat directly from the Food Corporation of India through a transparent government tender process, guaranteeing certified quality.' },
  { icon: Snowflake, title: 'Cold Storage & Logistics', desc: 'Our dedicated cold storage facility ensures seamless supply chain management — preserving freshness, reducing wastage, and enabling timely delivery.' },
];

const chakkiProducts = [
  {
    title: 'Maa Bhog Chakki Atta',
    desc: 'Our flagship product — stone-ground using traditional Chakki Mill to retain natural nutrients, fiber, aroma, and taste. Ideal for soft, nutritious rotis.',
    longDesc: 'Maa Bhog Chakki Atta is produced using the traditional stone-grinding (Chakki) process, which preserves the wheat\'s natural bran, germ, fiber, and nutrients. Unlike roller-milled flour, Chakki Atta retains the wheat\'s original aroma and taste, resulting in softer, more nutritious rotis and chapatis. Made from carefully selected Sharbati, Lokwan, and GW 322 wheat procured through FCI tenders from Madhya Pradesh and Uttar Pradesh.',
    tag: 'Flagship',
    icon: Wheat,
    features: ['Stone-ground for natural nutrition', 'Retains fiber, aroma & taste', 'Softer rotis every time', 'Premium FCI-procured wheat'],
  },
];

const rollerProducts = [
  {
    title: 'Maida',
    desc: 'Finely refined wheat flour with smooth texture and excellent binding properties — perfect for bread, cakes, biscuits, and pastries.',
    longDesc: 'Maida is a finely milled and refined wheat flour produced at our Maa Durga Roller Flour Mill. It has a smooth, silky texture and excellent binding properties, making it ideal for bakery products such as bread, cakes, biscuits, pastries, and naan. Produced under strict quality control for purity and consistency.',
    tag: 'Bakery Grade', icon: Layers, image: wheatImg,
    features: ['Smooth, silky texture', 'Excellent binding properties', 'Ideal for bakery products', 'Strict quality control'],
  },
  {
    title: 'Suji (Semolina)',
    desc: 'Coarse wheat product valued for its granular texture — ideal for upma, halwa, pasta, and traditional Indian sweets.',
    longDesc: 'Suji (Semolina) is a coarse, granular wheat product manufactured at the Maa Durga Roller Flour Mill. It is widely used for preparing upma, halwa, idli, pasta, and traditional Indian sweets. Valued for its nutritional content, granular texture, and versatile culinary applications.',
    tag: 'Versatile', icon: Sun, image: sujiImg,
    features: ['Granular texture', 'High nutritional value', 'Versatile cooking uses', 'Uniform grain size'],
  },
  {
    title: 'Superfine Atta',
    desc: 'Finely ground wheat flour with a smooth texture, ideal for making soft, high-quality rotis and chapatis every time.',
    longDesc: 'Superfine Atta is a finely ground wheat flour produced using advanced roller milling technology. Its smooth texture ensures soft, high-quality rotis and chapatis with every use. Manufactured under the Maa Brand with consistent quality standards.',
    tag: 'Premium', icon: Star, image: attaImg,
    features: ['Extra fine grind', 'Smooth texture', 'Soft rotis guaranteed', 'Consistent quality'],
  },
  {
    title: 'Special Atta',
    desc: 'Premium-quality wheat flour specially processed to ensure better taste, softness, and enhanced nutritional value.',
    longDesc: 'Special Atta is a premium-quality wheat flour that undergoes specialized processing at our Maa Durga Roller Flour Mill. This extra processing ensures enhanced taste, superior softness, and better nutritional value compared to standard atta. It is the preferred choice for health-conscious consumers.',
    tag: 'Special', icon: Gem, image: attaImg,
    features: ['Specialized processing', 'Enhanced nutrition', 'Superior softness', 'Premium wheat selection'],
  },
  {
    title: 'Wheat Bran',
    desc: 'The nutrient-rich outer layer of wheat grain, high in dietary fiber — used for animal feed and health-focused food products.',
    longDesc: 'Wheat Bran is the nutrient-rich outer layer of the wheat grain, separated during the milling process. It is exceptionally high in dietary fiber and is used both as animal feed and as an ingredient in health-focused food products. A valuable by-product of our precision milling process.',
    tag: 'Fiber Rich', icon: Leaf, image: wheatBranImg,
    features: ['High dietary fiber', 'Animal feed grade', 'Health food ingredient', 'Natural by-product'],
  },
];

const faqData = [
  { q: 'What is Hojai Food Product Pvt. Ltd.?', a: 'Hojai Food Product Pvt. Ltd. is one of the biggest food manufacturing companies in Assam, established on 23rd December 2003. We specialize in producing premium wheat-based products including Maa Bhog Chakki Atta and Maa Brand roller mill products.' },
  { q: 'Where does the company source its wheat?', a: 'We procure premium quality wheat from major wheat-producing states such as Madhya Pradesh and Uttar Pradesh through official tenders from the Food Corporation of India (FCI). No farmers are involved in the direct purchasing process.' },
  { q: 'What wheat varieties does the company use?', a: 'We select top varieties including Sharbati, Lokwan, and GW 322 — known for plump, golden-amber grains with high hardness, superior protein content, and higher water absorption that produces softer rotis.' },
  { q: 'What products does the company manufacture?', a: 'Our flagship product is Maa Bhog Chakki Atta (traditional stone-ground). Through our Maa Durga Roller Flour Mill, we also produce Maida, Suji (Semolina), Superfine Atta, Special Atta, and Wheat Bran under the Maa Brand.' },
  { q: 'Does the company have cold storage facilities?', a: 'Yes, the company owns a dedicated cold storage facility that plays a crucial role in supply chain management — preserving raw materials and finished products, reducing wastage, and ensuring timely delivery.' },
  { q: 'Where is the company located?', a: 'Hojai Food Product Pvt. Ltd. is based in Hojai, Assam, India.' },
];

const marqueeText = 'Maa Bhog Chakki Atta • FCI Certified • Since 2003 • Hojai, Assam • One of the Biggest in Assam • Sharbati • Lokwan • GW 322 • Maa Durga Roller Flour Mill • Cold Storage Facility • ';

/* ——————————————————————————
   HOOKS
—————————————————————————— */

function useCounter(end, suffix = '', duration = 2) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.to(obj, { val: end, duration, ease: 'power2.out', onUpdate: () => setValue(Math.round(obj.val)) });
      },
    });
    return () => st.kill();
  }, [end, duration]);

  return { ref, display: `${value}${suffix}` };
}

function useTilt(strength = 15) {
  const ref = useRef(null);
  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, { rotateX: -y * strength, rotateY: x * strength, duration: 0.4, ease: 'power2.out' });
  }, [strength]);
  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' });
  }, []);
  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}

/* ——————————————————————————
   UTILITY SUB-COMPONENTS
—————————————————————————— */

function CursorGlow() {
  const glowRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) gsap.to(glowRef.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={glowRef} className="cursor-glow" />;
}

function GrainOverlay() { return <div className="grain-overlay" />; }

function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i, left: `${Math.random() * 100}%`, size: 3 + Math.random() * 5,
    duration: 8 + Math.random() * 12, delay: Math.random() * 10, opacity: 0.1 + Math.random() * 0.25,
  }));
  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div key={p.id} className="particle" style={{ left: p.left, width: p.size, height: p.size, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`, opacity: p.opacity }} />
      ))}
    </div>
  );
}

function MarqueeBanner() {
  return (
    <div className="marquee-banner" aria-hidden="true">
      <div className="marquee-track">
        {[...Array(4)].map((_, i) => <span key={i}>{marqueeText}</span>)}
      </div>
    </div>
  );
}

/* ——————————————————————————
   PRODUCT DETAIL MODAL
—————————————————————————— */
function ProductModal({ product, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleEsc); };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Details for ${product.title}`}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close dialog"><X size={24} /></button>
        <div className="modal-header">
          <div className="modal-icon"><product.icon size={40} /></div>
          <div>
            <h3>{product.title}</h3>
            <span className="product-card-tag">{product.tag}</span>
          </div>
        </div>
        <p className="modal-desc">{product.longDesc}</p>
        {product.features && (
          <ul className="modal-features">
            {product.features.map((f, i) => (
              <li key={i}><CheckCircle size={16} className="wheat-check" /><span>{f}</span></li>
            ))}
          </ul>
        )}
        <button className="btn-primary modal-cta" onClick={() => { onClose(); scrollTo('contact'); }}>
          Enquire Now <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* ——————————————————————————
   FAQ ACCORDION
—————————————————————————— */
function FaqItem({ faq, isOpen, onClick }) {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question" onClick={onClick} aria-expanded={isOpen}>
        <span>{faq.q}</span>
        <ChevronDown size={20} className={`faq-chevron ${isOpen ? 'rotated' : ''}`} />
      </button>
      <div className="faq-answer" style={{ maxHeight: isOpen ? '300px' : '0' }}>
        <p>{faq.a}</p>
      </div>
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section id="faq" className="section faq-section" aria-label="Frequently asked questions">
      <header className="products-header">
        <div className="section-label" style={{ margin: '0 auto 16px' }}>
          <CheckCircle size={14} /> Common Questions
        </div>
        <h2 className="section-title">Frequently Asked Questions</h2>
      </header>
      <div className="faq-list">
        {faqData.map((faq, i) => (
          <FaqItem key={i} faq={faq} isOpen={openIndex === i} onClick={() => setOpenIndex(openIndex === i ? null : i)} />
        ))}
      </div>
    </section>
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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation">
      <a href="#hero" className="navbar-brand" aria-label="Hojai Food Product homepage" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
        <Wheat size={24} />
        Hojai Food Product Pvt. Ltd.
      </a>
      <ul className="navbar-links">
        {[
          ['hero', 'Home'], ['vision', 'Vision'], ['products', 'Products'],
          ['manufacturing', 'Manufacturing'], ['established', 'About'], ['contact', 'Contact'],
        ].map(([id, label]) => (
          <li key={id}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a></li>
        ))}
      </ul>
      <button className="navbar-cta" onClick={() => scrollTo('contact')} id="nav-contact-btn">Get In Touch</button>
    </nav>
  );
}

function Hero() {
  const stat1 = useCounter(22, '+');
  const stat2 = useCounter(2003, '');
  const stat3 = useCounter(10, 'K+');
  const stat4 = useCounter(100, '%');

  return (
    <section id="hero" className="section hero" aria-label="Hero banner">
      <div className="hero-content">
        <div className="section-label hero-anim">
          <Award size={14} /> One of the Biggest Food Manufacturers in Assam
        </div>
        <h1 className="hero-title hero-anim">
          Select Quality Wheat, <br />
          <span className="highlight">Milled to Perfection</span>
        </h1>
        <p className="hero-desc hero-anim">
          Hojai Food Product Pvt. Ltd. procures premium wheat from Madhya Pradesh, Uttar Pradesh & more through FCI government tenders — milling it into the finest Maa Bhog Chakki Atta and Maa Brand roller mill products.
        </p>
        <div className="hero-actions hero-anim">
          <button className="btn-primary" id="explore-products-btn" onClick={() => scrollTo('products')}>
            Explore Products <ArrowRight size={18} />
          </button>
          <button className="btn-secondary" id="our-story-btn" onClick={() => scrollTo('established')}>
            Our Story
          </button>
        </div>
        <div className="hero-stats hero-anim">
          {[
            [stat1, 'Years Legacy'], [stat2, 'Est. Year'], [stat3, 'Happy Clients'], [stat4, '% Natural'],
          ].map(([stat, label], i) => (
            <div className="hero-stat" key={i}>
              <h3 ref={stat.ref} className="counter">{stat.display}</h3>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section id="vision" className="section vision" aria-label="Our vision and guiding principles">
      <header className="vision-header">
        <div className="section-label" style={{ margin: '0 auto 16px' }}>
          <Eye size={14} /> Our Guiding Principles
        </div>
        <h2 className="section-title">Our Vision</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          To be the most trusted food manufacturer in Northeast India — delivering uncompromising quality through FCI-certified procurement, precision milling, and integrated cold chain logistics.
        </p>
      </header>
      <div className="vision-grid">
        {visionItems.map((item, i) => (
          <article key={i} className="vision-card reveal" tabIndex={0} aria-label={item.title}>
            <div className="vision-card-icon"><item.icon size={28} /></div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WheatQuality() {
  const features = [
    'Plump, golden-amber grains with high hardness',
    'Superior protein content & higher water absorption',
    'Uniform grain size with natural sheen',
    'Free from impurities, excess moisture & broken kernels',
    'Softer, better-textured rotis every time',
  ];
  return (
    <section id="wheat-quality" className="section wheat-quality" aria-label="Wheat selection quality">
      <div className="wheat-quality-grid">
        <div className="wheat-quality-text reveal">
          <div className="section-label"><CheckCircle size={14} /> Our Selection Process</div>
          <h2 className="section-title">Select Premium Wheat</h2>
          <p className="section-subtitle">
            We carefully choose only the finest wheat varieties — Sharbati, Lokwan, and GW 322 — sourced from Madhya Pradesh, Uttar Pradesh, and other prime wheat-producing states, ensuring every grain meets our exacting standards.
          </p>
          <ul className="wheat-features">
            {features.map((f, i) => (
              <li key={i} className="reveal"><CheckCircle size={16} className="wheat-check" /><span>{f}</span></li>
            ))}
          </ul>
        </div>
        <div className="wheat-varieties reveal">
          {['Sharbati', 'Lokwan', 'GW 322'].map((v, i) => (
            <div key={i} className="variety-badge" tabIndex={0} aria-label={`${v} wheat variety`}>
              <Wheat size={20} /><span>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index, onViewDetails }) {
  const tilt = useTilt(12);
  return (
    <div className="tilt-card reveal" style={{ transitionDelay: `${index * 0.08}s` }}>
      <article className="product-card" ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}>
        <div className="product-card-img">
          {product.image ? (
            <img src={product.image} alt={product.title} loading="lazy" />
          ) : (
            <product.icon size={48} />
          )}
        </div>
        <div className="product-card-body">
          <h3>{product.title}</h3>
          <p>{product.desc}</p>
          <span className="product-card-tag">{product.tag}</span>
        </div>
        <button className="product-card-btn" id={`product-btn-${index}`} onClick={() => onViewDetails(product)}>
          View Details
        </button>
      </article>
    </div>
  );
}

function Products({ onViewDetails }) {
  return (
    <section id="products" className="section products" aria-label="Our products catalogue">
      <header className="products-header">
        <div className="section-label" style={{ margin: '0 auto 16px' }}><Star size={14} /> Our Flagship Product</div>
        <h2 className="section-title">Maa Bhog Chakki Atta</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Stone-ground using traditional Chakki Mill technology — retaining the wheat's natural nutrients, fiber, aroma, and taste for softer, more nutritious rotis.
        </p>
      </header>
      <div className="flagship-card-wrapper">
        {chakkiProducts.map((product, i) => (
          <div key={i} className="flagship-card reveal" onClick={() => onViewDetails(product)} style={{ cursor: 'pointer' }} role="button" tabIndex={0} aria-label={`View details for ${product.title}`}>
            <div className="flagship-icon"><product.icon size={56} /></div>
            <div className="flagship-content">
              <h3>{product.title}</h3>
              <p>{product.desc}</p>
              <span className="product-card-tag">{product.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <header className="products-header" style={{ marginTop: '100px' }}>
        <div className="section-label" style={{ margin: '0 auto 16px' }}><Factory size={14} /> Maa Durga Roller Flour Mill</div>
        <h2 className="section-title">Roller Mill Products</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          A complete range of high-quality wheat-based products under the trusted Maa Brand — manufactured using advanced roller milling technology.
        </p>
      </header>
      <div className="products-grid roller-grid">
        {rollerProducts.map((product, i) => (
          <ProductCard key={i} product={product} index={i} onViewDetails={onViewDetails} />
        ))}
      </div>
    </section>
  );
}

function Manufacturing() {
  return (
    <section id="manufacturing" className="section manufacturing" aria-label="Manufacturing facilities">
      <header className="products-header">
        <div className="section-label" style={{ margin: '0 auto 16px' }}><Cog size={14} /> Our Manufacturing</div>
        <h2 className="section-title">Two Mills, One Standard</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Combining traditional stone-grinding wisdom with modern roller milling technology to deliver both authenticity and efficiency.
        </p>
      </header>
      <div className="mills-grid">
        <article className="mill-card reveal" onClick={() => scrollTo('products')} style={{ cursor: 'pointer' }} role="button" tabIndex={0}>
          <div className="mill-card-header chakki-header"><Cog size={40} /><h3>Chakki Mill</h3></div>
          <div className="mill-card-body">
            <p>Our Chakki Mill follows the traditional stone-grinding process, which retains the wheat's natural nutrients, fiber, aroma, and taste — producing softer and more nutritious atta ideal for everyday consumption.</p>
            <div className="mill-product-tag">→ Maa Bhog Chakki Atta</div>
          </div>
        </article>
        <article className="mill-card reveal" onClick={() => scrollTo('products')} style={{ cursor: 'pointer' }} role="button" tabIndex={0}>
          <div className="mill-card-header roller-header"><Factory size={40} /><h3>Roller Mill</h3></div>
          <div className="mill-card-body">
            <p>The Maa Durga Roller Flour Mill uses modern technology ensuring uniform grinding, high efficiency, and large-scale production — manufacturing Maida, Suji, Superfine Atta, Special Atta, and Wheat Bran.</p>
            <div className="mill-product-tag">→ Maa Brand Products</div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Established() {
  const statYear = useCounter(2003, '', 2.5);
  const statStates = useCounter(5, '+');
  const statYears = useCounter(22, '+');

  return (
    <section id="established" className="section established" aria-label="Company history and heritage">
      <div className="established-grid">
        <div className="established-text reveal">
          <div className="section-label"><Award size={14} /> Established 23rd December 2003</div>
          <h2>Two Decades of <br /><span className="highlight">Trusted Quality</span></h2>
          <p>Founded on 23rd December 2003, Hojai Food Product Pvt. Ltd. has grown into one of the biggest food manufacturing companies in Assam. We procure select-quality wheat from Madhya Pradesh, Uttar Pradesh, and other prime regions through FCI government tenders — choosing only plump, golden-amber grains like Sharbati, Lokwan, and GW 322.</p>
          <p style={{ marginTop: '16px' }}>With our Chakki Mill and Roller Mill (Maa Durga), a dedicated cold storage facility, and a robust distribution network, we deliver consistent quality across Northeast India. Our strong procurement system, strict quality control, and strategic sourcing have made us a leading and trusted name in the food industry.</p>
          <div className="established-stats">
            {[
              [statYear, 'Founded'], [statStates, 'Source States'], [statYears, 'Years'],
            ].map(([stat, label], i) => (
              <div className="established-stat" key={i}>
                <h3 ref={stat.ref} className="counter">{stat.display}</h3>
                <p>{label}</p>
              </div>
            ))}
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

function Contact() {
  return (
    <section id="contact" className="section contact" aria-label="Contact information">
      <header className="products-header">
        <div className="section-label" style={{ margin: '0 auto 16px' }}><Mail size={14} /> Reach Out</div>
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Have questions about our products or interested in becoming a distributor? We'd love to hear from you.
        </p>
      </header>
      <div className="contact-grid">
        <a href="tel:+919999999999" className="contact-card reveal" id="contact-phone">
          <Phone size={28} />
          <h3>Call Us</h3>
          <p>+91 99999 99999</p>
        </a>
        <a href="mailto:info@hojaifood.com" className="contact-card reveal" id="contact-email">
          <Mail size={28} />
          <h3>Email Us</h3>
          <p>info@hojaifood.com</p>
        </a>
        <div className="contact-card reveal" id="contact-address">
          <MapPin size={28} />
          <h3>Visit Us</h3>
          <p>Hojai, Assam, India</p>
        </div>
        <div className="contact-card reveal" id="contact-hours">
          <Clock size={28} />
          <h3>Working Hours</h3>
          <p>Mon – Sat, 9 AM – 6 PM</p>
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
        <p className="footer-copy">© {new Date().getFullYear()} All rights reserved. Hojai, Assam, India.</p>
      </div>
      <ul className="footer-links">
        {[
          ['vision', 'Vision'], ['products', 'Products'], ['manufacturing', 'Manufacturing'],
          ['established', 'About'], ['faq', 'FAQ'], ['contact', 'Contact'],
        ].map(([id, label]) => (
          <li key={id}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a></li>
        ))}
      </ul>
    </footer>
  );
}

/* ——————————————————————————
   APP
—————————————————————————— */
function App() {
  const mainRef = useRef();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-anim', { y: 80, opacity: 0, duration: 1.3, ease: 'power4.out', stagger: 0.15 });

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        });
      });

      gsap.utils.toArray('.section-title').forEach((el) => {
        gsap.from(el, {
          scale: 0.9, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });

      gsap.to('.established-visual', {
        yPercent: -10, ease: 'none',
        scrollTrigger: { trigger: '.established', start: 'top bottom', end: 'bottom top', scrub: 1 },
      });

      gsap.from('.navbar', { y: -60, opacity: 0, duration: 1, ease: 'power3.out' });
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
      <WheatQuality />
      <Products onViewDetails={setSelectedProduct} />
      <Manufacturing />
      <Established />
      <FaqSection />
      <Contact />
      <Footer />
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </main>
  );
}

export default App;
