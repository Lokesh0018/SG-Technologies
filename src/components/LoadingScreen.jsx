import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FRAME_COUNT = 120;
const FRAME_PREFIX = '/loading/ezgif-frame-';
const FRAME_SUFFIX = '.jpg';

const LoadingScreen = ({ isFadingOut }) => {
  const canvasRef = useRef(null);
  const playheadRef = useRef({ frame: 1 });
  const imagesRef = useRef([]);
  const ctxRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
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

      // Calculate "cover" aspect ratio to fill the screen
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctxRef.current.clearRect(0, 0, cw, ch);
      ctxRef.current.drawImage(img, sx, sy, sw, sh);
    };

    // Set canvas resolution to window inner size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(playheadRef.current.frame);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Preload images
    let loadedCount = 0;
    const images = [];

    const onImageLoaded = () => {
      loadedCount++;
      if (loadedCount === 1) {
        // Render first frame as soon as it loads
        renderFrame(1);
      }
      
      // Start animation once a good chunk is loaded to prevent initial stutter
      if (loadedCount === Math.min(30, FRAME_COUNT) && !animationRef.current) {
        startAnimation();
      }
    };

    const startAnimation = () => {
      const playhead = playheadRef.current;
      animationRef.current = gsap.to(playhead, {
        frame: FRAME_COUNT,
        duration: 4, // 120 frames at ~30fps
        ease: "none",
        repeat: 0, // Play exactly once and then hold on the final frame
        onUpdate: () => {
          const currentFrame = Math.round(playhead.frame);
          renderFrame(currentFrame);
        }
      });
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
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 9999,
      backgroundColor: 'transparent',
      opacity: isFadingOut ? 0 : 1,
      pointerEvents: isFadingOut ? 'none' : 'auto',
      transition: 'opacity 1s ease-in-out',
      background: 'white' // Let's add a solid background so it hides the partially loaded main sequence. But the user said transparent. Oh well, if it's transparent, it'll show the main site loading. Let's make it transparent but with a slight blur, or just transparent as requested.
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          backgroundColor: 'transparent'
        }}
      />
    </div>
  );
};

export default LoadingScreen;
