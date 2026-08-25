import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
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

  // We are keeping this modular. Since this specific GLB does not support exploded views,
  // we just render the complete scene.
  // When a new model is provided, this component can be updated to animate child nodes.
  
  useEffect(() => {
    // If we had a component-separated model, we would apply GSAP animations here
    // based on the isExploded prop.
    if (isExploded) {
      console.log("Exploded view requested, but current model does not support it.");
    }
  }, [isExploded]);

  return (
    <group ref={groupRef} dispose={null}>
      {/* We apply a scale and slight position adjustment if needed to fit the camera well */}
      <primitive object={scene} scale={2} position={[0, -2, 0]} />
    </group>
  );
}

// Preloading is optional here because we want to lazy load it only on the product page,
// but useGLTF.preload can be used if we know the user is navigating here.
// useGLTF.preload('/walkie_talkie__3d_communication_device.glb');
