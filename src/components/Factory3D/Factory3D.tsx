import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const FactoryMachine = () => {
  const armRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (armRef.current) {
      armRef.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.5;
    }
  });

  return (
    <group>
      {/* Base */}
      <Box args={[2, 0.5, 2]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#222" />
      </Box>
      
      {/* Pillar */}
      <Cylinder args={[0.3, 0.4, 2]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#444" metalness={0.8} />
      </Cylinder>
      
      {/* Moving Arm */}
      <group ref={armRef} position={[0, 1.5, 0]}>
        <Box args={[2.5, 0.3, 0.3]} position={[1, 0, 0]}>
          <meshStandardMaterial color="#D2232A" roughness={0.2} />
        </Box>
        {/* Tool */}
        <Cylinder args={[0.1, 0.1, 0.8]} position={[2, -0.4, 0]}>
          <meshStandardMaterial color="#aaa" metalness={0.9} />
        </Cylinder>
      </group>
    </group>
  );
};

const Factory3D = () => {
  return (
    <Canvas camera={{ position: [4, 3, 4], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      
      <FactoryMachine />
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

export default Factory3D;
