import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CONFIG = {
  LATITUDE: '17.8333',
  LONGITUDE: '83.2000',
  COMPANY_NAME: 'SG Technologies',
  ADDRESS: 'Innovation Park, Sector 4',
  CITY: 'Visakhapatnam',
  STATE: 'Andhra Pradesh',
  PINCODE: '530001',
  PHONE: '+1 (234) 567-890',
  EMAIL: 'info@sgtechnologie.in',
};

const Contact = () => {
  const containerRef = useRef(null);
  const [formStatus, setFormStatus] = useState('idle');

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray('.reveal-up');
      revealElements.forEach((el, index) => {
        gsap.fromTo(el, 
          { y: 40, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            delay: index * 0.1,
            ease: 'power3.out' 
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const subject = formData.get('subject');
    const messageText = formData.get('message');
    
    let message = `*SG TECHNOLOGIES - Contact Inquiry*\n\n`;
    message += `*Name:* ${name}\n`;
    message += `*Email:* ${email}\n`;
    if (company) message += `*Company:* ${company}\n`;
    message += `*Subject:* ${subject}\n\n`;
    message += `*Message:*\n${messageText}\n`;
    
    const whatappNumber = '918367248639';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setFormStatus('success');
  };

  return (
    <div className="contact-page" ref={containerRef} style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7f7f5', paddingTop: '10vh' }}>
      
      {/* Left Side: Typography & Details */}
      <div style={{ flex: 1, padding: '10vh 5vw', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
        
        <h1 className="editorial-headline reveal-up" style={{ 
          fontSize: 'clamp(3rem, 6vw, 6rem)', 
          lineHeight: '0.9',
          letterSpacing: '-0.02em',
          margin: '0 0 15vh 0'
        }}>
          GET IN<br/>TOUCH.
        </h1>

        <div className="reveal-up" style={{ marginBottom: '4rem' }}>
          <div style={{ fontFamily: '"Syne", sans-serif', fontWeight: '700', fontSize: '1.2rem', marginBottom: '1.5rem', color: '#111' }}>
            HEADQUARTERS
          </div>
          <p className="editorial-paragraph" style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{CONFIG.ADDRESS}</p>
          <p className="editorial-paragraph" style={{ margin: '0 0 1.5rem 0', color: '#666' }}>{CONFIG.CITY}, {CONFIG.STATE} {CONFIG.PINCODE}</p>
          
          <div style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.9rem', color: '#888', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#111', borderRadius: '50%' }}></span>
            {CONFIG.LATITUDE}° N, {CONFIG.LONGITUDE}° E
          </div>
        </div>

        <div className="reveal-up">
          <div style={{ fontFamily: '"Syne", sans-serif', fontWeight: '700', fontSize: '1.2rem', marginBottom: '1.5rem', color: '#111' }}>
            DIRECT INQUIRIES
          </div>
          <p className="editorial-paragraph" style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{CONFIG.EMAIL}</p>
          <p className="editorial-paragraph" style={{ margin: 0, color: '#666' }}>{CONFIG.PHONE}</p>
        </div>

      </div>

      {/* Right Side: Minimal Form */}
      <div style={{ flex: 1.2, padding: '10vh 8vw', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        <div className="reveal-up" style={{ fontFamily: '"Syne", sans-serif', fontWeight: '700', fontSize: '1.5rem', marginBottom: '3rem', color: '#111' }}>
          SEND A MESSAGE
        </div>

        {formStatus === 'success' ? (
          <div className="reveal-up" style={{ padding: '3rem 0', color: '#111' }}>
            <h2 className="editorial-subheadline">Message Received.</h2>
            <p className="editorial-paragraph">Our team will review your inquiry and respond shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div className="reveal-up" style={{ flex: 1 }}>
                <input 
                  required 
                  name="name"
                  type="text" 
                  placeholder="Full Name" 
                  className="editorial-input"
                />
              </div>
              <div className="reveal-up" style={{ flex: 1 }}>
                <input 
                  required 
                  name="email"
                  type="email" 
                  placeholder="Email Address" 
                  className="editorial-input"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
              <div className="reveal-up" style={{ flex: 1 }}>
                <input 
                  name="company"
                  type="text" 
                  placeholder="Company (Optional)" 
                  className="editorial-input"
                />
              </div>
              <div className="reveal-up" style={{ flex: 1 }}>
                <input 
                  required 
                  name="subject"
                  type="text" 
                  placeholder="Subject" 
                  className="editorial-input"
                />
              </div>
            </div>

            <div className="reveal-up">
              <textarea 
                required 
                name="message"
                placeholder="Your Message" 
                rows="4" 
                className="editorial-input"
                style={{ resize: 'vertical', minHeight: '120px' }}
              ></textarea>
            </div>

            <div className="reveal-up" style={{ marginTop: '1rem' }}>
              <button 
                type="submit" 
                disabled={formStatus === 'loading'}
                style={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: '700',
                  fontSize: '1rem',
                  letterSpacing: '1px',
                  backgroundColor: '#111',
                  color: '#fff',
                  border: 'none',
                  padding: '1.2rem 3rem',
                  cursor: formStatus === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s',
                  width: '100%',
                  opacity: formStatus === 'loading' ? 0.7 : 1
                }}
              >
                {formStatus === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </div>
            
          </form>
        )}

      </div>
    </div>
  );
};

export default Contact;
