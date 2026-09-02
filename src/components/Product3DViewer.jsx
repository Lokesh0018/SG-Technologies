import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Bounds, Environment } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

const Product3DViewer = ({ modelPath }) => {
  return (
    <div style={{ width: '100%', height: '100%', cursor: 'grab' }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [5, 2, 5], fov: 45 }}>
        <color attach="background" args={['#f5f5f5']} />
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <Model url={modelPath} />
          </Bounds>
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls 
          makeDefault
          enablePan={false}
          minDistance={0.1}
          maxDistance={30}
          autoRotate={true}
          autoRotateSpeed={1.5}
        />
      </Canvas>
      
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: '0.8rem',
        color: '#888',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
        DRAG TO ROTATE
      </div>
    </div>
  );
};

export default Product3DViewer;
