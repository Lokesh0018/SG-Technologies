import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';

interface Globe3DProps {
  zoomedIn: boolean;
  onAnimationComplete: () => void;
}

const Earth = ({ zoomedIn, onAnimationComplete }: Globe3DProps) => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  // Transition definition for smooth zoom
  const transition = { type: 'tween', duration: 3, ease: 'easeInOut' };

  useFrame((state) => {
    if (earthRef.current && !zoomedIn) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  useEffect(() => {
    if (zoomedIn) {
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 3000); // Matches transition duration
      return () => clearTimeout(timer);
    }
  }, [zoomedIn, onAnimationComplete]);

  return (
    <motion.group
      initial={{ scale: 1, z: 0 }}
      animate={{ 
        scale: zoomedIn ? 5 : 1, 
        z: zoomedIn ? 10 : 0,
        rotateX: zoomedIn ? Math.PI / 6 : 0,
        rotateY: zoomedIn ? -Math.PI / 4 : 0
      }}
      transition={transition}
    >
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          color="#0a1526"
          roughness={0.8}
          metalness={0.2}
          wireframe={true} // Using wireframe since we don't have earth textures
        />
      </mesh>
      
      {/* Location Marker */}
      <motion.mesh
        position={[1.5, 1, 1]} // Approximate location
        initial={{ scale: 0 }}
        animate={{ scale: zoomedIn ? 0.2 : 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#D2232A" />
      </motion.mesh>
    </motion.group>
  );
};

const Globe3D = ({ zoomedIn, onAnimationComplete }: Globe3DProps) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#D2232A" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Earth zoomedIn={zoomedIn} onAnimationComplete={onAnimationComplete} />
        
        {!zoomedIn && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
    </div>
  );
};

export default Globe3D;
