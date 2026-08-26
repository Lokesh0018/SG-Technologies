import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        SG Tech
      </div>
      <nav className="header-nav">
        <a href="#features">Features</a>
        <a href="#specifications">Specs</a>
        <a href="#about">About</a>
        <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Buy Now</a>
      </nav>
    </header>
  );
};

export default Header;
