import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import PageTransition from '../../components/PageTransition/PageTransition';
import './Gallery.css';

const galleryData = [
  { id: 1, title: 'Precision CNC', category: 'Manufacturing', image: '/gallery/cnc.png', height: 300 },
  { id: 2, title: 'Circuit Assembly', category: 'Engineering', image: '/gallery/circuit assembly.png', height: 400 },
  { id: 3, title: 'Prototype X', category: 'Products', image: '/gallery/prototype.png', height: 250 },
  { id: 4, title: 'Testing Lab', category: 'Facilities', image: '/gallery/testing lab.png', height: 350 },
  { id: 5, title: 'Control Unit', category: 'Technology', image: '/gallery/control unit.png', height: 300 },
  { id: 6, title: 'Automated Line', category: 'Manufacturing', image: '/gallery/automated lane.png', height: 450 },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  return (
    <PageTransition className="gallery-page">
      <div className="gallery-container">
        <h1 className="page-heading">Innovation Gallery</h1>

        <div className="masonry-grid">
          {galleryData.map(item => (
            <div
              key={item.id}
              className="gallery-item"
              onClick={() => setSelectedImage(item)}
              style={{ minHeight: `${item.height}px` }}
            >
              <div
                className="gallery-item-image"
                style={{
                  height: `${item.height}px`,
                  backgroundImage: `url('${item.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div className="gallery-item-overlay">
                <h3 className="gallery-item-title">{item.title}</h3>
                <span className="gallery-item-category">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="lightbox-content">
              <button
                className="lightbox-close"
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} />
              </button>
              <div
                className="lightbox-image"
                style={{
                  width: '80vw',
                  height: '60vh',
                  backgroundImage: `url('${selectedImage.image}')`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  border: '1px solid var(--border-light)'
                }}
              />
              <div className="lightbox-info">
                <h2>{selectedImage.title}</h2>
                <p style={{ color: 'var(--sg-red)' }}>{selectedImage.category}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Gallery;
