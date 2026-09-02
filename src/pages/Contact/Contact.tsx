import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import Globe3D from '../../components/Globe3D/Globe3D';
import './Contact.css';

// Using environment variables or standard config for location
const CONFIG = {
  LATITUDE: '17.8333',
  LONGITUDE: '83.2000',
  COMPANY_NAME: 'SG Technologies',
  ADDRESS: 'Innovation Park, Sector 4',
  CITY: 'Visakhapatnam',
  STATE: 'Andhra Pradesh',
  PINCODE: '530001',
  PHONE: '+1 (234) 567-890',
  EMAIL: 'info@sgtechnologies.com',
  HOURS: 'Mon - Fri: 9:00 AM - 6:00 PM'
};

const Contact = () => {
  const [zoomState, setZoomState] = useState<'idle' | 'zooming' | 'done'>('idle');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleLocate = () => {
    setZoomState('zooming');
  };

  const handleZoomComplete = () => {
    setZoomState('done');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <PageTransition className="contact-page">
      <div className={`globe-container ${zoomState === 'done' ? 'faded' : ''}`}>
        <Globe3D zoomState={zoomState} onZoomComplete={handleZoomComplete} />
      </div>

      <AnimatePresence>
        {zoomState === 'idle' && (
          <motion.div 
            className="contact-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <div className="globe-intro">
              <h1>Find {CONFIG.COMPANY_NAME}</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Global presence. Local innovation.</p>
              <button className="locate-btn" onClick={handleLocate}>
                Travel to Headquarters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {zoomState === 'done' && (
          <motion.div 
            className="contact-map-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="map-background"></div>
            
            <div className="contact-card">
              <div className="contact-info">
                <h2>{CONFIG.COMPANY_NAME}</h2>
                
                <div className="info-item">
                  <div className="info-label">Coordinates</div>
                  <div className="info-value" style={{ fontFamily: 'monospace', color: 'var(--sg-red)' }}>
                    {CONFIG.LATITUDE}° N, {CONFIG.LONGITUDE}° E
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">Address</div>
                  <div className="info-value">
                    {CONFIG.ADDRESS}<br/>
                    {CONFIG.CITY}, {CONFIG.STATE} - {CONFIG.PINCODE}
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">Contact</div>
                  <div className="info-value">
                    {CONFIG.PHONE}<br/>
                    {CONFIG.EMAIL}
                  </div>
                </div>
                
                <div className="contact-actions">
                  <button className="action-btn primary">Get Directions</button>
                  <button className="action-btn secondary">WhatsApp</button>
                </div>
              </div>
              
              <div className="contact-form-container">
                <h3>Send an Inquiry</h3>
                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', padding: '3rem 0', color: '#4CAF50' }}
                  >
                    <h2>Message Sent!</h2>
                    <p>Our team will get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="c-form-row">
                      <div className="c-form-group">
                        <input required type="text" placeholder="Full Name" />
                      </div>
                      <div className="c-form-group">
                        <input required type="email" placeholder="Email Address" />
                      </div>
                    </div>
                    <div className="c-form-row">
                      <div className="c-form-group">
                        <input type="tel" placeholder="Phone (Optional)" />
                      </div>
                      <div className="c-form-group">
                        <input type="text" placeholder="Company" />
                      </div>
                    </div>
                    <div className="c-form-group">
                      <input required type="text" placeholder="Subject" />
                    </div>
                    <div className="c-form-group">
                      <textarea required placeholder="Your Message" rows={4}></textarea>
                    </div>
                    <button type="submit" className="send-btn" disabled={formStatus === 'loading'}>
                      {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Contact;
