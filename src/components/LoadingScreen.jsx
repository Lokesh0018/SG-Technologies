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
    </div>,
    document.body
  );
};

export default LoadingScreen;
