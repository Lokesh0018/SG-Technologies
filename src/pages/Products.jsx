import React, { useLayoutEffect, useRef } from 'react';
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
    image: '/walkie-talkie/walkie talkie.png'
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
  const { addToCart } = useCart();

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-editorial-page" style={{ paddingTop: '15vh' }} ref={containerRef}>
      
      <div style={{ position: 'relative', zIndex: 1, padding: '0 5vw' }}>
        
        {/* HEADER SECTION */}
        <section className="about-section hero-section" style={{ minHeight: 'auto', paddingBottom: '10vh' }}>
          <div className="section-label reveal-up">HARDWARE</div>
          <h1 className="editorial-headline reveal-up" style={{ display: 'inline-block' }}>OUR<br/>PRODUCTS.</h1>
          <p className="editorial-paragraph reveal-up">
            Precision-engineered hardware available for deployment.
          </p>
        </section>

        {/* PRODUCTS GRID */}
        <section style={{ borderTop: '1px solid #e0e0e0', paddingTop: '4rem', paddingBottom: '10vh' }}>
          <div className="editorial-product-grid">
            {productsData.map((product) => (
              <div key={product.id} className="product-card-minimal reveal-up">
                
                <Link to={`/products/${product.id}`} className="product-image-minimal" style={{ cursor: 'pointer' }}>
                  <img src={product.image} alt={product.name} />
                </Link>
                
                <div className="product-info-minimal">
                  <div className="product-cat">{product.category}</div>
                  <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className="product-name" style={{ cursor: 'pointer' }}>{product.name}</h3>
                  </Link>
                  <p className="product-desc">{product.description}</p>
                  
                  <div className="product-footer">
                    <span className="product-price">₹{product.price.toLocaleString()}</span>
                    <button className="product-btn-minimal" onClick={() => handleAddToCart(product)}>ADD TO CART</button>
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
    </div>
  );
};

export default Products;
