import React, { useState, useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    
    let ctx = gsap.context(() => {
      gsap.fromTo('.reveal-up', 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) return;

    const orderId = `SG-${Math.floor(Math.random() * 1000000)}`;
    
    let message = `*SG TECHNOLOGIES - Product Enquiry*\n`;
    message += `Enquiry ID: ${orderId}\n\n`;
    
    message += `*Customer Info:*\n`;
    message += `Name: ${formData.name}\n`;
    if (formData.company) message += `Company: ${formData.company}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}, ${formData.city} - ${formData.pincode}\n\n`;
    
    message += `*Interested Products:*\n`;
    cartItems.forEach(item => {
      message += `- ${item.name} (x${item.quantity})\n`;
    });
    
    const whatappNumber = '918367248639';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7f7f5' }}>
        <h1 className="editorial-headline" style={{ fontSize: 'clamp(3rem, 5vw, 6rem)', color: '#111', marginBottom: '2rem' }}>CART IS EMPTY.</h1>
        <button 
          onClick={() => navigate('/products')}
          style={{
            backgroundColor: '#111', color: '#fff', border: 'none', padding: '1rem 3rem',
            fontFamily: '"Courier New", Courier, monospace', fontSize: '1rem', fontWeight: '700',
            borderRadius: '3rem', cursor: 'pointer'
          }}
        >
          RETURN TO PRODUCTS
        </button>
      </div>
    );
  }

  return (
    <div className="about-editorial-page" ref={containerRef} style={{ minHeight: '100vh', display: 'flex' }}>
      
      {/* Left Side: Checkout Form */}
      <div style={{ flex: 1.5, padding: '150px 4rem 4rem 4rem', backgroundColor: '#f7f7f5', overflowY: 'auto', borderRight: '1px solid #e0e0e0' }}>
        <h1 className="editorial-headline reveal-up" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '3rem' }}>
          Checkout Details
        </h1>

        <form id="checkout-form" onSubmit={handleWhatsAppCheckout} className="reveal-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
          
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontFamily: '"Courier New", Courier, monospace', fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Full Name *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="editorial-input" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontFamily: '"Courier New", Courier, monospace', fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Company (Optional)</label>
              <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="editorial-input" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontFamily: '"Courier New", Courier, monospace', fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Email Address *</label>
              <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="editorial-input" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontFamily: '"Courier New", Courier, monospace', fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Phone Number *</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="editorial-input" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: '"Courier New", Courier, monospace', fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Delivery Address *</label>
            <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="editorial-input" />
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontFamily: '"Courier New", Courier, monospace', fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase' }}>City *</label>
              <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="editorial-input" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontFamily: '"Courier New", Courier, monospace', fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Pincode *</label>
              <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="editorial-input" />
            </div>
          </div>

        </form>
      </div>

      {/* Right Side: Enquiry Summary */}
      <div style={{ flex: 1, backgroundColor: '#fff', position: 'relative' }}>
        <div style={{ position: 'sticky', top: '150px', padding: '0 4rem 4rem 4rem' }}>
          <h2 className="reveal-up" style={{ fontFamily: '"Syne", sans-serif', fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>Enquiry Summary</h2>
          
          <div className="reveal-up" style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1.5rem', marginBottom: '2rem' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontFamily: '"Inter", sans-serif' }}>
                <span style={{ color: '#666' }}>{item.name} (x{item.quantity})</span>
              </div>
            ))}
          </div>

          <p className="reveal-up" style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.8rem', color: '#888', textAlign: 'center', marginBottom: '1rem' }}>
            Details prepared — continue in WhatsApp to send your enquiry.
          </p>

          <button 
            form="checkout-form" 
            type="submit"
            className="reveal-up"
            style={{
              width: '100%',
              backgroundColor: '#111',
              color: '#fff',
              border: 'none',
              padding: '1.2rem',
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#25D366'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#111'}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            SEND ENQUIRY ON WHATSAPP
          </button>
        </div>
      </div>

    </div>
  );
};

export default Checkout;
