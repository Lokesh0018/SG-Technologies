import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface Globe3DProps {
  zoomState: 'idle' | 'zooming' | 'done';
  onZoomComplete: () => void;
}

const EarthRig = ({ zoomState, onZoomComplete }: Globe3DProps) => {
  const earthRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (zoomState === 'zooming' && cameraRef.current && earthRef.current) {
      
      const tl = gsap.timeline({
        onComplete: onZoomComplete
      });

      // Step 1: From Space to Global View (India facing)
      tl.to(earthRef.current.rotation, {
        y: Math.PI / 4,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0);
      
      tl.to(cameraRef.current.position, {
        z: 4,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0);

      // Step 2: Zoom to India
      tl.to(cameraRef.current.position, {
        x: 1,
        y: 1,
        z: 2.5,
        duration: 1.5,
        ease: "power2.inOut"
      });

      // Step 3: Zoom to State / City
      tl.to(cameraRef.current.position, {
        x: 1.5,
        y: 1.2,
        z: 2,
        duration: 1.5,
        ease: "power2.inOut"
      });

      // Step 4: Zoom to Exact Coordinates
      tl.to(cameraRef.current.position, {
        x: 1.8,
        y: 1.3,
        z: 1.8,
        duration: 2,
        ease: "power3.in"
      });
      
    }
  }, [zoomState, onZoomComplete]);

  useFrame(() => {
    if (zoomState === 'idle' && earthRef.current) {
      earthRef.current.rotation.y += 0.001; // Slow rotation when idle
    }
    if (cameraRef.current) {
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <perspectiveCamera 
        ref={cameraRef as any}
        args={[45, window.innerWidth / window.innerHeight, 0.1, 1000]}
        position={[0, 0, 8]}
      />
      <group ref={earthRef}>
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          {/* We use a stylized wireframe + solid dark globe for a tech feel without heavy textures */}
          <meshStandardMaterial 
            color="#0a1526"
            roughness={0.7}
          />
        </mesh>
        
        <mesh scale={1.01}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial 
            color="#1d3b6e"
            wireframe={true}
            transparent={true}
            opacity={0.3}
          />
        </mesh>

        {/* Marker for SG Technologies (India rough location) */}
        <mesh position={[1.05, 0.9, 0.9]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#D2232A" />
        </mesh>
        
        {/* Glow Ring */}
        <mesh position={[1.05, 0.9, 0.9]} rotation={[Math.PI/2, 0, 0]}>
          <ringGeometry args={[0.03, 0.04, 32]} />
          <meshBasicMaterial color="#D2232A" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  );
};

const Globe3D = ({ zoomState, onZoomComplete }: Globe3DProps) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#D2232A" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <EarthRig zoomState={zoomState} onZoomComplete={onZoomComplete} />
        
        {zoomState === 'idle' && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />}
      </Canvas>
    </div>
  );
};

export default Globe3D;
