import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BlueprintSection from './components/BlueprintSection';
import Features from './components/Features';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [blueprintLoaded, setBlueprintLoaded] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    // The loading animation takes exactly 4 seconds (120 frames at ~30fps).
    // Ensure it plays at least once fully.
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleHeroLoadComplete = () => setHeroLoaded(true);
  const handleBlueprintLoadComplete = () => setBlueprintLoaded(true);

  // Loading screen only fades out when ALL 600 heavy frames are fully in memory
  const isLoading = !(heroLoaded && blueprintLoaded && minTimePassed);

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <div className="grain-overlay"></div>
      <LoadingScreen isFadingOut={!isLoading} />
      <Header />
      
      {/* Scrollable DOM Sections */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Hero onLoadComplete={handleHeroLoadComplete} />
        
        {/* Section 2 - Blueprint Animation */}
        <BlueprintSection onLoadComplete={handleBlueprintLoadComplete} />
        
        <Features />
        <Footer />
      </div>
    </div>
  );
}

export default App;
