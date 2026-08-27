import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 300;
const FRAME_PREFIX = '/ezgif-2e81e83e5d4eb60e-jpg/ezgif-frame-';
const FRAME_SUFFIX = '.jpg';

const ImageSequence = ({ onFrame }) => {
  const canvasRef = useRef(null);
  const playheadRef = useRef({ frame: 1 });
  const imagesRef = useRef([]);
  const ctxRef = useRef(null);

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
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `${FRAME_PREFIX}${paddedIndex}${FRAME_SUFFIX}`;
      img.onload = onImageLoaded;
      images.push(img);
    }
    
    imagesRef.current = images;

    const playhead = playheadRef.current;
    
    // Play in a continuous loop using GSAP
    const animation = gsap.to(playhead, {
      frame: FRAME_COUNT,
      duration: 10, // 10 seconds for 300 frames (~30fps). Change this to adjust speed.
      ease: "none",
      repeat: -1, // Infinite loop
      onUpdate: () => {
        const currentFrame = Math.round(playhead.frame);
        renderFrame(currentFrame);
        if (onFrame) onFrame(currentFrame);
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      animation.kill();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  );
};

export default ImageSequence;
