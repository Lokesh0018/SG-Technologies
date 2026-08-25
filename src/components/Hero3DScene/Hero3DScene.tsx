import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './Hero3DScene.css';

// Floating mechanical parts placeholder
const FloatingParts = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-4, 2, -5]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#333333" wireframe />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[5, -1, -3]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#D2232A" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-2, -3, -6]}>
          <torusGeometry args={[1.5, 0.4, 16, 100]} />
          <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[3, 3, -4]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#111111" wireframe />
        </mesh>
      </Float>
    </group>
  );
};

const Hero3DScene = () => {
  return (
    <div className="hero-3d-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={['#0A0A0C']} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
        <spotLight position={[-10, -10, -10]} intensity={2} color="#D2232A" distance={20} angle={0.5} penumbra={1} />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <FloatingParts />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
