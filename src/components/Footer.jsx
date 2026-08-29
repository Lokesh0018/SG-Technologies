import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Let's use a modular CSS file to keep index.css clean

const Footer = () => {
  return (
    <footer className="footer-editorial">
      
      {/* Subtle Product Watermark */}
      <div className="footer-watermark">
        <img src="/walkie-talkie/walkie talkie.png" alt="" />
      </div>

      {/* Large Brand Logo Watermark */}
      <div className="footer-logo-watermark">
        <img src="/sg.png" alt="" style={{ filter: 'invert(16%) sepia(85%) saturate(7456%) hue-rotate(349deg) brightness(101%) contrast(92%)', opacity: 0.8 }} />
      </div>

      <div className="footer-container">
        
        {/* TOP: Brand and Navigation */}
        <div className="footer-top">
          
          {/* LEFT: Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/sg.png" alt="SG Tech Logo" style={{ height: '26px', width: 'auto', filter: 'invert(16%) sepia(85%) saturate(7456%) hue-rotate(349deg) brightness(101%) contrast(92%)' }} /> 
              SG TECHNOLOGIES <span className="red-dot"></span>
            </div>
            <p className="footer-desc">
              Professional communication engineered for <br/>
              demanding environments.
            </p>
          </div>
          
          {/* RIGHT: Navigation */}
          <div className="footer-nav">
            
            <div className="footer-col">
              <h4>PRODUCT</h4>
              <Link to="/products">Products</Link>
              <Link to="#">Technology</Link>
              <Link to="#">Specifications</Link>
            </div>
            
            <div className="footer-col">
              <h4>SUPPORT</h4>
              <Link to="#">Help Center</Link>
              <Link to="#">Downloads</Link>
              <Link to="#">Warranty</Link>
              <Link to="/contact">Contact</Link>
            </div>
            
            <div className="footer-col">
              <h4>COMPANY</h4>
              <Link to="/about">About</Link>
              <Link to="#">Projects</Link>
              <Link to="/contact">Contact</Link>
            </div>
            
          </div>
        </div>
        
        {/* BOTTOM: Legal */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} SG Technologies
          </div>
          <div className="footer-legal">
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
