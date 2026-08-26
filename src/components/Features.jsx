import React from 'react';

const Features = () => {
  return (
    <section id="features" className="section-features">
      <div className="features-container">
        <div className="section-header">
          <h2 className="section-title">Engineered for the extreme.</h2>
          <p className="section-subtitle">
            Every detail is meticulously crafted to ensure reliability when you need it most. 
            Experience unparalleled connectivity without the constraints of traditional networks.
          </p>
        </div>
        
        <div className="bento-grid">
          {/* Feature 1 */}
          <div className="bento-card card-large card-dark">
            <div className="bento-content">
              <h3>Global Range</h3>
              <p>Connect instantly across continents using advanced cellular-over-radio technology. Distance is no longer a barrier.</p>
            </div>
            <div className="bento-visual">
              {/* Abstract visual representation */}
              <div className="pulse-ring"></div>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="bento-card">
            <div className="bento-content">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bento-icon">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <h3>End-to-End Encryption</h3>
              <p>Military-grade AES-256 encryption ensures your communications remain absolutely private and secure.</p>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="bento-card">
            <div className="bento-content">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bento-icon">
                <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect>
                <line x1="22" y1="11" x2="22" y2="13"></line>
                <line x1="6" y1="12" x2="18" y2="12"></line>
              </svg>
              <h3>48-Hour Battery</h3>
              <p>High-density lithium-ion cells provide up to 48 hours of continuous talk time on a single charge.</p>
            </div>
          </div>
          
          {/* Feature 4 */}
          <div className="bento-card card-wide card-dark">
            <div className="bento-content">
              <div className="badge">IP68 Rated</div>
              <h3>Water & Dust Proof</h3>
              <p>Fully submersible and dust-tight. Designed to withstand the harshest environments on Earth, from deserts to deep waters.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
