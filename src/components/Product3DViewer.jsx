import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, PresentationControls, Stage, Environment } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

const Product3DViewer = ({ modelPath }) => {
  return (
    <div style={{ width: '100%', height: '100%', cursor: 'grab' }}>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Stage environment={null} intensity={1} contactShadow opacity={0.5} shadowBias={-0.0015}>
              <Model url={modelPath} />
            </Stage>
          </PresentationControls>
        </Suspense>
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
