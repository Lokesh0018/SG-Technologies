import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import PageTransition from '../../components/PageTransition/PageTransition';
import SwipeableItem from '../../components/SwipeableItem/SwipeableItem';
import { useCartStore } from '../../store/cartStore';
import './Cart.css';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  return (
    <PageTransition className="cart-page">
      <div className="cart-container">
        <h1 className="page-title">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="empty-cart card">
            <ShoppingCart className="empty-cart-icon" size={64} />
            <h2>Your cart is currently empty.</h2>
            <p className="empty-cart-text">Looks like you haven't added anything yet.</p>
            <Link to="/products" className="checkout-btn" style={{ maxWidth: '200px', margin: '2rem auto' }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <SwipeableItem key={item.id} onDelete={() => removeItem(item.id)}>
                  <div className="cart-item glass-panel" style={{ border: 'none' }}>
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                    </div>
                    
                    <div className="cart-item-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="item-qty">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                      {/* Hide standard remove button on mobile, but keep it for desktop */}
                      <button 
                        className="remove-btn desktop-only"
                        onClick={() => removeItem(item.id)}
                        style={{ marginLeft: '1rem' }}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </SwipeableItem>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span style={{ color: 'var(--sg-red)' }}>₹{getTotalPrice().toLocaleString()}</span>
              </div>
              
              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </PageTransition>
  );
};

export default Cart;
