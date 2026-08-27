import React from 'react';

const Header = () => {
  return (
    <header className="header" style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '90px',
      zIndex: 100,
      background: 'transparent',
      padding: '0 4rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div className="header-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', color: '#111', letterSpacing: '-0.5px' }}>
        <img src="/sg.png" alt="SG Tech Logo" style={{ height: '36px', width: 'auto' }} />
        SG TECH
      </div>
      <nav className="header-nav" style={{ display: 'flex', alignItems: 'center', gap: '3rem', fontSize: '0.95rem', fontWeight: 500, color: '#111' }}>
        <a href="#product" style={{ textDecoration: 'none', color: 'inherit' }}>Product</a>
        <a href="#technology" style={{ textDecoration: 'none', color: 'inherit' }}>Technology</a>
        <a href="#features" style={{ textDecoration: 'none', color: 'inherit' }}>Features</a>
        <a href="#specs" style={{ textDecoration: 'none', color: 'inherit' }}>Specs</a>
        <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>About</a>
        <a href="#buy" style={{ 
          background: '#111', 
          color: '#fff', 
          width: '120px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '3rem', 
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'background-color 0.2s'
        }}>Buy Now</a>
      </nav>
    </header>
  );
};

export default Header;
