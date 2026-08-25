import { Link, useLocation } from 'react-router-dom';
import { Home, Package, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import './BottomNavigation.css';

const BottomNavigation = () => {
  const location = useLocation();
  const { items } = useCartStore();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: cartItemCount },
    { path: '/contact', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="bottom-navigation glass-panel">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <div className="icon-wrapper">
              <Icon size={24} />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="cart-badge-bottom">{item.badge}</span>
              )}
            </div>
            <span className="bottom-nav-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
