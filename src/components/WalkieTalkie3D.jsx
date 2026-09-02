import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Pre-load the model
useGLTF.preload('/walkie_talkie__3d_communication_device.glb');

const Model = ({ progressRef }) => {
  const { scene } = useGLTF('/walkie_talkie__3d_communication_device.glb');
  const groupRef = useRef();
  
  // Create a material for the signal effect (useMemo avoids recreating it, and is safe for render)
  const signalMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: '#ff3300', transparent: true, opacity: 0 }), []);

  // Clone the scene so we can modify its materials safely if needed
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (!groupRef.current || !progressRef) return;
    
    const progress = progressRef.current; // Read from mutable ref (no re-renders!)
    
    // Waypoint 0 (Start: Left, somewhat small)
    const wp0Pos = new THREE.Vector3(-4, -2, -1);
    const wp0Scale = new THREE.Vector3(10, 10, 10);
    const wp0Rot = new THREE.Euler(0.2, -Math.PI / 4, 0.1);
    
    // Waypoint 1 (Middle: Center, big)
    const wp1Pos = new THREE.Vector3(0, -2, 2); 
    const wp1Scale = new THREE.Vector3(15, 15, 15);
    const wp1Rot = new THREE.Euler(0.1, 0, 0);

    // Waypoint 2 (End: Complete Right, receives signals)
    const wp2Pos = new THREE.Vector3(4, -2, 1); 
    const wp2Scale = new THREE.Vector3(12, 12, 12);
    const wp2Rot = new THREE.Euler(0.1, Math.PI / 4, -0.05);

    let blurAmount = 0;

    // Single one-way animation (Left -> Center -> Right)
    if (progress < 0.5) {
      // Phase 1: Left to Center
      const localProgress = progress * 2; // scale 0-0.5 to 0-1
      groupRef.current.position.lerpVectors(wp0Pos, wp1Pos, localProgress);
      groupRef.current.scale.lerpVectors(wp0Scale, wp1Scale, localProgress);
      
      const qStart = new THREE.Quaternion().setFromEuler(wp0Rot);
      const qEnd = new THREE.Quaternion().setFromEuler(wp1Rot);
      groupRef.current.quaternion.slerpQuaternions(qStart, qEnd, localProgress);
    } else {
      // Phase 2: Center to Right
      const localProgress = (progress - 0.5) * 2; // scale 0.5-1.0 to 0-1
      groupRef.current.position.lerpVectors(wp1Pos, wp2Pos, localProgress);
      groupRef.current.scale.lerpVectors(wp1Scale, wp2Scale, localProgress);
      
      const qStart = new THREE.Quaternion().setFromEuler(wp1Rot);
      const qEnd = new THREE.Quaternion().setFromEuler(wp2Rot);
      groupRef.current.quaternion.slerpQuaternions(qStart, qEnd, localProgress);
    }
    
    // Floating animation
    const floatOffset = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    groupRef.current.position.y += floatOffset;
    
    // Signal effect logic (triggers at the very end of the scroll)
    if (progress > 0.95) {
      const pulse = (Math.sin(state.clock.elapsedTime * 10) + 1) / 2; // 0 to 1 fast pulse
      signalMaterial.opacity = pulse * 0.8;
    } else {
      signalMaterial.opacity = 0;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* 
        We use the cloned scene. The bounding box of the model dictates where [0,0,0] is.
        If the antenna is at the top, we can place the rings at a hardcoded Y offset.
      */}
      <primitive object={clonedScene} />
      
      {/* Signal Effect Rings (placed near the top of the model to simulate antenna rings) */}
      <mesh position={[0, 4.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.7, 32]} />
        <primitive object={signalMaterial} attach="material" />
      </mesh>
      
      <mesh position={[0, 5.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.2, 32]} />
        <primitive object={signalMaterial} attach="material" />
      </mesh>
    </group>
  );
};

const WalkieTalkie3D = ({ progressRef }) => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 20 }}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#ff3300" />
        
        {/* Studio environment for realistic metallic reflections */}
        <Environment preset="studio" />
        
        <Suspense fallback={null}>
          <Model progressRef={progressRef} />
        </Suspense>
        
        {/* Sparkles effect */}
        <Sparkles count={150} scale={14} size={3} speed={0.5} opacity={0.8} color="#ff3300" />
      </Canvas>
    </div>
  );
};

export default WalkieTalkie3D;
