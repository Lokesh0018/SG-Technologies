import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MotoSection = ({ onLoadComplete }) => {
  const motoSectionRef = useRef(null);
  const asperaSectionRef = useRef(null);
  const motoTextRef = useRef(null);
  const asperaTextRef = useRef(null);
  const videoRefMoto = useRef(null);
  const videoRefAspera = useRef(null);

  const [motoLoaded, setMotoLoaded] = useState(false);
  const [isMotoTextHidden, setIsMotoTextHidden] = useState(false);
  const [isAsperaTextHidden, setIsAsperaTextHidden] = useState(false);

  useEffect(() => {
    if (motoLoaded && onLoadComplete) {
      onLoadComplete();
    }
  }, [motoLoaded, onLoadComplete]);

  // Moto ScrollTrigger
  useEffect(() => {
    const playMoto = () => {
      if (videoRefMoto.current) videoRefMoto.current.play().catch(e => console.log('Autoplay prevented', e));
    };
    const pauseMoto = () => {
      if (videoRefMoto.current) videoRefMoto.current.pause();
    };

    const stMoto = ScrollTrigger.create({
      trigger: motoSectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: playMoto,
      onEnterBack: playMoto,
      onLeave: pauseMoto,
      onLeaveBack: pauseMoto,
    });

    return () => stMoto.kill();
  }, []);

  // Aspera ScrollTrigger
  useEffect(() => {
    const playAspera = () => {
      if (videoRefAspera.current) videoRefAspera.current.play().catch(e => console.log('Autoplay prevented', e));
    };
    const pauseAspera = () => {
      if (videoRefAspera.current) videoRefAspera.current.pause();
    };

    const stAspera = ScrollTrigger.create({
      trigger: asperaSectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: playAspera,
      onEnterBack: playAspera,
      onLeave: pauseAspera,
      onLeaveBack: pauseAspera,
    });

    return () => stAspera.kill();
  }, []);

  // Handle video-synced text animation for Motorola
  useEffect(() => {
    if (isMotoTextHidden) {
      gsap.to(motoTextRef.current, { opacity: 0, x: -40, duration: 0.5, ease: 'power2.out' });
    } else {
      gsap.to(motoTextRef.current, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
    }
  }, [isMotoTextHidden]);

  // Handle video-synced text animation for Aspera
  useEffect(() => {
    if (isAsperaTextHidden) {
      gsap.to(asperaTextRef.current, { opacity: 0, x: 40, duration: 0.5, ease: 'power2.out' });
    } else {
      gsap.to(asperaTextRef.current, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
    }
  }, [isAsperaTextHidden]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Motorola Section */}
      <section
        ref={motoSectionRef}
        style={{
          height: '100vh',
          position: 'relative',
          backgroundColor: '#ffffff',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <video 
            ref={videoRefMoto}
            src="/moto%20exp.mp4" 
            muted 
            loop 
            playsInline
            onCanPlayThrough={() => setMotoLoaded(true)}
            onTimeUpdate={(e) => {
              const time = e.target.currentTime;
              if (time >= 3 && time < 7) {
                if (!isMotoTextHidden) setIsMotoTextHidden(true);
              } else {
                if (isMotoTextHidden) setIsMotoTextHidden(false);
              }
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div
          ref={motoTextRef}
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
            textAlign: 'left'
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
            transition: 'opacity 0.2s',
            flexDirection: 'row',
          }}>
            Explore Product <span style={{ marginLeft: '0.5rem' }}>→</span>
          </a>
        </div>
      </section>

      {/* Aspera Section */}
      <section
        ref={asperaSectionRef}
        style={{
          height: '100vh',
          position: 'relative',
          backgroundColor: '#ffffff',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <video 
            ref={videoRefAspera}
            src="/aspera%20exploaded.mp4" 
            muted 
            loop 
            playsInline
            onTimeUpdate={(e) => {
              const time = e.target.currentTime;
              if (time >= 2 && time < 7) {
                if (!isAsperaTextHidden) setIsAsperaTextHidden(true);
              } else {
                if (isAsperaTextHidden) setIsAsperaTextHidden(false);
              }
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div
          ref={asperaTextRef}
          style={{
            position: 'absolute',
            top: '50%',
            right: '0',
            transform: 'translate(0px, -50%)',
            zIndex: 10,
            width: '34%',
            minWidth: '340px',
            maxWidth: '520px',
            padding: '46px',
            fontFamily: 'Inter, system-ui, sans-serif',
            pointerEvents: 'none',
            background: 'transparent',
            textAlign: 'right'
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
            Aspera <br />
            v9
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: '#4b5563',
            marginTop: '1.5rem',
            lineHeight: '1.6',
            fontWeight: '500'
          }}>
            The ultimate blend of reliability and design. Crafted for professionals who demand excellence.
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
            flexDirection: 'row-reverse',
          }}>
            Explore Product <span style={{ marginRight: '0.5rem', transform: 'rotate(180deg)' }}>→</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default MotoSection;
