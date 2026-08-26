import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { WalkieTalkie } from './WalkieTalkie';

const Scene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
      shadows
    >
      <ambientLight intensity={0.4} />
      
      {/* Studio lighting: Soft Key Light */}
      <spotLight 
        position={[-5, 10, 8]} 
        intensity={4} 
        color="#ffffff"
        castShadow
        penumbra={1}
        angle={0.8}
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Soft Fill Light */}
      <directionalLight
        position={[8, 5, -5]}
        intensity={1.5}
        color="#ffffff"
      />
      
      {/* Subtle Rim Light */}
      <spotLight
        position={[-10, 2, -10]}
        intensity={2}
        color="#ffffff"
        penumbra={1}
      />
      
      <Suspense fallback={null}>
        <Environment preset="studio" />
        
        {/* Floating is handled in WalkieTalkie. 
            Positioning X at 0.8 pushes it perfectly into the 73-76vw range 
            given the Canvas spans the whole screen. Wait, Canvas spans the whole screen! 
            Ah, in App.jsx: style={{ width: '100%', height: '100vh', position: 'fixed' }}
            If it spans 100%, then X=0 is 50vw.
            To put it at 75vw, X should be around 2.5 (given camera is at Z=7.5 and FOV 40, 
            the visible width at Z=0 is approx 2 * 7.5 * tan(20deg) = 5.46 units total.
            So from -2.73 to +2.73. 
            75vw is exactly halfway between center(50%) and right(100%), so X = 1.36. 
            Let's use X = 1.4 for the radio.
        */}
        <WalkieTalkie />
        
        {/* Soft, blurred elliptical contact shadow covering the whole floor */}
        <ContactShadows 
          position={[0, -3.8, 0]} 
          opacity={0.5} 
          scale={20} 
          blur={3.5} 
          far={6} 
          resolution={512}
          color="#000000"
        />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
