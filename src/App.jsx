import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ImageSequence from './components/ImageSequence';
import Features from './components/Features';
import Specs from './components/Specs';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <Header />
      
      {/* Fixed Image Sequence Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <ImageSequence />
      </div>
      
      {/* Scrollable DOM Sections */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        
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
