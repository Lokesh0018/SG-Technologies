import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '../../components/PageTransition/PageTransition';
import Product3DViewer from '../../components/Product3DViewer/Product3DViewer';
import { useCartStore } from '../../store/cartStore';
import './ProductDetails.css';

const ProductDetails = () => {
  const { slug } = useParams();
  const addItem = useCartStore(state => state.addItem);

  // In a real app, fetch product by slug
  const productsDatabase: Record<string, any> = {
    'walkie-talkie-pro': {
      id: 'walkie-talkie-pro',
      name: 'Walkie-Talkie Pro X',
      price: 14999,
      category: 'Communication Devices',
      description: 'The ultimate industrial communication device. Engineered with precision mechanical components, long-lasting battery, and extreme environmental resistance. Designed for real-world heavy duty applications.',
      modelPath: '/wlakie talkie/walkie_talkie__3d_communication_device.glb',
      specs: [
        { label: 'Range', value: '15 km' },
        { label: 'Battery Life', value: '48 Hours' },
        { label: 'Water Resistance', value: 'IP68' },
        { label: 'Weight', value: '350g' }
      ],
      attribution: '"Walkie Talkie – 3D Communication Device" by GAMICO, licensed under Creative Commons Attribution 4.0 (CC-BY-4.0).'
    },
    'cc-camera': {
      id: 'cc-camera',
      name: 'Industrial CC Camera',
      price: 8499,
      category: 'Security Systems',
      description: 'High-definition industrial security camera. Features infrared night vision, extreme weather resistance, and 4K continuous recording capabilities.',
      modelPath: '/camera/camera_11.glb',
      specs: [
        { label: 'Resolution', value: '4K Ultra HD' },
        { label: 'Night Vision', value: 'Up to 30m' },
        { label: 'Weather Rating', value: 'IP67' },
        { label: 'Connectivity', value: 'PoE / Wi-Fi 6' }
      ]
    },
    'power-cell': {
      id: 'power-cell',
      name: 'Heavy Duty Power Cell',
      price: 8999,
      category: 'Industrial Products',
      description: 'Long-lasting industrial power source.',
      specs: []
    }
  };

  const product = productsDatabase[slug || 'walkie-talkie-pro'] || productsDatabase['walkie-talkie-pro'];

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
          {product.modelPath ? (
            <Product3DViewer modelPath={product.modelPath} />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <p>3D Model not available for this product</p>
            </div>
          )}
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

          <button className="add-to-cart-large" onClick={handleAddToCart} style={{ marginBottom: '1.5rem' }}>
            Add to Cart
          </button>
          
          {product.attribution && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '1rem', marginTop: 'auto' }}>
              <strong>Model Attribution:</strong> {product.attribution}
            </div>
          )}
        </div>

      </div>
    </PageTransition>
  );
};

export default ProductDetails;
