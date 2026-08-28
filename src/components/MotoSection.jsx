import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 300;
const FRAME_PREFIX = '/moto exp frames/ezgif-frame-';
const FRAME_SUFFIX = '.jpg';

const MotoSection = ({ onLoadComplete }) => {
  const motoSectionRef = useRef(null);
  const asperaSectionRef = useRef(null);
  const motoTextRef = useRef(null);
  const asperaTextRef = useRef(null);
  const videoRefAspera = useRef(null);
  const canvasMotoRef = useRef(null);

  const [motoLoaded, setMotoLoaded] = useState(false);
  const [isMotoTextHidden, setIsMotoTextHidden] = useState(false);
  const [isAsperaTextHidden, setIsAsperaTextHidden] = useState(false);

  const playheadRef = useRef({ frame: 1 });
  const imagesRef = useRef([]);
  const ctxRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (motoLoaded && onLoadComplete) {
      onLoadComplete();
    }
  }, [motoLoaded, onLoadComplete]);

  // Moto Canvas Sequence Init
  useEffect(() => {
    const canvas = canvasMotoRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    const renderFrame = (index) => {
      if (!ctxRef.current || !imagesRef.current[index - 1]) return;
      const img = imagesRef.current[index - 1];
      if (!img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.width;
      const ih = img.height;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctxRef.current.clearRect(0, 0, cw, ch);
      ctxRef.current.drawImage(img, sx, sy, sw, sh);
    };

    const resizeCanvas = () => {
      if (canvasMotoRef.current) {
        canvasMotoRef.current.width = window.innerWidth;
        canvasMotoRef.current.height = window.innerHeight;
        renderFrame(Math.round(playheadRef.current.frame));
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let loadedCount = 0;
    const images = [];

    const onImageLoaded = () => {
      loadedCount++;
      if (loadedCount === 1) renderFrame(1);
      if (loadedCount === 30) setMotoLoaded(true);
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `${FRAME_PREFIX}${paddedIndex}${FRAME_SUFFIX}`;
      img.onload = onImageLoaded;
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) animationRef.current.kill();
    };
  }, []);

  // Moto ScrollTrigger (Scrubbing)
  useEffect(() => {
    if (animationRef.current) animationRef.current.kill();

    animationRef.current = gsap.to(playheadRef.current, {
      frame: FRAME_COUNT,
      ease: "none",
      scrollTrigger: {
        trigger: motoSectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      },
      onUpdate: () => {
        const currentFrame = Math.round(playheadRef.current.frame);
        const canvas = canvasMotoRef.current;
        if (ctxRef.current && imagesRef.current[currentFrame - 1] && canvas) {
          const img = imagesRef.current[currentFrame - 1];
          if (img.complete && img.naturalWidth > 0) {
            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.width;
            const ih = img.height;
            const scale = Math.max(cw / iw, ch / ih);
            const sw = iw * scale;
            const sh = ih * scale;
            const sx = (cw - sw) / 2;
            const sy = (ch - sh) / 2;
            ctxRef.current.clearRect(0, 0, cw, ch);
            ctxRef.current.drawImage(img, sx, sy, sw, sh);
          }
        }

        // Text hiding logic (frames 90 to 210 correspond to 3s to 7s)
        if (currentFrame >= 90 && currentFrame < 210) {
          setIsMotoTextHidden(true);
        } else {
          setIsMotoTextHidden(false);
        }
      }
    });

    return () => {
      if (animationRef.current) animationRef.current.kill();
    };
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
          height: '400vh',
          position: 'relative',
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ position: 'sticky', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, overflow: 'hidden' }}>
          <canvas 
            ref={canvasMotoRef}
            style={{ width: '100%', height: '100%', display: 'block', backgroundColor: '#000' }}
          />
          
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
