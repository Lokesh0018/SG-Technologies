import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray('.c-reveal');
      revealElements.forEach((el, index) => {
        gsap.fromTo(el, 
          { y: 30, opacity: 0 }, 
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
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page" ref={containerRef} style={{ minHeight: '100vh', backgroundColor: '#f7f7f5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <h1 className="editorial-headline c-reveal" style={{ fontSize: '4rem', marginBottom: '1rem' }}>CART IS EMPTY.</h1>
        <p className="editorial-paragraph c-reveal" style={{ marginBottom: '3rem' }}>Your shopping bag currently has no items.</p>
        <Link to="/products" className="c-reveal" style={{
          fontFamily: '"Syne", sans-serif',
          fontWeight: '700',
          fontSize: '1rem',
          letterSpacing: '1px',
          backgroundColor: '#111',
          color: '#fff',
          textDecoration: 'none',
          padding: '1.2rem 3rem',
          transition: 'background-color 0.3s'
        }}>
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page" ref={containerRef} style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7f7f5', paddingTop: '15vh' }}>
      
      {/* Left Side: Cart Items */}
      <div style={{ flex: 1.5, padding: '0 5vw', display: 'flex', flexDirection: 'column' }}>
        
        <h1 className="editorial-headline c-reveal" style={{ 
          fontSize: 'clamp(3rem, 5vw, 5rem)', 
          lineHeight: '0.9',
          letterSpacing: '-0.02em',
          margin: '0 0 4rem 0'
        }}>
          YOUR<br/>CART.
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {cartItems.map((item) => (
            <div key={item.id} className="c-reveal" style={{ 
              display: 'flex', 
              gap: '2rem',
              paddingBottom: '2rem',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <div style={{ width: '150px', height: '150px', backgroundColor: '#fff', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {item.category || 'Communication'}
                </div>
                <h3 style={{ fontFamily: '"Syne", sans-serif', fontSize: '1.5rem', fontWeight: '700', margin: '0 0 1rem 0' }}>
                  {item.name}
                </h3>
                {/* Price removed */}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', padding: '1rem 0' }}>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'none', border: 'none', fontFamily: '"Courier New", Courier, monospace', fontSize: '0.9rem', color: '#888', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  REMOVE
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', fontSize: '1.2rem' }}>-</button>
                  <span style={{ fontFamily: '"Courier New", Courier, monospace', fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: '"Inter", sans-serif', fontSize: '1.2rem' }}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Right Side: Order Summary */}
      <div style={{ flex: 1, padding: '0 5vw', display: 'flex', flexDirection: 'column' }}>
        <div className="c-reveal" style={{ 
          position: 'sticky', 
          top: '15vh', 
          backgroundColor: '#fff', 
          padding: '3rem', 
          boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
          borderRadius: '12px',
          border: '1px solid #e0e0e0'
        }}>
          <h2 style={{ fontFamily: '"Syne", sans-serif', fontSize: '1.8rem', fontWeight: '700', margin: '0 0 2rem 0' }}>ENQUIRY SUMMARY</h2>
          
          <p style={{ color: '#666', fontFamily: '"Inter", sans-serif', marginBottom: '3rem', lineHeight: 1.5 }}>
             Submit your enquiry to receive a detailed quote for the selected items and quantities.
          </p>

          <button 
            onClick={() => navigate('/checkout')}
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
            PROCEED TO ENQUIRY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
