import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const { cartCount } = useCart();

  return (
    <header className="header" style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '90px',
      zIndex: 100,
      background: path === '/' ? 'transparent' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: path === '/' ? 'none' : 'blur(12px)',
      WebkitBackdropFilter: path === '/' ? 'none' : 'blur(12px)',
      padding: '0 4rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: path === '/' ? 'none' : '1px solid rgba(0,0,0,0.05)'
    }}>
      <div className="header-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', color: '#111', letterSpacing: '-0.5px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}>
          <img src="/sg.png" alt="SG Tech Logo" style={{ height: '36px', width: 'auto' }} />
          SG TECHNOLOGIES
        </Link>
      </div>
      <nav className="header-nav" style={{ display: 'flex', alignItems: 'center', gap: '3rem', fontSize: '0.95rem', fontWeight: 500, color: '#111' }}>
        <Link 
          to="/" 
          className={path === '/' ? 'active' : ''}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Home
        </Link>
        <Link to="/about" className={path === '/about' ? 'active' : ''}>About</Link>
        <Link to="/projects" className={path === '/projects' ? 'active' : ''}>Projects</Link>
        <Link to="/products" className={path.startsWith('/products') ? 'active' : ''}>Products</Link>
        <Link to="/gallery" className={path === '/gallery' ? 'active' : ''}>Gallery</Link>
        <Link to="/manufacturing" className={path === '/manufacturing' ? 'active' : ''}>Manufacturing</Link>
        <Link to="/contact" className={path === '/contact' ? 'active' : ''}>Contact</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          
          <div className="cart-container">
            <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: '#111', textDecoration: 'none', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && (
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
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          
          <Link to="/cart" style={{ 
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
          }}>Buy Now</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
