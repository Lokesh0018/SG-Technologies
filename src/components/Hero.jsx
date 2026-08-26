import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-headline">
          Communication,<br />Reimagined.
        </h1>
        <p className="hero-description">
          Experience crystal-clear audio and unmatched reliability with the next generation of professional two-way radios. Built for those who demand the best.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary">Pre-order Now</button>
          <button className="btn btn-secondary">Explore Features</button>
        </div>
      </div>
      <div className="hero-visual">
        {/* 3D Walkie-Talkie Placeholder */}
        <span className="placeholder-text">3D Model Area</span>
      </div>
    </section>
  );
};

export default Hero;
