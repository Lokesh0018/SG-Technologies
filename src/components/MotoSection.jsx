import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MotoSection = ({ onLoadComplete }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const motoContainerRef = useRef(null);
  const asperaContainerRef = useRef(null);
  const videoRefMoto = useRef(null);
  const videoRefAspera = useRef(null);

  const [activeProduct, setActiveProduct] = useState('motorola');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMotoTextHidden, setIsMotoTextHidden] = useState(false);
  const [isAsperaTextHidden, setIsAsperaTextHidden] = useState(false);
  
  const activeProductRef = useRef(activeProduct);
  const isTransitioningRef = useRef(isTransitioning);

  useEffect(() => {
    activeProductRef.current = activeProduct;
    isTransitioningRef.current = isTransitioning;
  }, [activeProduct, isTransitioning]);

  const [motoLoaded, setMotoLoaded] = useState(false);

  useEffect(() => {
    if (motoLoaded && onLoadComplete) {
      onLoadComplete();
    }
  }, [motoLoaded, onLoadComplete]);

  // Master ScrollTrigger to manage playing/pausing globally
  useEffect(() => {
    const playActive = () => {
      if (isTransitioningRef.current) return;
      if (activeProductRef.current === 'motorola' && videoRefMoto.current) {
        videoRefMoto.current.play().catch(e => console.log('Autoplay prevented', e));
      } else if (activeProductRef.current === 'aspera' && videoRefAspera.current) {
        videoRefAspera.current.play().catch(e => console.log('Autoplay prevented', e));
      }
    };

    const pauseAll = () => {
      if (videoRefMoto.current) videoRefMoto.current.pause();
      if (videoRefAspera.current) videoRefAspera.current.pause();
    };

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: playActive,
      onEnterBack: playActive,
      onLeave: pauseAll,
      onLeaveBack: pauseAll,
    });

    return () => st.kill();
  }, []);

  // Handle video-synced text animation for Motorola
  useEffect(() => {
    if (activeProduct !== 'motorola' || isTransitioning) return;
    
    if (isMotoTextHidden) {
      gsap.to(textRef.current, { opacity: 0, x: -40, duration: 0.5, ease: 'power2.out' });
    } else {
      gsap.to(textRef.current, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
    }
  }, [isMotoTextHidden, activeProduct, isTransitioning]);

  // Handle video-synced text animation for Aspera
  useEffect(() => {
    if (activeProduct !== 'aspera' || isTransitioning) return;
    
    if (isAsperaTextHidden) {
      gsap.to(textRef.current, { opacity: 0, x: 40, duration: 0.5, ease: 'power2.out' });
    } else {
      gsap.to(textRef.current, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
    }
  }, [isAsperaTextHidden, activeProduct, isTransitioning]);

  const handleNext = () => {
    if (activeProduct === 'aspera' || isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (videoRefMoto.current) {
      videoRefMoto.current.pause();
    }

    gsap.to(textRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
      setActiveProduct('aspera');
      gsap.to(textRef.current, { opacity: 1, duration: 0.3, delay: 0.1 });
    }});

    gsap.to(motoContainerRef.current, { x: '-100%', duration: 0.9, ease: 'power3.inOut' });
    
    gsap.fromTo(asperaContainerRef.current, 
      { x: '-100%' }, 
      { x: '0%', duration: 0.9, ease: 'power3.inOut', onComplete: () => {
        setIsTransitioning(false);
        if (videoRefAspera.current && ScrollTrigger.isInViewport(sectionRef.current)) {
          videoRefAspera.current.play().catch(e => console.log('Autoplay prevented', e));
        }
      }}
    );
  };

  const handlePrev = () => {
    if (activeProduct === 'motorola' || isTransitioning) return;

    setIsTransitioning(true);

    if (videoRefAspera.current) {
      videoRefAspera.current.pause();
    }

    gsap.to(textRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
      setActiveProduct('motorola');
      gsap.to(textRef.current, { opacity: 1, duration: 0.3, delay: 0.1 });
    }});

    gsap.to(asperaContainerRef.current, { x: '100%', duration: 0.9, ease: 'power3.inOut' });

    gsap.fromTo(motoContainerRef.current,
      { x: '-100%' },
      { x: '0%', duration: 0.9, ease: 'power3.inOut', onComplete: () => {
        setIsTransitioning(false);
        if (videoRefMoto.current && ScrollTrigger.isInViewport(sectionRef.current)) {
          videoRefMoto.current.play().catch(e => console.log('Autoplay prevented', e));
        }
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
        <video 
          ref={videoRefMoto}
          src="/moto%20exp.mp4" 
          muted 
          loop 
          playsInline
          onCanPlayThrough={() => setMotoLoaded(true)}
          onTimeUpdate={(e) => {
            const time = e.target.currentTime;
            if (activeProduct === 'motorola' && !isTransitioning) {
              if (time >= 3 && time < 7) {
                if (!isMotoTextHidden) setIsMotoTextHidden(true);
              } else {
                if (isMotoTextHidden) setIsMotoTextHidden(false);
              }
            }
          }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div ref={asperaContainerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, transform: 'translateX(-100%)', willChange: 'transform' }}>
        <video 
          ref={videoRefAspera}
          src="/aspera%20exploaded.mp4" 
          muted 
          loop 
          playsInline
          onTimeUpdate={(e) => {
            const time = e.target.currentTime;
            if (activeProduct === 'aspera' && !isTransitioning) {
              if (time >= 2 && time < 7) {
                if (!isAsperaTextHidden) setIsAsperaTextHidden(true);
              } else {
                if (isAsperaTextHidden) setIsAsperaTextHidden(false);
              }
            }
          }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
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
