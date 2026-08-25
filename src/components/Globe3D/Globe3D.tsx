import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface Globe3DProps {
  zoomState: 'idle' | 'zooming' | 'done';
  onZoomComplete: () => void;
}

// Convert Latitude / Longitude to a Vector3 on a sphere of given radius
const latLongToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
};

// Target SG Technologies Coordinates (India)
const TARGET_LAT = 12.9716;
const TARGET_LON = 77.5946;
const EARTH_RADIUS = 1.5;

const RealisticEarth = () => {
  const earthRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  // Official three.js example textures hosted on raw.githubusercontent
  const [colorMap, normalMap, cloudsMap, specularMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'
  ]);

  useFrame(() => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0003; // Clouds move slightly faster than Earth
    }
  });

  return (
    <group ref={earthRef}>
      {/* 1. Earth Surface */}
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial 
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={specularMap}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* 2. Cloud Layer */}
      <mesh ref={cloudsRef} scale={1.012}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshLambertMaterial 
          map={cloudsMap}
          transparent={true}
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Atmosphere Glow (Backside rendered) */}
      <mesh scale={1.04}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshBasicMaterial 
          color="#4b96ff"
          transparent={true}
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

const EarthRig = ({ zoomState, onZoomComplete }: Globe3DProps) => {
  const rigRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  // Calculate target point exactly
  const targetPoint = latLongToVector3(TARGET_LAT, TARGET_LON, EARTH_RADIUS);

  useEffect(() => {
    if (zoomState === 'zooming' && cameraRef.current && rigRef.current) {
      
      // Calculate a point slightly above the exact coordinate for the final zoom
      const zoomedPosition = targetPoint.clone().normalize().multiplyScalar(EARTH_RADIUS + 0.15);
      
      const tl = gsap.timeline({
        onComplete: onZoomComplete
      });

      // Phase 1: From Space to Mid-Orbit (focusing above target location)
      tl.to(cameraRef.current.position, {
        x: targetPoint.x * 2.5,
        y: targetPoint.y * 2.5,
        z: targetPoint.z * 2.5,
        duration: 2.5,
        ease: "power2.inOut"
      }, 0);

      // Ensure the rig is aligned during the zoom
      tl.to(rigRef.current.rotation, {
        y: 0, 
        duration: 2.5,
        ease: "power2.inOut"
      }, 0);

      // Phase 2: Close Zoom directly into the exact surface coordinates
      tl.to(cameraRef.current.position, {
        x: zoomedPosition.x,
        y: zoomedPosition.y,
        z: zoomedPosition.z,
        duration: 2.5,
        ease: "power3.in"
      });
      
    }
  }, [zoomState, onZoomComplete, targetPoint]);

  useFrame(() => {
    if (zoomState === 'idle' && rigRef.current) {
      rigRef.current.rotation.y += 0.001; // Slow rotation when idle
    }
    if (cameraRef.current) {
      // Camera always looks at center of Earth
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
      <group ref={rigRef}>
        <RealisticEarth />
        
        {/* Exact Location Marker */}
        <mesh position={targetPoint.toArray()}>
          <sphereGeometry args={[0.015, 16, 16]} />
          <meshBasicMaterial color="#D2232A" />
        </mesh>
        
        {/* Location Marker Glow */}
        <mesh position={targetPoint.toArray()} rotation={[Math.PI/2, 0, 0]}>
          <ringGeometry args={[0.02, 0.04, 32]} />
          <meshBasicMaterial color="#D2232A" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  );
};

const Globe3D = ({ zoomState, onZoomComplete }: Globe3DProps) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas>
        <ambientLight intensity={0.1} />
        {/* Sun Directional Light to create dramatic day/night terminator */}
        <directionalLight position={[8, 3, 5]} intensity={2.5} color="#ffffff" />
        {/* Subtle fill light for the dark side */}
        <directionalLight position={[-5, -3, -5]} intensity={0.2} color="#4b96ff" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        
        <Suspense fallback={null}>
          <EarthRig zoomState={zoomState} onZoomComplete={onZoomComplete} />
        </Suspense>
        
        {zoomState === 'idle' && (
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate={false} 
          />
        )}
      </Canvas>
    </div>
  );
};

export default Globe3D;
