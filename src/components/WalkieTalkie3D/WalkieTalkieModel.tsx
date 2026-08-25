import { useRef, useEffect } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

interface WalkieTalkieModelProps {
  modelPath: string;
  isExploded: boolean;
}

export function WalkieTalkieModel({ modelPath, isExploded }: WalkieTalkieModelProps) {
  // We use useGLTF to load the model. 
  // It handles caching and loading automatically.
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (isExploded) {
      console.log("Exploded view requested, but current model does not support it.");
    }
  }, [isExploded]);

  return (
    <group ref={groupRef} dispose={null}>
      {/* 
        Using Center ensures that any dynamic model loaded (Walkie-Talkie, Camera, etc)
        will automatically be centered at the origin, regardless of its original pivot point.
        The Bounds component in the parent will then handle scaling the camera to fit.
      */}
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

// Preloading is optional here because we want to lazy load it only on the product page,
// but useGLTF.preload can be used if we know the user is navigating here.
// useGLTF.preload('/walkie_talkie__3d_communication_device.glb');
