import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows, Text } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

// Dummy parts for the Walkie-Talkie since we don't have a real .glb model yet
const WalkieTalkieParts = ({ isExploded }: { isExploded: boolean }) => {
  const group = useRef<THREE.Group>(null);
  
  // Distances for exploded view
  const offset = isExploded ? 1.5 : 0;
  
  const transition = { type: 'spring', stiffness: 50, damping: 20 };

  return (
    <group ref={group}>
      {/* Back Casing */}
      <motion.mesh
        position-z={isExploded ? -offset * 1.5 : 0}
        transition={transition}
      >
        <boxGeometry args={[1.4, 3, 0.4]} />
        <meshStandardMaterial color="#111111" roughness={0.7} />
      </motion.mesh>

      {/* PCB / Internal Board */}
      <motion.mesh
        position-z={isExploded ? -offset * 0.5 : 0.1}
        transition={transition}
      >
        <boxGeometry args={[1.2, 2.8, 0.1]} />
        <meshStandardMaterial color="#2d5e2e" roughness={0.8} />
      </motion.mesh>

      {/* Battery (Slides down) */}
      <motion.mesh
        position-y={isExploded ? -offset * 2 : -0.5}
        position-z={isExploded ? -offset : 0}
        transition={transition}
      >
        <boxGeometry args={[1.2, 1.2, 0.3]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </motion.mesh>

      {/* Front Panel */}
      <motion.mesh
        position-z={isExploded ? offset : 0.3}
        transition={transition}
      >
        <boxGeometry args={[1.4, 3, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </motion.mesh>

      {/* Screen */}
      <motion.mesh
        position-y={0.8}
        position-z={isExploded ? offset + 0.1 : 0.41}
        transition={transition}
      >
        <boxGeometry args={[1, 0.6, 0.05]} />
        <meshStandardMaterial color="#0a2a0a" emissive="#0a2a0a" />
      </motion.mesh>

      {/* Speaker Grill */}
      <motion.mesh
        position-y={-0.5}
        position-z={isExploded ? offset * 1.5 : 0.41}
        transition={transition}
      >
        <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
        <meshStandardMaterial color="#050505" />
      </motion.mesh>

      {/* Antenna (Slides up) */}
      <motion.mesh
        position-x={-0.4}
        position-y={isExploded ? offset * 2 + 1.5 : 2}
        transition={transition}
      >
        <cylinderGeometry args={[0.08, 0.1, 1.5, 16]} />
        <meshStandardMaterial color="#111" roughness={0.4} />
      </motion.mesh>

      {/* Top Knob */}
      <motion.mesh
        position-x={0.4}
        position-y={isExploded ? offset + 1.5 : 1.6}
        transition={transition}
      >
        <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
        <meshStandardMaterial color="#D2232A" roughness={0.3} metalness={0.5} />
      </motion.mesh>
    </group>
  );
};

export const WalkieTalkie3D = ({ isExploded, autoRotate }: { isExploded: boolean, autoRotate: boolean }) => {
  return (
    <Canvas camera={{ position: [4, 2, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#D2232A" />
      
      <Float speed={autoRotate ? 2 : 0} rotationIntensity={autoRotate ? 0.2 : 0} floatIntensity={autoRotate ? 0.2 : 0}>
        <group position={[0, 0, 0]}>
          <WalkieTalkieParts isExploded={isExploded} />
        </group>
      </Float>

      <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minDistance={3} 
        maxDistance={10}
        autoRotate={autoRotate && !isExploded}
        autoRotateSpeed={1}
      />
      <Environment preset="city" />
    </Canvas>
  );
};
