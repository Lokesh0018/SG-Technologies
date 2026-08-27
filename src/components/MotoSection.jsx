import React, { useRef } from 'react';
import MotoSequence from './MotoSequence';

const MotoSection = ({ onLoadComplete }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  const handleProgress = (currentFrame) => {
    if (textRef.current) {
      if ((currentFrame >= 1 && currentFrame < 80) || (currentFrame >= 225 && currentFrame <= 300)) {
        textRef.current.style.opacity = '1';
        textRef.current.style.transform = 'translate(0px, -50%)';
      } else {
        textRef.current.style.opacity = '0';
        textRef.current.style.transform = 'translate(-40px, -50%)';
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        position: 'relative',
        backgroundColor: '#ffffff', // Clean white background as requested
        overflow: 'hidden',
        display: 'flex'
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <MotoSequence scrollContainerRef={sectionRef} onProgress={handleProgress} onLoadComplete={onLoadComplete} />
      </div>

      <div
        ref={textRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '0',
          transform: 'translate(0px, -50%)',
          zIndex: 10,
          width: '34%',
          minWidth: '340px',
          maxWidth: '520px',
          padding: '46px',
          fontFamily: 'Inter, system-ui, sans-serif',
          pointerEvents: 'none',
          background: 'transparent',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: 1,
        }}
      >
        <div style={{
          display: 'inline-block',
          fontSize: '0.85rem',
          fontWeight: '700',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          color: '#ff0000ff'
        }}>
          Next-Gen Communication
        </div>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: '800',
          color: '#111827',
          margin: 0,
          letterSpacing: '-0.03em',
          lineHeight: '1.05',
        }}>
          Motorola <br />
          TLK 100
        </h1>
        <p style={{
          fontSize: '1.15rem',
          color: '#4b5563',
          marginTop: '1.5rem',
          lineHeight: '1.6',
          fontWeight: '500'
        }}>
          Combining the broad coverage of a nationwide cellular network with the ease of two-way radio communications. Clear, crisp audio and seamless connectivity.
        </p>

        <a href="#explore" style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: '1.05rem',
          fontWeight: '600',
          color: '#1f2937',
          textDecoration: 'none',
          borderBottom: '2px solid #1f2937',
          paddingBottom: '0.2rem',
          marginTop: '2rem',
          pointerEvents: 'auto',
          transition: 'opacity 0.2s'
        }}>
          Explore Product <span style={{ marginLeft: '0.5rem' }}>→</span>
        </a>
      </div>

      {/* Spec Rail (Bottom) */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '4rem',
        color: '#4b5563', // subtle dark-gray
        fontSize: '0.75rem',
        fontWeight: '700',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        zIndex: 10
      }}>
        <span>LTE</span>
        <span style={{ color: '#d1d5db' }}>|</span>
        <span>PTT</span>
        <span style={{ color: '#d1d5db' }}>|</span>
        <span>GPS</span>
        <span style={{ color: '#d1d5db' }}>|</span>
        <span>Wide Coverage</span>
      </div>
    </section>
  );
};

export default MotoSection;
