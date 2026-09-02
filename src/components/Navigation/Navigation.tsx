import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useTheme } from '../../context/ThemeContext';
import './Navigation.css';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const cartItemsCount = useCartStore(state => state.getTotalItems());
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        <Link to="/">
          <img src="/SG.png" alt="SG Technologies" className="nav-logo" />
        </Link>
      </div>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
        <NavLink to="/projects" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Projects</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Products</NavLink>
        <NavLink to="/gallery" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Gallery</NavLink>
        <NavLink to="/manufacturing" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Manufacturing</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink>
      </div>

      <div className="nav-actions">
        <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <Link to="/cart" className="cart-icon-wrapper">
          <ShoppingCart size={24} />
          {cartItemsCount > 0 && (
            <span className="cart-badge">{cartItemsCount}</span>
          )}
        </Link>
        <Link to="/contact">
          <button className="cta-button">Let's Work Together</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
