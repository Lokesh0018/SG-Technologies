import React, { useState } from 'react';

const Header = () => {
  const [activeNav, setActiveNav] = useState('home');

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
        <a 
          href="#home" 
          className={activeNav === 'home' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setActiveNav('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Home
        </a>
        <a href="#about" className={activeNav === 'about' ? 'active' : ''} onClick={() => setActiveNav('about')}>About</a>
        <a href="#projects" className={activeNav === 'projects' ? 'active' : ''} onClick={() => setActiveNav('projects')}>Projects</a>
        <a href="#products" className={activeNav === 'products' ? 'active' : ''} onClick={() => setActiveNav('products')}>Products</a>
        <a href="#gallery" className={activeNav === 'gallery' ? 'active' : ''} onClick={() => setActiveNav('gallery')}>Gallery</a>
        <a href="#manufacturing" className={activeNav === 'manufacturing' ? 'active' : ''} onClick={() => setActiveNav('manufacturing')}>Manufacturing</a>
        <a href="#contact" className={activeNav === 'contact' ? 'active' : ''} onClick={() => setActiveNav('contact')}>Contact</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="#cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: '#111', textDecoration: 'none', cursor: 'pointer' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-10px',
              background: '#ff3300',
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 700,
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%'
            }}>
              2
            </span>
          </a>
          
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
            transition: 'background-color 0.2s',
            borderBottom: 'none' 
          }}>Buy Now</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
