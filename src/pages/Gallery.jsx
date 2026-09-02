import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
  // Original images from main
  { id: 1, title: 'Precision CNC', category: 'Manufacturing', image: '/gallery/cnc.png' },
  { id: 2, title: 'Circuit Assembly', category: 'Engineering', image: '/gallery/circuit assembly.png' },
  { id: 3, title: 'Testing Lab', category: 'Facilities', image: '/gallery/testing lab.png' },
  { id: 4, title: 'Prototype X', category: 'Products', image: '/gallery/prototype.png' },
  { id: 5, title: 'Control Unit', category: 'Technology', image: '/gallery/control unit.png' },
  { id: 6, title: 'Automated Line', category: 'Manufacturing', image: '/gallery/automated lane.png' },
  
  // Custom Generated Photorealistic images
  { id: 7, title: 'Next-Gen CNC', category: 'Manufacturing', image: '/gallery/cnc_machining.png' },
  { id: 8, title: 'Clean SMT Line', category: 'Engineering', image: '/gallery/circuit_assembly.png' },
  { id: 9, title: 'Environmental Testing', category: 'Facilities', image: '/gallery/testing_lab.png' }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray('.reveal-image');
      
      revealElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-editorial-page" ref={containerRef} style={{ minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Header */}
      <section className="about-section hero-section" style={{ minHeight: 'auto', paddingTop: '40px', paddingBottom: '2rem' }}>
        <div className="section-label reveal-image">ARCHIVE</div>
        <h1 className="editorial-headline reveal-image" style={{ display: 'inline-block' }}>OUR<br/>GALLERY.</h1>
        <p className="editorial-paragraph reveal-image">
          A visual documentation of our precision engineering and industrial facilities.
        </p>
      </section>

      {/* Masonry Grid */}
      <section style={{ padding: '0 5vw 10vh 5vw' }}>
        <div className="editorial-masonry-grid">
          {galleryData.map(item => (
            <div 
              key={item.id} 
              className="editorial-masonry-item reveal-image"
              onClick={() => setSelectedImage(item)}
            >
              <img src={item.image} alt={item.title} />
              <div className="masonry-overlay">
                <div className="masonry-cat">{item.category}</div>
                <div className="masonry-title">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="editorial-lightbox" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close" onClick={() => setSelectedImage(null)}>✕</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.image} alt={selectedImage.title} />
            <div className="lightbox-info">
              <h2 className="editorial-subheadline">{selectedImage.title}</h2>
              <p className="editorial-paragraph">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;
