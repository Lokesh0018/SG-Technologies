import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Edges } from '@react-three/drei';
import * as THREE from 'three';

const Core = () => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (outerRef.current) {
      outerRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      outerRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -state.clock.getElapsedTime() * 0.4;
      innerRef.current.rotation.y = -state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      {/* Outer abstract mechanical shell */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} transparent opacity={0.8} wireframe />
          <Edges color="#D2232A" />
        </mesh>
      </Float>

      {/* Inner glowing core */}
      <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
        <mesh ref={innerRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#D2232A"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </Float>
    </group>
  );
};

const MechanicalCore3D = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#D2232A" />
        
        <Core />
        
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export default MechanicalCore3D;
