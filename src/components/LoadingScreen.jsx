import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const LoadingScreen = ({ isFadingOut }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isFadingOut) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFadingOut]);

  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 999999,
      backgroundColor: 'white',
      opacity: isFadingOut ? 0 : 1,
      pointerEvents: isFadingOut ? 'none' : 'auto',
      transition: 'opacity 1s ease-in-out'
    }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <video
          ref={videoRef}
          src="/loading.mp4"
          autoPlay
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        {/* Logo overlay on the Walkie Talkie screen */}
        <img 
          src="/sg.png" 
          alt="SG Tech Logo" 
          style={{
            position: 'absolute',
            top: '50%', 
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '10%', // Adjust width based on video size
            zIndex: 10,
            pointerEvents: 'none',
            mixBlendMode: 'screen', // Optional: Helps blend the logo with the screen behind it
            opacity: 0.8
          }} 
        />
      </div>
    </div>,
    document.body
  );
};

export default LoadingScreen;
