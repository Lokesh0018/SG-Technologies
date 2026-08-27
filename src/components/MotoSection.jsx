import React, { useRef, useState, useEffect } from 'react';
import MotoSequence from './MotoSequence';
import AspireSequence from './AspireSequence';
import gsap from 'gsap';

const MotoSection = ({ onLoadComplete }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const motoContainerRef = useRef(null);
  const asperaContainerRef = useRef(null);
  const sequenceRefMoto = useRef(null);
  const sequenceRefAspera = useRef(null);

  const [activeProduct, setActiveProduct] = useState('motorola');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [motoLoaded, setMotoLoaded] = useState(false);
  const [asperaLoaded, setAsperaLoaded] = useState(false);

  useEffect(() => {
    if (motoLoaded && asperaLoaded && onLoadComplete) {
      onLoadComplete();
    }
  }, [motoLoaded, asperaLoaded, onLoadComplete]);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.dataset.product = activeProduct;
    }
  }, [activeProduct]);

  // Pause Aspera initially
  useEffect(() => {
    if (asperaLoaded && sequenceRefAspera.current) {
      sequenceRefAspera.current.pause();
    }
  }, [asperaLoaded]);

  const handleProgress = (currentFrame, product) => {
    // Ignore updates from the inactive sequence to prevent UI fighting
    if (product !== activeProduct) return;

    if (textRef.current && !isTransitioning) {
      const isMoto = activeProduct === 'motorola';
      if ((currentFrame >= 1 && currentFrame < 80) || (currentFrame >= 225 && currentFrame <= 300)) {
        textRef.current.style.opacity = '1';
        textRef.current.style.transform = 'translate(0px, -50%)';
      } else {
        textRef.current.style.opacity = '0';
        textRef.current.style.transform = isMoto ? 'translate(-40px, -50%)' : 'translate(40px, -50%)';
      }
    }
  };

  const handleNext = () => {
    if (activeProduct === 'aspera' || isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (sequenceRefMoto.current) {
      sequenceRefMoto.current.pause();
    }

    gsap.to(textRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
      setActiveProduct('aspera');
      gsap.to(textRef.current, { opacity: 1, duration: 0.3, delay: 0.1 });
    }});

    gsap.to(motoContainerRef.current, { x: '-100%', duration: 0.9, ease: 'power3.inOut' });
    
    gsap.fromTo(asperaContainerRef.current, 
      { x: '-100%' }, 
      { x: '0%', duration: 0.9, ease: 'power3.inOut', onComplete: () => {
        if (sequenceRefAspera.current) {
          sequenceRefAspera.current.resume();
        }
        setIsTransitioning(false);
      }}
    );
  };

  const handlePrev = () => {
    if (activeProduct === 'motorola' || isTransitioning) return;

    setIsTransitioning(true);

    if (sequenceRefAspera.current) {
      sequenceRefAspera.current.pause();
    }

    gsap.to(textRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
      setActiveProduct('motorola');
      gsap.to(textRef.current, { opacity: 1, duration: 0.3, delay: 0.1 });
    }});

    gsap.to(asperaContainerRef.current, { x: '100%', duration: 0.9, ease: 'power3.inOut' });

    gsap.fromTo(motoContainerRef.current,
      { x: '-100%' },
      { x: '0%', duration: 0.9, ease: 'power3.inOut', onComplete: () => {
        if (sequenceRefMoto.current) {
          sequenceRefMoto.current.resume();
        }
        setIsTransitioning(false);
      }}
    );
  };

  const btnStyle = {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    color: '#111827',
    padding: '0.75rem 2rem',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        position: 'relative',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        display: 'flex'
      }}
    >
      <div ref={motoContainerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, transform: 'translateX(0%)', willChange: 'transform' }}>
        <MotoSequence ref={sequenceRefMoto} scrollContainerRef={sectionRef} onProgress={(frame) => handleProgress(frame, 'motorola')} onLoadComplete={() => setMotoLoaded(true)} />
      </div>

      <div ref={asperaContainerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, transform: 'translateX(-100%)', willChange: 'transform' }}>
        <AspireSequence ref={sequenceRefAspera} scrollContainerRef={sectionRef} onProgress={(frame) => handleProgress(frame, 'aspera')} onLoadComplete={() => setAsperaLoaded(true)} />
      </div>

      <div
        ref={textRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: activeProduct === 'motorola' ? '0' : 'auto',
          right: activeProduct === 'motorola' ? 'auto' : '0',
          transform: 'translate(0px, -50%)',
          zIndex: 10,
          width: '34%',
          minWidth: '340px',
          maxWidth: '520px',
          padding: '46px',
          fontFamily: 'Inter, system-ui, sans-serif',
          pointerEvents: 'none',
          background: 'transparent',
          textAlign: activeProduct === 'motorola' ? 'left' : 'right',
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
          {activeProduct === 'motorola' ? 'Motorola' : 'Aspera'} <br />
          {activeProduct === 'motorola' ? 'TLK 100' : 'v9'}
        </h1>
        <p style={{
          fontSize: '1.15rem',
          color: '#4b5563',
          marginTop: '1.5rem',
          lineHeight: '1.6',
          fontWeight: '500'
        }}>
          {activeProduct === 'motorola' 
            ? 'Combining the broad coverage of a nationwide cellular network with the ease of two-way radio communications. Clear, crisp audio and seamless connectivity.'
            : 'The ultimate blend of reliability and design. Crafted for professionals who demand excellence.'
          }
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
          transition: 'opacity 0.2s',
          flexDirection: activeProduct === 'motorola' ? 'row' : 'row-reverse',
        }}>
          Explore Product <span style={activeProduct === 'motorola' ? { marginLeft: '0.5rem' } : { marginRight: '0.5rem', transform: 'rotate(180deg)' }}>→</span>
        </a>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '0.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '1.5rem',
        zIndex: 20
      }}>
        <button 
          onClick={handlePrev}
          disabled={activeProduct === 'motorola'}
          style={{
            ...btnStyle, 
            opacity: activeProduct === 'motorola' ? 0.3 : 1,
            pointerEvents: activeProduct === 'motorola' ? 'none' : 'auto'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#111827';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
            e.currentTarget.style.color = '#111827';
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          ← Prev
        </button>
        <button 
          onClick={handleNext}
          disabled={activeProduct === 'aspera'}
          style={{
            ...btnStyle, 
            opacity: activeProduct === 'aspera' ? 0.3 : 1,
            pointerEvents: activeProduct === 'aspera' ? 'none' : 'auto'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#111827';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
            e.currentTarget.style.color = '#111827';
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Next →
        </button>
      </div>
    </section>
  );
};

export default MotoSection;
