import { useRef, useEffect } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

interface WalkieTalkieModelProps {
  modelPath: string;
  isExploded: boolean;
}

export function WalkieTalkieModel({ modelPath, isExploded }: WalkieTalkieModelProps) {
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
        Using Center without 'bottom' guarantees the mesh's center of mass 
        is exactly at [0,0,0], preventing awkward top-heavy framing.
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
