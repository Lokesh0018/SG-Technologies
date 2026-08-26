import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Scene from './components/Scene';

function App() {
  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <Header />
      
      {/* Fixed 3D Canvas Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <Scene />
      </div>
      
      {/* Scrollable DOM Sections */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        
        {/* Section 2 Placeholder */}
        <section id="section-2" style={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 4rem',
          pointerEvents: 'none'
        }}>
          <div style={{ maxWidth: '400px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: '#111' }}>
              One press.<br/>Instant connection.
            </h2>
            <p style={{ color: '#666', fontSize: '1.2rem' }}>
              RADIO → NETWORK → REMOTE RADIO
            </p>
          </div>
        </section>
        
        {/* We will add more sections later */}
        <div style={{ height: '300vh' }}></div>
      </div>
    </div>
  );
}

export default App;
