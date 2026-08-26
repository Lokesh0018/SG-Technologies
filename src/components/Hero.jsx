import React from 'react';

const Hero = () => {
  return (
    <section className="hero" style={{ pointerEvents: 'none' }}>
      <div className="hero-content" style={{ zIndex: 10, pointerEvents: 'auto' }}>
        <h1 className="hero-headline">
          Communication,<br />Reimagined.
        </h1>
        <p className="hero-description">
          Professional two-way communication engineered for clarity, reliability, and connection wherever work takes you.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary">Pre-order Now</button>
          <button className="btn btn-secondary">Explore Features</button>
        </div>
      </div>
      
      <div className="hero-visual">
        {/* Technical Status Element */}
        <div style={{
          position: 'absolute',
          top: '22%', /* 20-60px above upper body of radio */
          left: '12%', /* Safely right of the 45% boundary */
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          fontFamily: 'sans-serif',
          fontSize: '0.85rem',
          color: '#888',
          letterSpacing: '1px',
          zIndex: 2,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              width: '10px', 
              height: '10px', 
              borderRadius: '50%', 
              backgroundColor: '#E02020', 
              animation: 'status-pulse 2s infinite' 
            }}></span>
            <span style={{ fontWeight: '800', color: '#111' }}>ONLINE</span>
          </div>
          <span style={{ marginLeft: '18px', color: '#666' }}>PoC / LTE</span>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        color: '#666',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '1px',
        fontFamily: 'sans-serif'
      }}>
        SCROLL TO EXPLORE
        <span style={{ fontSize: '1.2rem' }}>↓</span>
      </div>
    </section>
  );
};

export default Hero;
