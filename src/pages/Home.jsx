import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import BlueprintSection from '../components/BlueprintSection';
import MotoSection from '../components/MotoSection';
import Features from '../components/Features';
import LoadingScreen from '../components/LoadingScreen';

let initialAppLoadComplete = false;

const Home = () => {
  const [heroLoaded, setHeroLoaded] = useState(initialAppLoadComplete);
  const [blueprintLoaded, setBlueprintLoaded] = useState(initialAppLoadComplete);
  const [motoLoaded, setMotoLoaded] = useState(initialAppLoadComplete);
  const [minTimePassed, setMinTimePassed] = useState(initialAppLoadComplete);

  useEffect(() => {
    if (initialAppLoadComplete) return;
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleHeroLoadComplete = () => setHeroLoaded(true);
  const handleBlueprintLoadComplete = () => setBlueprintLoaded(true);
  const handleMotoLoadComplete = () => setMotoLoaded(true);

  const isLoading = !(heroLoaded && blueprintLoaded && motoLoaded && minTimePassed);

  useEffect(() => {
    if (!isLoading) {
      initialAppLoadComplete = true;
    }
  }, [isLoading]);

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <LoadingScreen isFadingOut={!isLoading} />
      
      <Hero onLoadComplete={handleHeroLoadComplete} />
      <BlueprintSection onLoadComplete={handleBlueprintLoadComplete} />
      <MotoSection onLoadComplete={handleMotoLoadComplete} />
      <Features />
    </div>
  );
};

export default Home;
