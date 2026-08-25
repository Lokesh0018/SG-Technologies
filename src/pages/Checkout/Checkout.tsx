import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition/PageTransition';
import { useCartStore } from '../../store/cartStore';
import '../Cart/Cart.css';
import './Checkout.css';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) return;

    // Generate Order ID
    const orderId = `SG-${Math.floor(Math.random() * 1000000)}`;
    
    // Format Order
    let message = `*SG TECHNOLOGIES - Order Invoice*\n`;
    message += `Order ID: ${orderId}\n\n`;
    message += `*Customer Info:*\n`;
    message += `Name: ${formData.name}\n`;
    if (formData.company) message += `Company: ${formData.company}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}, ${formData.city} - ${formData.pincode}\n\n`;
    
    message += `*Products:*\n`;
    items.forEach(item => {
      message += `- ${item.name} x${item.quantity} (₹${item.price.toLocaleString()} each)\n`;
    });
    
    message += `\n*Total: ₹${getTotalPrice().toLocaleString()}*\n`;
    
    // In production, this number should come from env variables
    const whatappNumber = '1234567890'; // Replace with actual company number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and redirect
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page" style={{ textAlign: 'center', paddingTop: '150px' }}>
        <h2>Your cart is empty</h2>
        <button className="checkout-btn" onClick={() => navigate('/products')} style={{ maxWidth: '200px', margin: '2rem auto' }}>
          Go to Products
        </button>
      </div>
    );
  }

  return (
    <PageTransition className="checkout-page">
      <div className="checkout-container">
        <h1 className="page-title">Checkout</h1>
        
        <div className="checkout-grid">
          <div>
            <h3>Billing Details</h3>
            <form id="checkout-form" onSubmit={handleWhatsAppCheckout} className="checkout-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Company (Optional)</label>
                <input type="text" name="company" value={formData.company} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div className="form-group full-width">
                <label>Address *</label>
                <input required type="text" name="address" value={formData.address} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>City *</label>
                <input required type="text" name="city" value={formData.city} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Pincode *</label>
                <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} />
              </div>
            </form>
          </div>
          
          <div>
            <h3>Order Summary</h3>
            <div className="cart-summary" style={{ marginTop: '1.5rem' }}>
              {items.map(item => (
                <div key={item.id} className="summary-row" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="summary-row summary-total">
                <span>Total</span>
                <span style={{ color: 'var(--sg-red)' }}>₹{getTotalPrice().toLocaleString()}</span>
              </div>
              
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2rem', textAlign: 'center' }}>
                Invoice prepared — continue in WhatsApp to send it.
              </p>
              
              <button form="checkout-form" type="submit" className="whatsapp-btn" style={{ marginTop: '1rem' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                Send Invoice on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Checkout;
