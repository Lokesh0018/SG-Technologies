import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/">
            <img src="/SG.jpeg" alt="SG Technologies" className="footer-logo" />
          </Link>
          <p className="footer-description">
            Engineering Technology. Building the Future. We deliver innovative technology, engineering, manufacturing, and product solutions built for real-world applications.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Company</h4>
          <div className="footer-links">
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/projects" className="footer-link">Projects</Link>
            <Link to="/gallery" className="footer-link">Gallery</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Capabilities</h4>
          <div className="footer-links">
            <Link to="/products" className="footer-link">Products</Link>
            <Link to="/manufacturing" className="footer-link">Manufacturing</Link>
            <Link to="#" className="footer-link">Engineering</Link>
            <Link to="#" className="footer-link">Technology</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact</h4>
          <div className="footer-links">
            <a href="mailto:info@sgtechnologies.com" className="footer-link">info@sgtechnologies.com</a>
            <a href="tel:+1234567890" className="footer-link">+1 (234) 567-890</a>
            <p className="footer-link" style={{ pointerEvents: 'none' }}>Global Headquarters<br />Innovation Park, Sector 4</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SG Technologies. All rights reserved.</p>
        <div className="footer-socials">
          <a href="#" className="social-link"><FaFacebook size={20} /></a>
          <a href="#" className="social-link"><FaTwitter size={20} /></a>
          <a href="#" className="social-link"><FaLinkedin size={20} /></a>
          <a href="#" className="social-link"><FaInstagram size={20} /></a>
          <a href="#" className="social-link"><FaPhone size={18} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
