import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface Globe3DProps {
  zoomState: 'idle' | 'zooming' | 'done';
  onZoomComplete: () => void;
}

// Convert Latitude / Longitude to a Vector3 on a sphere of given radius
const latLongToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  // Three.js Spherical coordinates:
  // phi is the polar angle from the Y (up) axis (0 to PI).
  const phi = (90 - lat) * (Math.PI / 180);
  
  // theta is the equator angle around the Y axis, starting from +Z.
  // The texture maps Greenwich (lon=0) to the center (-Z). 
  // Therefore, we offset longitude by 180 degrees to map it to -Z.
  // We use negative longitude because Three.js theta goes counter-clockwise (+X), 
  // while East on the map goes clockwise (-X).
  const theta = (-lon + 180) * (Math.PI / 180);

  const spherical = new THREE.Spherical(radius, phi, theta);
  const vec = new THREE.Vector3().setFromSpherical(spherical);
  return vec;
};

// Target SG Technologies Coordinates (Visakhapatnam, India)
const TARGET_LAT = 17.8333;
const TARGET_LON = 83.2000;
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
  
  // Use the default R3F canvas camera 
  const { camera } = useThree();
  
  // Calculate target point exactly (local to the rig)
  const targetPoint = latLongToVector3(TARGET_LAT, TARGET_LON, EARTH_RADIUS);

  useEffect(() => {
    // Set initial camera position if we are idle
    if (zoomState === 'idle') {
      camera.position.set(0, 0, 8);
    }

    if (zoomState === 'zooming' && rigRef.current) {
      
      // Calculate the target's current world position based on current rig rotation
      const currentRigY = rigRef.current.rotation.y;
      const worldTarget = targetPoint.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), currentRigY);
      
      // Calculate a point slightly above the exact world coordinate for the final zoom
      const worldZoomed = worldTarget.clone().normalize().multiplyScalar(EARTH_RADIUS + 0.15);
      
      const tl = gsap.timeline({
        onComplete: onZoomComplete
      });

      // Phase 1: From Space to Mid-Orbit (fly camera to current world orientation)
      tl.to(camera.position, {
        x: worldTarget.x * 2.5,
        y: worldTarget.y * 2.5,
        z: worldTarget.z * 2.5,
        duration: 2.5,
        ease: "power2.inOut"
      }, 0);

      // We completely remove the rigorous rig rotation animation to prevent "crazy spinning" jumps
      // The rig will simply pause its idle spin, and the camera flies to wherever India is right now.

      // Phase 2: Close Zoom directly into the exact surface coordinates
      tl.to(camera.position, {
        x: worldZoomed.x,
        y: worldZoomed.y,
        z: worldZoomed.z,
        duration: 2.5,
        ease: "power3.in"
      });
      
    }
  }, [zoomState, onZoomComplete, targetPoint, camera]);

  useFrame(() => {
    if (zoomState === 'idle' && rigRef.current) {
      rigRef.current.rotation.y += 0.001; // Slow rotation when idle
    }
    
    // Camera always looks at center of Earth
    camera.lookAt(0, 0, 0);
  });

  return (
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
