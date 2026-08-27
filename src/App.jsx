import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Specs from './components/Specs';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    // The loading animation takes exactly 4 seconds (120 frames at ~30fps).
    // Ensure it plays at least once fully.
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadComplete = () => {
    setImagesLoaded(true);
  };

  const isLoading = !(imagesLoaded && minTimePassed);

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <LoadingScreen isFadingOut={!isLoading} />
      <Header />
      
      {/* Scrollable DOM Sections */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Hero onLoadComplete={handleLoadComplete} />
        
        {/* Section 2 - The Statement */}
        <section id="statement" style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 4rem',
          pointerEvents: 'none'
        }}>
          <div style={{ maxWidth: '500px', marginTop: '10vh' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1.5rem', color: '#111', lineHeight: 1.1, letterSpacing: '-1px' }}>
              One press.<br/>Instant connection.
            </h2>
            <p style={{ color: '#555', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '1px' }}>
              RADIO → NETWORK → REMOTE RADIO
            </p>
          </div>
        </section>
        
        <Features />
        <Specs />
        <Footer />
      </div>
    </div>
  );
}

export default App;
