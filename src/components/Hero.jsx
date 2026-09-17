import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Removed ImageSequence import

const Hero = ({ onLoadComplete }) => {
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const [textVisible, setTextVisible] = useState(true);
  const [animationClass, setAnimationClass] = useState('fadeUp');

  const handleTimeUpdate = (e) => {
    const t = e.target.currentTime;
    if (t >= 2 && t < 9) {
      if (textVisible) {
        setTextVisible(false);
        setAnimationClass('slideOutLeft');
      }
    } else {
      if (!textVisible) {
        setTextVisible(true);
        setAnimationClass('slideInLeft');
      }
    }
  };

  return (
    <section className="hero" style={{ pointerEvents: 'none', position: 'relative', overflow: 'hidden', height: '100vh', fontFamily: "'Manrope', 'Inter', sans-serif" }}>
      {/* Background Video (Untouched) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <video 
          src="/bluprint%20animation.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
          onLoadedData={() => { if (onLoadComplete) onLoadComplete(); }}
          onTimeUpdate={handleTimeUpdate}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      
      {/* Premium Typography Layout */}
      <div ref={contentRef} style={{ 
          position: 'absolute',
          top: '32%',
          left: '6.5vw',
          zIndex: 10, 
          pointerEvents: 'none', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'flex-start',
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: '540px',
          opacity: 1,
          transition: 'opacity 0.4s ease-in-out'
      }}>
        
        {/* Content Container */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          pointerEvents: textVisible ? 'auto' : 'none',
          animation: `${animationClass} 1s cubic-bezier(0.16, 1, 0.3, 1) both`
        }}>
          
          {/* Headline Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ 
              fontSize: '12.5px', 
              fontWeight: 700, 
              letterSpacing: '0.18em', 
              textTransform: 'uppercase', 
              color: '#ff3300', 
            }}>
              THE NEW STANDARD
            </span>
            <h1 className="hero-headline" style={{ 
              fontSize: 'clamp(4rem, 6vw, 5.5rem)', 
              letterSpacing: '-0.045em',
              fontWeight: 800,
              lineHeight: 0.92,
              color: '#111',
              margin: 0,
              textAlign: 'left'
            }}>
              Communication.<br />Reimagined.
            </h1>
          </div>

          {/* Description */}
          <p className="hero-description" style={{ 
            fontSize: '17.5px', 
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#444',
            margin: 0,
            maxWidth: '480px'
          }}>
            Professional two-way communication engineered for clarity, reliability, and connection wherever work takes you.
          </p>
          
          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '38px', pointerEvents: 'auto' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/products')}
              style={{ 
              padding: '1rem 2rem', 
              fontSize: '12.5px', 
              fontWeight: 700,
              textTransform: 'uppercase',
              backgroundColor: '#111',
              color: '#fff',
              border: '1px solid #111',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>
              Explore Products
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate('/solutions')}
              style={{ 
              padding: '1rem 2rem', 
              fontSize: '12.5px', 
              fontWeight: 700,
              textTransform: 'uppercase',
              backgroundColor: 'transparent',
              color: '#111',
              border: '1px solid #111',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>
              View Solutions
            </button>
          </div>
        </div>

      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-50px); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
