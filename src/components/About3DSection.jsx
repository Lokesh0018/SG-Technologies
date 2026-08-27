import React, { useRef, Suspense, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useTexture, useGLTF, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// -----------------------------------------
// Background SG Logo
// -----------------------------------------
const BgLogo = () => {
  const innerRef = useRef(null);
  const logoTexture = useTexture('/sg.png'); 

  useFrame((state) => {
    if (innerRef.current) {
      innerRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group scale={1.8}>
      <mesh ref={innerRef}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial
          map={logoTexture}
          transparent={true}
          side={THREE.DoubleSide}
          opacity={0.15} // Dimmed heavily so it doesn't distract from the editorial text
        />
      </mesh>
    </group>
  );
};



// -----------------------------------------
// Main About Page Component
// -----------------------------------------
const About3DSection = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray('.reveal-up');
      
      revealElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-editorial-page" ref={containerRef}>
      
      {/* FIXED BACKGROUND LOGO */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', pointerEvents: 'none', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <BgLogo />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '0 5vw' }}>
        
        {/* SECTION 01: MINIMAL HERO */}
        <section className="about-section hero-section">
          <div className="section-label">ABOUT SG TECH</div>
          <h1 className="editorial-headline">ENGINEERING<br/>THAT PERFORMS.</h1>
          <p className="editorial-paragraph">
            SG TECH develops reliable industrial communication systems designed for demanding environments.
          </p>
        </section>

        {/* SECTION 02: WHO WE ARE */}
        <section className="about-section split-section">
          <div className="split-left">
            <div className="section-label reveal-up">WHO WE ARE</div>
          </div>
          <div className="split-right">
            <h2 className="editorial-subheadline reveal-up">Technology built around reliability.</h2>
            <p className="editorial-paragraph reveal-up">
              SG TECH combines engineering, manufacturing and practical design to create technology that performs in the real world.
            </p>
            <p className="editorial-paragraph reveal-up" style={{ marginTop: '1.5rem' }}>
              We are a team of industrial designers and systems engineers focused on delivering uncompromised hardware.
            </p>
          </div>
        </section>

        {/* SECTION 03: WHAT WE DO */}
        <section className="about-section list-section">
          <div className="section-label reveal-up" style={{ marginBottom: '2rem' }}>WHAT WE DO</div>
          <div className="clean-list reveal-up">
            <div className="clean-list-item">
              <span className="list-num">01</span>
              <span className="list-title">PRODUCT DEVELOPMENT</span>
              <span className="list-desc">End-to-end device creation.</span>
            </div>
            <div className="clean-list-item">
              <span className="list-num">02</span>
              <span className="list-title">INDUSTRIAL DESIGN</span>
              <span className="list-desc">Ergonomic and rugged physical hardware.</span>
            </div>
            <div className="clean-list-item">
              <span className="list-num">03</span>
              <span className="list-title">ENGINEERING</span>
              <span className="list-desc">Advanced telecommunications systems.</span>
            </div>
            <div className="clean-list-item">
              <span className="list-num">04</span>
              <span className="list-title">MANUFACTURING</span>
              <span className="list-desc">Precision assembly and scaling.</span>
            </div>
          </div>
        </section>

        {/* SECTION 04: ENGINEERING PHILOSOPHY */}
        <section className="about-section philosophy-section" style={{ padding: '10vh 0', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="philosophy-text">
            <div className="section-label reveal-up">ENGINEERING PHILOSOPHY</div>
            <h2 className="editorial-subheadline reveal-up" style={{ marginTop: '1rem' }}>BUILT FOR REAL CONDITIONS.</h2>
            <p className="editorial-paragraph reveal-up" style={{ margin: '0 auto' }}>
              We focus on practical engineering, dependable performance and products designed for the people who rely on them.
            </p>
          </div>
        </section>

        {/* SECTION 05: HOW WE WORK */}
        <section className="about-section process-section">
          <div className="section-label reveal-up" style={{ marginBottom: '3rem' }}>HOW WE WORK</div>
          <div className="process-timeline reveal-up">
            <div className="process-step">
              <div className="step-num">01 — DISCOVER</div>
              <div className="step-desc">Analyze requirements</div>
            </div>
            <div className="process-line"></div>
            <div className="process-step">
              <div className="step-num">02 — DESIGN</div>
              <div className="step-desc">Rapid prototyping</div>
            </div>
            <div className="process-line"></div>
            <div className="process-step">
              <div className="step-num">03 — ENGINEER</div>
              <div className="step-desc">System architecture</div>
            </div>
            <div className="process-line"></div>
            <div className="process-step">
              <div className="step-num">04 — TEST</div>
              <div className="step-desc">Extreme validation</div>
            </div>
            <div className="process-line"></div>
            <div className="process-step">
              <div className="step-num">05 — DELIVER</div>
              <div className="step-desc">Scale production</div>
            </div>
          </div>
        </section>

        {/* SECTION 06: FINAL STATEMENT */}
        <section className="about-section final-section">
          <div className="section-label reveal-up">SG TECH</div>
          <h2 className="editorial-headline reveal-up" style={{ margin: '1rem 0' }}>BUILT TO BE<br/>RELIABLE.</h2>
          <p className="editorial-paragraph reveal-up" style={{ marginBottom: '3rem' }}>
            From concept to manufacturing, we build technology with purpose.
          </p>
          <div className="final-links reveal-up">
            <a href="#products">[ EXPLORE PRODUCTS ]</a>
            <a href="#contact">[ CONTACT US ]</a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About3DSection;
