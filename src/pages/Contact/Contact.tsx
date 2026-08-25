import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import Globe3D from '../../components/Globe3D/Globe3D';
import './Contact.css';

const Contact = () => {
  const [zoomedIn, setZoomedIn] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleLocate = () => {
    setZoomedIn(true);
  };

  const handleAnimationComplete = () => {
    setShowDetails(true);
  };

  return (
    <PageTransition className="contact-page">
      <div className="globe-container">
        <Globe3D zoomedIn={zoomedIn} onAnimationComplete={handleAnimationComplete} />
      </div>

      <AnimatePresence>
        {!zoomedIn && (
          <motion.div 
            className="contact-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <div className="globe-intro">
              <h1>Find SG Technologies</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Global presence. Local innovation.</p>
              <button className="locate-btn" onClick={handleLocate}>
                Locate Headquarters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDetails && (
          <motion.div 
            className="contact-details-view"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="contact-card">
              <div className="contact-info">
                <h2>SG Technologies</h2>
                
                <div className="info-item">
                  <div className="info-label">Address</div>
                  <div className="info-value">Innovation Park, Sector 4<br/>Tech City, 560100</div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">Contact</div>
                  <div className="info-value">+1 (234) 567-890<br/>info@sgtechnologies.com</div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">Hours</div>
                  <div className="info-value">Mon - Fri: 9:00 AM - 6:00 PM</div>
                </div>
              </div>
              
              <div className="contact-form-container">
                <h3>Send an Inquiry</h3>
                <form>
                  <div className="c-form-group">
                    <input type="text" placeholder="Your Name" />
                  </div>
                  <div className="c-form-group">
                    <input type="email" placeholder="Your Email" />
                  </div>
                  <div className="c-form-group">
                    <textarea placeholder="Your Message" rows={4}></textarea>
                  </div>
                  <button type="button" className="send-btn">Send Message</button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Contact;
