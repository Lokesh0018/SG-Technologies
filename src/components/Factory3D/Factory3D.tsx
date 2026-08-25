import { useRef, useEffect, useLayoutEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF, Bounds, ContactShadows, BakeShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Pre-defined cinematic camera states for the 6 stages.
// Now that the model is normalized to ~10 units wide, these camera coordinates will work beautifully.
const cameraStates = [
  { pos: new THREE.Vector3(12, 8, 12), target: new THREE.Vector3(0, -1, 0) },   // 01: DESIGN - Three-quarter overview
  { pos: new THREE.Vector3(-8, 5, 10), target: new THREE.Vector3(-2, 0, 2) },   // 02: PROTOTYPE
  { pos: new THREE.Vector3(-10, 8, -10), target: new THREE.Vector3(0, 0, 0) },  // 03: MANUFACTURING
  { pos: new THREE.Vector3(8, 4, -12), target: new THREE.Vector3(2, 0, -2) },   // 04: ASSEMBLY
  { pos: new THREE.Vector3(14, 6, 0), target: new THREE.Vector3(3, 0, 0) },     // 05: TESTING
  { pos: new THREE.Vector3(0, 10, 14), target: new THREE.Vector3(0, -2, 0) },   // 06: DELIVERY
];

const NormalizedFactoryModel = () => {
  const { scene } = useGLTF('/factory_machine.glb');
  const groupRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (scene) {
      // 1. Calculate Bounding Box
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);

      const center = new THREE.Vector3();
      box.getCenter(center);

      console.log("Model Original Dimensions:", size);
      console.log("Model Original Center:", center);

      // 2. Center the model exactly at [0,0,0]
      scene.position.x = -center.x;
      scene.position.y = -center.y;
      scene.position.z = -center.z;

      // 3. Normalize Scale (ensure the largest dimension is ~15 units so it fits the viewport nicely)
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetSize = 15;
      if (maxDim > 0) {
        const scale = targetSize / maxDim;
        scene.scale.setScalar(scale);
        console.log("Applied Scale Factor:", scale);
      }
    }
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

const CameraRig = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetRef = useRef(new THREE.Vector3(0, -1, 0));

  useEffect(() => {
    // Initial resize handling
    const handleResize = () => {
      if (cameraRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
      }
    };
    window.addEventListener('resize', handleResize);

    // GSAP Scroll handler
    const handleScroll = (e: CustomEvent) => {
      const progress = e.detail; // 0 to 1

      const segments = cameraStates.length - 1;
      const index = Math.min(Math.floor(progress * segments), segments - 1);
      const segmentProgress = (progress * segments) - index;

      const currentState = cameraStates[index];
      const nextState = cameraStates[index + 1];

      const interpPos = new THREE.Vector3().lerpVectors(currentState.pos, nextState.pos, segmentProgress);
      const interpTarget = new THREE.Vector3().lerpVectors(currentState.target, nextState.target, segmentProgress);

      if (cameraRef.current) {
        gsap.to(cameraRef.current.position, {
          x: interpPos.x,
          y: interpPos.y,
          z: interpPos.z,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });

        gsap.to(targetRef.current, {
          x: interpTarget.x,
          y: interpTarget.y,
          z: interpTarget.z,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    window.addEventListener('manufacturing-scroll', handleScroll as EventListener);

    // Ensure initial layout
    handleResize();

    return () => {
      window.removeEventListener('manufacturing-scroll', handleScroll as EventListener);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(targetRef.current);
    }
  });

  return (
    <perspectiveCamera
      ref={cameraRef as any}
      args={[45, window.innerWidth / window.innerHeight, 0.1, 1000]}
      position={cameraStates[0].pos.toArray()}
    />
  );
};

const Factory3D = () => {
  return (
    <Canvas shadows>
      <CameraRig />

      {/* Industrial Lighting Setup */}
      <color attach="background" args={['#050506']} />

      {/* Soft Ambient Fill */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Large Soft Key Light */}
      <directionalLight
        position={[15, 20, 15]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Rim Light for edge definition */}
      <directionalLight position={[-15, 10, -15]} intensity={0.8} color="#8a9cbd" />

      {/* SG Red Accent Light */}
      <pointLight position={[0, 2, 5]} intensity={3} color="#D2232A" distance={20} />

      <Suspense fallback={null}>
        <NormalizedFactoryModel />

        <ContactShadows position={[0, -5, 0]} opacity={0.7} scale={30} blur={2.5} far={10} />
        <BakeShadows />

        {/* Environment map for metallic reflections */}
        <Environment preset="warehouse" />
      </Suspense>

    </Canvas>
  );
};

export default Factory3D;
