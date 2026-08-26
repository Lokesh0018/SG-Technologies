import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">SG Technologies</div>
          <p className="footer-tagline">Redefining communication for the modern era.</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Product</h4>
            <a href="#">Overview</a>
            <a href="#">Features</a>
            <a href="#">Specifications</a>
            <a href="#">Accessories</a>
          </div>
          
          <div className="link-group">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Downloads</a>
            <a href="#">Warranty</a>
            <a href="#">Contact Us</a>
          </div>
          
          <div className="link-group">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Legal</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SG Technologies. All rights reserved.</p>
        <div className="footer-socials">
          <a href="#" aria-label="Twitter">Twitter</a>
          <a href="#" aria-label="LinkedIn">LinkedIn</a>
          <a href="#" aria-label="Instagram">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
