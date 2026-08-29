import React, { useLayoutEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import Product3DViewer from '../components/Product3DViewer';

const productsDatabase = {
  'walkie-talkie-pro': {
    id: 'walkie-talkie-pro',
    name: 'Walkie-Talkie Pro X',
    price: 14999,
    category: 'Communication Devices',
    description: 'The ultimate industrial communication device. Engineered with precision mechanical components, long-lasting battery, and extreme environmental resistance. Designed for real-world heavy duty applications.',
    modelPath: '/walkie-talkie/walkie_talkie__3d_communication_device.glb',
    specs: [
      { label: 'Range', value: '15 km' },
      { label: 'Battery Life', value: '48 Hours' },
      { label: 'Water Resistance', value: 'IP68' },
      { label: 'Weight', value: '350g' }
    ]
  },
  'cc-camera': {
    id: 'cc-camera',
    name: 'Industrial CC Camera',
    price: 8499,
    category: 'Security Systems',
    description: 'High-definition industrial security camera. Features infrared night vision, extreme weather resistance, and 4K continuous recording capabilities.',
    modelPath: '/cc camera/camera_11.glb',
    specs: [
      { label: 'Resolution', value: '4K Ultra HD' },
      { label: 'Night Vision', value: 'Up to 30m' },
      { label: 'Weather Rating', value: 'IP67' },
      { label: 'Connectivity', value: 'PoE / Wi-Fi 6' }
    ]
  },
  'poc-lte-radio': {
    id: 'poc-lte-radio',
    name: 'PoC LTE Radio',
    price: 18999,
    category: 'Communication Devices',
    description: 'Next-generation Push-to-Talk over Cellular (PoC) radio. Offers global coverage using 4G/LTE networks, advanced GPS tracking, and seamless fleet communication without the limitations of traditional RF range.',
    modelPath: '/poc-lte/handheld_portable_radio__walkie_talkie.glb',
    specs: [
      { label: 'Network', value: '4G LTE / Wi-Fi' },
      { label: 'Coverage', value: 'Global (Cellular)' },
      { label: 'Location Tracking', value: 'GPS / GLONASS' },
      { label: 'Battery Life', value: '72 Hours' }
    ]
  }
};

const ProductDetails = () => {
  const { slug } = useParams();

  const containerRef = useRef(null);
  
  const product = productsDatabase[slug] || productsDatabase['walkie-talkie-pro'];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.pd-reveal', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [slug]);

  return (
    <div className="about-editorial-page" ref={containerRef} style={{ minHeight: '100vh', display: 'flex' }}>
      
      {/* Left Side: 3D Viewer */}
      <div style={{ flex: 1.2, backgroundColor: '#f5f5f5', position: 'sticky', top: 0, height: '100vh', borderRight: '1px solid #e0e0e0', zIndex: 1, paddingTop: '90px', boxSizing: 'border-box' }}>
        <div style={{ position: 'absolute', top: '120px', left: '3rem', zIndex: 10 }}>
          <Link to="/products" className="pd-reveal" style={{ 
            fontFamily: '"Courier New", Courier, monospace', 
            fontSize: '0.8rem', 
            textDecoration: 'none', 
            color: '#111',
            border: '1px solid #111',
            padding: '0.4rem 0.8rem',
            borderRadius: '4px'
          }}>
            ← BACK TO CATALOGUE
          </Link>
        </div>
        
        {product.modelPath ? (
          <Product3DViewer modelPath={product.modelPath} />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <p style={{ fontFamily: '"Courier New", Courier, monospace' }}>3D Asset Unavailable</p>
          </div>
        )}
      </div>

      {/* Right Side: Editorial Information */}
      <div style={{ flex: 1, padding: '120px 4rem 4rem 4rem', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
        
        <div className="pd-reveal" style={{ 
          fontFamily: '"Courier New", Courier, monospace', 
          color: '#888', 
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          marginBottom: '1rem' 
        }}>
          {product.category}
        </div>
        
        <h1 className="editorial-headline pd-reveal" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '2rem' }}>
          {product.name}
        </h1>
        
        {/* Price removed */}

        <p className="editorial-paragraph pd-reveal" style={{ marginBottom: '4rem', maxWidth: '90%' }}>
          {product.description}
        </p>

        <div className="pd-reveal" style={{ marginBottom: '4rem' }}>
          <div style={{ fontFamily: '"Syne", sans-serif', fontWeight: '700', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            TECHNICAL SPECIFICATIONS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {product.specs.map((spec, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                borderBottom: '1px solid #e0e0e0',
                paddingBottom: '0.8rem',
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.95rem'
              }}>
                <span style={{ color: '#666' }}>{spec.label}</span>
                <span style={{ fontWeight: '600', color: '#111' }}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pd-reveal" style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <Link 
            to="/contact"
            style={{
              display: 'block',
              textAlign: 'center',
              textDecoration: 'none',
              width: '100%',
              backgroundColor: '#111',
              color: '#fff',
              border: 'none',
              padding: '1.2rem',
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              boxSizing: 'border-box'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#D2232A'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#111'}
          >
            ENQUIRE NOW
          </Link>
        </div>

      </div>

    </div>
  );
};

export default ProductDetails;
