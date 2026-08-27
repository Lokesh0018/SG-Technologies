import React, { useRef } from 'react';
import ImageSequence from './ImageSequence';

const Hero = () => {
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
        <ImageSequence onFrame={handleFrame} />
      </div>
      
      {/* Premium Centered Layout (Top/Bottom) */}
      <div ref={contentRef} style={{ 
          zIndex: 10, 
          pointerEvents: 'none', 
          width: '100%', 
          height: '100%',
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '12vh 2rem 8vh', // Push text to top and bottom edges
          boxSizing: 'border-box',
          opacity: 1,
          transition: 'opacity 0.3s ease-in-out'
      }}>
        
        {/* Top: Massive Centered Headline */}
        <div style={{ textAlign: 'center', pointerEvents: 'auto', animation: 'fadeDown 1s ease-out' }}>
          <h1 className="hero-headline" style={{ 
            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', 
            letterSpacing: '-3px',
            lineHeight: 1.05,
            color: '#111',
            textShadow: '0 10px 30px rgba(255,255,255,0.8)' // Subtle glow to stand out against any background
          }}>
            Communication,<br />Reimagined.
          </h1>
        </div>

        {/* Bottom: Description & Elegant CTA Buttons */}
        <div style={{ 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '2rem', 
          pointerEvents: 'auto', 
          maxWidth: '640px',
          animation: 'fadeUp 1s ease-out 0.2s both'
        }}>
          <p className="hero-description" style={{ 
            fontSize: '1.25rem', 
            fontWeight: 500,
            color: '#333',
            textShadow: '0 2px 10px rgba(255,255,255,0.8)'
          }}>
            Professional two-way communication engineered for clarity, reliability, and connection wherever work takes you.
          </p>
          
          <div className="hero-cta" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" style={{ 
              padding: '1.2rem 2.5rem', 
              fontSize: '1.1rem', 
              borderRadius: '50px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}>
              Pre-order Now
            </button>
            <button className="btn btn-secondary" style={{ 
              padding: '1.2rem 2.5rem', 
              fontSize: '1.1rem', 
              borderRadius: '50px', 
              backgroundColor: 'rgba(255,255,255,0.7)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
            }}>
              Explore Features
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
