import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '../../components/PageTransition/PageTransition';
import { WalkieTalkie3D } from '../../components/WalkieTalkie3D/WalkieTalkie3D';
import { useCartStore } from '../../store/cartStore';
import './ProductDetails.css';

const ProductDetails = () => {
  const { slug } = useParams();
  const addItem = useCartStore(state => state.addItem);
  
  const [isExploded, setIsExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // In a real app, fetch product by slug
  const product = {
    id: slug || 'walkie-talkie-pro',
    name: 'Walkie-Talkie Pro X',
    price: 14999,
    category: 'Communication Devices',
    description: 'The ultimate industrial communication device. Engineered with precision mechanical components, long-lasting battery, and extreme environmental resistance. Designed for real-world heavy duty applications.',
    specs: [
      { label: 'Range', value: '15 km' },
      { label: 'Battery Life', value: '48 Hours' },
      { label: 'Water Resistance', value: 'IP68' },
      { label: 'Weight', value: '350g' }
    ]
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  };

  return (
    <PageTransition className="product-details-page">
      <div className="product-details-container">
        
        {/* 3D Viewer Area */}
        <div className="product-3d-viewer">
          {slug === 'walkie-talkie-pro' || !slug ? (
            <WalkieTalkie3D isExploded={isExploded} autoRotate={autoRotate} />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <p>3D Model not available for this product</p>
            </div>
          )}

          <div className="viewer-controls">
            <button 
              className={`viewer-btn ${!isExploded ? 'active' : ''}`}
              onClick={() => setIsExploded(false)}
            >
              Assemble
            </button>
            <button 
              className={`viewer-btn ${isExploded ? 'active' : ''}`}
              onClick={() => setIsExploded(true)}
            >
              Explode View
            </button>
            <button 
              className={`viewer-btn ${autoRotate ? 'active' : ''}`}
              onClick={() => setAutoRotate(!autoRotate)}
            >
              Auto Rotate
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="product-info-panel">
          <h1 className="pd-title">{product.name}</h1>
          <div className="pd-category">{product.category}</div>
          <div className="pd-price">₹{product.price.toLocaleString()}</div>
          
          <p className="pd-description">{product.description}</p>
          
          <div className="pd-specs">
            <h4>Specifications</h4>
            <ul className="spec-list">
              {product.specs.map((spec, idx) => (
                <li key={idx} className="spec-item">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="add-to-cart-large" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

      </div>
    </PageTransition>
  );
};

export default ProductDetails;
