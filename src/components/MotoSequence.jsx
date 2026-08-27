import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 300;
const FRAME_PREFIX = '/moto%20exp%20frames/ezgif-frame-';
const FRAME_SUFFIX = '.jpg';

const MotoSequence = ({ scrollContainerRef, onProgress, onLoadComplete }) => {
  const canvasRef = useRef(null);
  const playheadRef = useRef({ frame: 1 });
  const imagesRef = useRef([]);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !scrollContainerRef.current) return;

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
      // Scale by 1.15 to ensure the object inside the frame reaches the bottom of the screen
      const scale = Math.max(cw / iw, ch / ih) * 1.15;
      const sw = iw * scale;
      const sh = ih * scale;
      
      // Shift right by 8% to give space for the text on the left
      const sx = ((cw - sw) / 2) + (cw * 0.08); 
      // Shift down slightly to push the bottom edge further down
      const sy = ((ch - sh) / 2) + (ch * 0.05);

      ctxRef.current.clearRect(0, 0, cw, ch);
      ctxRef.current.drawImage(img, sx, sy, sw, sh);
    };

    // Set canvas resolution to container size
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
      renderFrame(playheadRef.current.frame);
    };

    window.addEventListener('resize', resizeCanvas);
    

    // Preload images
    let loadedCount = 0;
    const images = [];

    const onImageLoaded = () => {
      loadedCount++;
      if (playheadRef.current) {
        renderFrame(Math.round(playheadRef.current.frame));
      }
      if (loadedCount === FRAME_COUNT && onLoadComplete) {
        onLoadComplete();
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

    // Small delay to ensure parent has rendered sizes
    setTimeout(resizeCanvas, 50);

    // Tie animation to ScrollTrigger for enter/leave, but play as a continuous video
    const playhead = playheadRef.current;
    
    const animation = gsap.to(playhead, {
      frame: FRAME_COUNT,
      ease: "none",
      duration: 10, // 300 frames at 30fps = 10 seconds
      repeat: -1, // Loop infinitely
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play pause resume pause",
      },
      onUpdate: () => {
        const currentFrame = Math.round(playhead.frame);
        renderFrame(currentFrame);
        if (onProgress) {
          onProgress(currentFrame);
        }
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      animation.kill();
      ScrollTrigger.getAll().forEach(t => {
         if (t.trigger === scrollContainerRef.current) {
            t.kill();
         }
      });
    };
  }, [scrollContainerRef, onProgress, onLoadComplete]);

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

export default MotoSequence;
