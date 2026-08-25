import { useState, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Bounds, BakeShadows } from '@react-three/drei';
import { FaExpand, FaCompress, FaSyncAlt } from 'react-icons/fa';
import { WalkieTalkieModel } from '../WalkieTalkie3D/WalkieTalkieModel';
import './Product3DViewer.css';

interface Product3DViewerProps {
  modelPath: string;
}

const Product3DViewer = ({ modelPath }: Product3DViewerProps) => {
  const [isExploded, setIsExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleResetCamera = () => {
    // Instead of orbitControls.reset() which conflicts with <Bounds>,
    // we fully remount the canvas to let <Bounds> recalculate the perfect fit.
    setResetKey(prev => prev + 1);
  };

  // Check if we are on a mobile device to reduce effects
  const isMobile = window.innerWidth <= 768;

  return (
    <div ref={containerRef} className={`product-viewer-container ${isFullscreen ? 'fullscreen' : ''}`}>
      
      <div className="viewer-top-controls">
        <button className="viewer-icon-btn" onClick={handleResetCamera} title="Reset Camera">
          <FaSyncAlt size={16} />
        </button>
        <button className="viewer-icon-btn" onClick={toggleFullscreen} title="Toggle Fullscreen">
          {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
        </button>
      </div>

      <Canvas key={resetKey} shadows={!isMobile} camera={{ position: [5, 2, 5], fov: 45 }}>
        <color attach="background" args={['#0a0a0c']} />
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow={!isMobile} shadow-mapSize={1024} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            {/* 
              Currently we hardcode the WalkieTalkieModel since we only have one type of product,
              but this could easily dynamically switch components based on modelPath later.
            */}
            <WalkieTalkieModel modelPath={modelPath} isExploded={isExploded} />
          </Bounds>
          <Environment preset="city" />
          {!isMobile && <BakeShadows />}
        </Suspense>

        <OrbitControls 
          ref={controlsRef}
          makeDefault
          enablePan={false}
          minDistance={0.1}
          maxDistance={30}
          autoRotate={autoRotate && !isExploded}
          autoRotateSpeed={1.5}
        />
      </Canvas>

      <div className="viewer-overlay-controls">
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
      
      {/* Loading state indicator overlay */}
      <div id="loading-indicator" style={{ display: 'none' }} className="loading-model">Loading...</div>
    </div>
  );
};

export default Product3DViewer;
