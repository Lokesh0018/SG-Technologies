import React, { useRef } from 'react';
import ImageSequence from './ImageSequence';

const Hero = ({ onLoadComplete }) => {
  const contentRef = useRef(null);

  const handleFrame = (frame) => {
    if (!contentRef.current) return;
    
    // Hide text between 126 and 275
    if (frame >= 126 && frame <= 275) {
      if (contentRef.current.style.opacity !== '0') {
        contentRef.current.style.opacity = '0';
      }
    } else {
      if (contentRef.current.style.opacity !== '1') {
        contentRef.current.style.opacity = '1';
      }
    }
  };

  return (
    <section className="hero" style={{ pointerEvents: 'none', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image Sequence */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <ImageSequence onFrame={handleFrame} onLoadComplete={onLoadComplete} />
      </div>
      
      {/* Minimalist Hardware Layout */}
      <div ref={contentRef} style={{ 
          zIndex: 10, 
          pointerEvents: 'none', 
          width: '100%', 
          height: '100%',
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'flex-start',
          boxSizing: 'border-box',
          opacity: 1,
          transition: 'opacity 0.4s ease-in-out'
      }}>
        
        {/* Structural Left Border Container */}
        <div style={{
          borderLeft: '1px solid rgba(17, 17, 17, 0.2)',
          paddingLeft: '1.5rem', // Tighter padding next to the structural line
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
          pointerEvents: 'auto',
          maxWidth: '650px',
          animation: 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) both'
        }}>
          
          {/* Headline Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase', 
              color: '#ff4500', 
            }}>
              THE NEW STANDARD
            </span>
            <h1 className="hero-headline" style={{ 
              fontSize: 'clamp(3rem, 6vw, 5rem)', 
              letterSpacing: '-0.04em', // Tight kerning
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#111',
              margin: 0
            }}>
              Communication,<br />Reimagined.
            </h1>
          </div>

          {/* Description */}
          <p className="hero-description" style={{ 
            fontSize: '1.25rem', 
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#444',
            margin: 0
          }}>
            Professional two-way communication engineered for clarity, reliability, and connection wherever work takes you.
          </p>
          
          {/* Hardware Buttons */}
          <div className="hero-cta" style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary" style={{ 
              padding: '1rem 2.5rem', 
              fontSize: '0.85rem', 
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '0', // Sharp corners
              backgroundColor: '#111',
              color: '#fff',
              border: '1px solid #111',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>
              Pre-order
            </button>
            <button className="btn btn-secondary" style={{ 
              padding: '1rem 2.5rem', 
              fontSize: '0.85rem', 
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '0', // Sharp corners
              backgroundColor: 'transparent',
              color: '#111',
              border: '1px solid #111',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>
              Explore
            </button>
          </div>
        </div>

      </div>
      
      {/* CSS Animations directly in the component for portability */}
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
