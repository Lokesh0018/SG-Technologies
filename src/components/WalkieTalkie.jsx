import React, { useRef, useState } from 'react';
import { useGLTF, Center, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function WalkieTalkie(props) {
  const { nodes } = useGLTF('/walkie_talkie__3d_communication_device.glb');
  const group = useRef();
  const scrollGroup = useRef();

  // Arcs
  const signal1 = useRef();
  const signal2 = useRef();
  const signal3 = useRef();
  const signal4 = useRef();
  const signal5 = useRef();

  const [startTime] = useState(Date.now());

  useFrame((state) => {
    const elapsed = (Date.now() - startTime) / 1000;

    // 0-1.5s: Fade in and move up (simulated by positioning)
    if (elapsed < 1.5 && group.current) {
      const progress = Math.min(elapsed / 1.5, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      group.current.position.y = -0.3 + (easeOut * 0.3);
      // Removed initial Y rotation twist to keep it stable
    } else if (elapsed >= 1.5 && group.current) {
      const floatAmount = Math.sin((elapsed - 1.5) * 2) * 0.02;
      group.current.position.y = floatAmount;
      // Removed float rotation to keep the 15-20 deg orientation stable
    }

    // Cursor tracking
    if (elapsed >= 1.5 && group.current) {
      // Target rotations based on mouse position
      const targetRotationY = (state.pointer.x * Math.PI) / 6;
      const targetRotationX = -(state.pointer.y * Math.PI) / 8;

      // Smoothly interpolate current rotation to target rotation
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 0.1);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.1);
    }

    // Antenna arc pulse animation
    if (elapsed > 1.5) {
      const pulseTime = (elapsed - 1.5) % 5; // 5-second cycle

      const animateSignal = (ref, delay) => {
        if (!ref.current) return;
        const localTime = pulseTime - delay;
        if (localTime > 0 && localTime < 3.0) {
          const progress = localTime / 3.0;
          const scale = 1 + progress * 5; // expand significantly
          const opacity = (1 - progress) * 0.25; // low opacity
          ref.current.scale.set(scale, scale, scale);
          ref.current.material.opacity = Math.max(0, opacity);
        } else {
          ref.current.material.opacity = 0;
        }
      };

      animateSignal(signal1, 0.0);
      animateSignal(signal2, 0.4);
      animateSignal(signal3, 0.8);
      animateSignal(signal4, 1.2);
      animateSignal(signal5, 1.6);
    }
  });

  useGSAP(() => {
    if (!scrollGroup.current) return;

    // Initial position for Hero section
    gsap.set(scrollGroup.current.position, { x: 1.4, y: 0.2, z: 0 });
    gsap.set(scrollGroup.current.rotation, { x: 0, y: 0, z: 0 });

    // Scroll 1: Hero to Statement
    gsap.fromTo(scrollGroup.current.position, 
      { x: 1.4, y: 0.2, z: 0 },
      {
        x: 0,
        y: -0.5,
        z: 2.5,
        scrollTrigger: {
          trigger: "#statement",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        }
      }
    );

    gsap.fromTo(scrollGroup.current.rotation, 
      { x: 0, y: 0, z: 0 },
      {
        y: Math.PI, // Spin to show back/side
        x: 0.1,
        z: 0,
        scrollTrigger: {
          trigger: "#statement",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        }
      }
    );

    // Scroll 2: Statement to Features
    gsap.fromTo(scrollGroup.current.position, 
      { x: 0, y: -0.5, z: 2.5 },
      {
        x: -1.2,
        y: 0,
        z: 1,
        immediateRender: false,
        scrollTrigger: {
          trigger: "#features",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        }
      }
    );

    gsap.fromTo(scrollGroup.current.rotation, 
      { x: 0.1, y: Math.PI, z: 0 },
      {
        y: Math.PI * 2, // Spin back to front
        x: -0.1,
        z: 0,
        immediateRender: false,
        scrollTrigger: {
          trigger: "#features",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        }
      }
    );

    // Scroll 3: Features to Specs
    gsap.fromTo(scrollGroup.current.position, 
      { x: -1.2, y: 0, z: 1 },
      {
        x: 1.2,
        y: 0.5,
        z: 0.5,
        immediateRender: false,
        scrollTrigger: {
          trigger: "#specs",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        }
      }
    );

    gsap.fromTo(scrollGroup.current.rotation, 
      { x: -0.1, y: Math.PI * 2, z: 0 },
      {
        y: Math.PI * 2.3, // Slight angle
        x: Math.PI / 2, // Lay it flat
        z: 0,
        immediateRender: false,
        scrollTrigger: {
          trigger: "#specs",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        }
      }
    );

  }, { dependencies: [] });

  return (
    <group {...props} dispose={null}>
      <group ref={scrollGroup}>
        <Center
          position={[0, 0, 0]}
          rotation={[0, -72 * (Math.PI / 180), 0]} // 18 degrees from front
        >
          <group ref={group} scale={0.11}> {/* Slightly scaled up to hit 45% height */}
            {/* Main Body - Strict dark graphite */}
            <mesh geometry={nodes.Walkie_Talkie_02__10___Default_0.geometry}>
              <meshStandardMaterial
                color="#161616"
                roughness={0.9}
                metalness={0.1}
                envMapIntensity={1.2}
              />
            </mesh>

            {/* Screen / Details - Dark glass */}
            <mesh geometry={nodes.Walkie_Talkie_02_Walkie_Talkie_02_0.geometry}>
              <meshStandardMaterial
                color="#020202"
                roughness={0.05}
                metalness={0.95}
                envMapIntensity={1.5}
              />
              <Html
                transform
                occlude
                position={[2.6, 20.2, -6.8]}
                rotation={[0, Math.PI / 2, 0]}
                scale={0.8}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.85 }}>
                  <img src="/sg.png" alt="SG Tech" style={{ height: '14px', filter: 'brightness(0) saturate(100%) invert(21%) sepia(87%) saturate(7232%) hue-rotate(352deg) brightness(96%) contrast(112%)' }} />
                  <span style={{ color: '#fff', fontSize: '10px', fontWeight: 800, fontFamily: 'sans-serif' }}>SG TECH</span>
                </div>
              </Html>
            </mesh>

            {/* Antenna Arcs (Signals) - 5 thin rings behind the radio */}
            {/* Centered around X=1.5, Y=25. Z=-5 pushes it back slightly */}
            <group position={[1.5, 25, -2]} rotation={[0, 72 * (Math.PI / 180), 0]}> {/* Counteract base rotation so they face camera */}
              <mesh ref={signal1} position={[0, 0, -2]}>
                <ringGeometry args={[2.95, 3.0, 64]} />
                <meshBasicMaterial color="#E02020" transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
              </mesh>
              <mesh ref={signal2} position={[0, 0, -3]}>
                <ringGeometry args={[2.95, 3.0, 64]} />
                <meshBasicMaterial color="#E02020" transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
              </mesh>
              <mesh ref={signal3} position={[0, 0, -4]}>
                <ringGeometry args={[2.95, 3.0, 64]} />
                <meshBasicMaterial color="#E02020" transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
              </mesh>
              <mesh ref={signal4} position={[0, 0, -5]}>
                <ringGeometry args={[2.95, 3.0, 64]} />
                <meshBasicMaterial color="#E02020" transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
              </mesh>
              <mesh ref={signal5} position={[0, 0, -6]}>
                <ringGeometry args={[2.95, 3.0, 64]} />
                <meshBasicMaterial color="#E02020" transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
              </mesh>
            </group>
          </group>
        </Center>
      </group>
    </group>
  );
}

useGLTF.preload('/walkie_talkie__3d_communication_device.glb');
