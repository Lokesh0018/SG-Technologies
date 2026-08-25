import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition/PageTransition';
import PullToRefresh from '../../components/PullToRefresh/PullToRefresh';
import { useCartStore } from '../../store/cartStore';
import './Products.css';

// Dummy product data
const productsData = [
  {
    id: 'walkie-talkie-pro',
    name: 'Walkie-Talkie Pro X',
    price: 14999,
    category: 'Communication Devices',
    description: 'Advanced industrial communication device with extreme durability.',
    image: '/wlakie talkie/walkie talkie.png'
  },
  {
    id: 'cc-camera',
    name: 'Industrial CC Camera',
    price: 8499,
    category: 'Security Systems',
    description: 'High-definition industrial security camera with night vision and robust casing.',
    image: '/camera/cc camera.png'
  },
  {
    id: 'poc-lte-radio',
    name: 'PoC LTE Radio',
    price: 18999,
    category: 'Communication Devices',
    description: 'Next-generation Push-to-Talk over Cellular (PoC) LTE radio for global coverage.',
    image: '/poc-lte radio/poc-lte-radio.png'
  }
];

const Products = () => {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
    // In a full implementation, we might show a toast notification here
  };

  const handleRefresh = async () => {
    // Simulate network request
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  };

  return (
    <PageTransition className="products-page">
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="products-container">
          <h1 className="page-heading">Our Products</h1>
          

          <div className="products-grid">
          {productsData.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                {product.image ? (
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1.5rem' }} />
                ) : (
                  <span className="sg-logo-icon" style={{ opacity: 0.2 }}>SG</span>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <span className="product-category">{product.category}</span>
                <div className="product-price">₹{product.price.toLocaleString()}</div>
                
                <div className="product-actions">
                  <button 
                    className="btn-add-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <Link 
                    to={`/products/${product.id}`}
                    className="btn-view-details"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </PullToRefresh>
    </PageTransition>
  );
};

export default Products;
