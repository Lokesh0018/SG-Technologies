import React, { useRef, useState } from 'react';
import BlueprintSequence from './BlueprintSequence';

const BlueprintSection = ({ onLoadComplete }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  const handleProgress = (currentFrame) => {
    // Directly mutate DOM to avoid React re-renders on every scroll tick
    if (textRef.current) {
      if (currentFrame < 65) {
        textRef.current.style.opacity = 1;
        textRef.current.style.transform = `scale(1)`;
        textRef.current.style.filter = 'blur(0px)';
      } else {
        // Start fading exactly at frame 65, taking 30 frames to completely disappear (fully gone by frame 95)
        const fadeProgress = Math.min((currentFrame - 65) / 30, 1);
        
        // Fade out opacity
        const opacity = Math.max(1 - fadeProgress, 0);
        textRef.current.style.opacity = opacity;
        
        // Scale up significantly so it "comes at the camera" and moves around the center
        const scale = 1 + (fadeProgress * 2.5);
        textRef.current.style.transform = `scale(${scale})`;
        
        // Add a blur effect for a premium motion blur feel
        textRef.current.style.filter = `blur(${fadeProgress * 15}px)`;
      }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      style={{ 
        height: '500vh', // 500vh gives plenty of scroll distance to scrub through the 300 frames
        position: 'relative' 
      }}
    >
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#fff' // Fallback for light frames
      }}>
        
        {/* Background Canvas */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <BlueprintSequence scrollContainerRef={sectionRef} onProgress={handleProgress} onLoadComplete={onLoadComplete} />
        </div>

        {/* Text Overlay (Dark Text on Light Background) */}
        <div 
          ref={textRef}
          style={{ 
            position: 'absolute', 
            top: '0', 
            left: '0', 
            width: '100%',
            height: '100%',
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', 
            padding: '0 4rem',
            zIndex: 10,
            pointerEvents: 'none',
            textAlign: 'center',
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
          }}
        >
          <h2 style={{ 
            fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
            fontWeight: 800, 
            marginBottom: '1.5rem', 
            color: '#111', 
            lineHeight: 1.1, 
            letterSpacing: '-2px' 
          }}>
            One press.<br/>Instant connection.
          </h2>
          <p style={{ 
            color: '#333', 
            fontSize: '1.5rem', 
            fontWeight: 600, 
            letterSpacing: '2px' 
          }}>
            RADIO → NETWORK → REMOTE RADIO
          </p>
        </div>

      </div>
    </section>
  );
};

export default BlueprintSection;
