import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

const productsData = [
  {
    id: 'walkie-talkie-pro',
    name: 'Walkie-Talkie Pro X',
    price: 14999,
    category: 'Communication Devices',
    description: 'Advanced industrial communication device with extreme durability.',
    image: '/walkie-talkie/walkie-talkie.png'
  },
  {
    id: 'cc-camera',
    name: 'Industrial CC Camera',
    price: 8499,
    category: 'Security Systems',
    description: 'High-definition industrial security camera with night vision and robust casing.',
    image: '/cc camera/cc camera.png'
  },
  {
    id: 'poc-lte-radio',
    name: 'PoC LTE Radio',
    price: 18999,
    category: 'Communication Devices',
    description: 'Next-generation Push-to-Talk over Cellular (PoC) LTE radio for global coverage.',
    image: '/poc-lte/poc-lte radio.png'
  }
];

const Products = () => {
  const containerRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === productsData.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  const [loupeState, setLoupeState] = useState({
    isVisible: false,
    image: '',
    bgX: 50,
    bgY: 50
  });

  const { addToCart } = useCart();

  const handleMouseEnter = (image) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setLoupeState(prev => ({ ...prev, isVisible: true, image }));
    gsap.to('.product-loupe', { scale: 1, opacity: 1, duration: 0.2, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setLoupeState(prev => ({ ...prev, isVisible: false }));
    gsap.to('.product-loupe', { scale: 0.92, opacity: 0, duration: 0.2, ease: 'power2.out' });
  };

  const handleMouseMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const loupeSize = 180;
    const offset = 25;
    
    let targetX = e.clientX + offset;
    let targetY = e.clientY + offset;

    if (targetX + loupeSize > window.innerWidth) {
      targetX = e.clientX - loupeSize - offset;
    }
    if (targetY + loupeSize > window.innerHeight) {
      targetY = e.clientY - loupeSize - offset;
    }

    if (xTo.current && yTo.current) {
      xTo.current(targetX);
      yTo.current(targetY);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    
    // Clamp percentages between 0 and 100
    let xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    let yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    xPercent = Math.max(0, Math.min(100, xPercent));
    yPercent = Math.max(0, Math.min(100, yPercent));

    setLoupeState(prev => ({ ...prev, bgX: xPercent, bgY: yPercent }));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray('.reveal-up');
      
      revealElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      const revealImages = gsap.utils.toArray('.reveal-image');
      revealImages.forEach((el) => {
        gsap.fromTo(el, 
          { scale: 0.95, opacity: 0 }, 
          { 
            scale: 1, 
            opacity: 1, 
            duration: 1, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      xTo.current = gsap.quickTo('.product-loupe', 'x', { duration: 0.15, ease: 'power3' });
      yTo.current = gsap.quickTo('.product-loupe', 'y', { duration: 0.15, ease: 'power3' });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-editorial-page" style={{ paddingTop: '100px' }} ref={containerRef}>
      
      <div style={{ position: 'relative', zIndex: 1, padding: '0 5vw' }}>
        
        {/* HEADER SECTION WITH CAROUSEL */}
        <section className="about-section hero-section" style={{ minHeight: 'auto', paddingBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: '40px' }}>
          
          <div style={{ width: '40%', maxWidth: '500px', flexShrink: 0 }}>
            <div className="section-label reveal-up">HARDWARE</div>
            <h1 className="editorial-headline reveal-up" style={{ display: 'inline-block' }}>OUR<br/>PRODUCTS.</h1>
            <p className="editorial-paragraph reveal-up">
              Precision-engineered hardware available for deployment.
            </p>
          </div>

          <div className="hero-carousel reveal-up" style={{ width: '55%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', overflow: 'hidden' }}>
            
            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontFamily: '"Courier New", Courier, monospace', fontSize: '0.8rem', fontWeight: 'bold' }}>
              <span style={{ color: 'var(--sg-red, #D2232A)' }}>0{currentSlide + 1}</span> 
              <span style={{ color: '#ccc' }}>/</span> 
              <span style={{ color: '#888' }}>0{productsData.length}</span>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                <button 
                  onClick={() => setCurrentSlide(prev => (prev === 0 ? productsData.length - 1 : prev - 1))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#111' }}
                >
                  &larr;
                </button>
                <button 
                  onClick={() => setCurrentSlide(prev => (prev === productsData.length - 1 ? 0 : prev + 1))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#111' }}
                >
                  &rarr;
                </button>
              </div>
            </div>

            {/* Slides Container */}
            <div style={{ display: 'flex', width: '100%', transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)', transform: `translateX(-${currentSlide * 100}%)` }}>
              {productsData.map((product) => (
                <div key={product.id} style={{ width: '100%', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  
                  {/* Image */}
                  <div style={{ width: '250px', height: '250px', flexShrink: 0, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ 
                        maxHeight: '100%', 
                        maxWidth: '100%', 
                        objectFit: 'contain',
                        filter: 'grayscale(100%) contrast(1.1) brightness(0.95)',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  
                  {/* Details */}
                  <div style={{ flex: 1, paddingRight: '2rem' }}>
                    <div style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      {product.category}
                    </div>
                    <h2 style={{ fontFamily: '"Syne", sans-serif', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 0.5rem 0', color: '#111' }}>
                      {product.name}
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                      {product.description}
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Price removed */ }
                      <Link 
                        to="/contact"
                        style={{ 
                          padding: '0.6rem 1.2rem', 
                          backgroundColor: '#111', 
                          color: '#fff', 
                          border: 'none',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          fontFamily: '"Inter", sans-serif',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          transition: 'background-color 0.2s ease',
                          display: 'inline-block'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--sg-red, #D2232A)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#111'}
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* PRODUCTS GRID */}
        <section style={{ borderTop: '1px solid #e0e0e0', paddingTop: '2rem', paddingBottom: '10vh' }}>
          <div className="editorial-product-grid">
            {productsData.map((product) => (
              <div key={product.id} className="product-card-minimal reveal-up">
                
                <Link 
                  to={`/products/${product.id}`} 
                  className="product-image-minimal" 
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => handleMouseEnter(product.image)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                >
                  <img src={product.image} alt={product.name} />
                </Link>
                
                <div className="product-info-minimal">
                  <div className="product-cat">{product.category}</div>
                  <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className="product-name" style={{ cursor: 'pointer' }}>{product.name}</h3>
                  </Link>
                  <p className="product-desc">{product.description}</p>
                  
                  <div className="product-footer">
                    {/* Price removed */}
                    <Link to="/contact" className="product-btn-minimal" style={{ textDecoration: 'none', display: 'inline-block' }}>ENQUIRE</Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* OUTRO */}
        <section className="about-section final-section" style={{ borderTop: '1px solid #e0e0e0', paddingTop: '10vh' }}>
          <div className="section-label reveal-up">SUPPORT</div>
          <h2 className="editorial-headline reveal-up" style={{ margin: '1rem 0', display: 'inline-block' }}>NEED<br/>ASSISTANCE?</h2>
          <div className="final-links reveal-up">
            <a href="/contact">[ CONTACT SALES ]</a>
          </div>
        </section>

      </div>
      
      {/* FLOATING LOUPE COMPONENT */}
      <div 
        className="product-loupe" 
        style={{
          backgroundImage: `url('${loupeState.image}')`,
          backgroundPosition: `${loupeState.bgX}% ${loupeState.bgY}%`,
        }}
      ></div>
      
    </div>
  );
};

export default Products;
