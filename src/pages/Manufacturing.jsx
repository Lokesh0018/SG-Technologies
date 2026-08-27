import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    id: '01',
    title: 'DESIGN',
    description: 'Engineering ideas become precise product designs through meticulous research, structural planning and technical development.'
  },
  {
    id: '02',
    title: 'PROTOTYPE',
    description: 'Concepts are transformed into functional, tactile prototypes for rigorous validation and refinement.'
  },
  {
    id: '03',
    title: 'MANUFACTURING',
    description: 'Advanced industrial manufacturing processes transform engineered designs into precision components.'
  },
  {
    id: '04',
    title: 'ASSEMBLY',
    description: 'Individual components are carefully integrated into complete products by our expert technicians.'
  },
  {
    id: '05',
    title: 'TESTING',
    description: 'Every product undergoes extreme environmental testing and quality verification before it leaves the floor.'
  },
  {
    id: '06',
    title: 'DELIVERY',
    description: 'Completed products are prepared for immediate deployment and global delivery.'
  }
];

const Manufacturing = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal sticky headline
      gsap.fromTo('.m-reveal-headline', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Reveal stages on scroll
      const stagesElements = gsap.utils.toArray('.m-stage-item');
      stagesElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="manufacturing-page" ref={containerRef} style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7f7f5' }}>
      
      {/* Left Side: Sticky Title */}
      <div style={{ flex: 1, position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', paddingLeft: '5vw' }}>
        <h1 className="editorial-headline m-reveal-headline" style={{ 
          fontSize: 'clamp(3rem, 7vw, 7rem)', 
          lineHeight: '0.9',
          letterSpacing: '-0.02em',
          margin: 0
        }}>
          THE<br/>PROCESS.
        </h1>
      </div>

      {/* Right Side: Scrolling Stages */}
      <div style={{ flex: 1.2, padding: '20vh 10vw 20vh 5vw', display: 'flex', flexDirection: 'column', gap: '20vh' }}>
        {stages.map((stage) => (
          <div key={stage.id} className="m-stage-item" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '2px solid #111', paddingTop: '2rem' }}>
            <div style={{ 
              fontFamily: '"Syne", sans-serif', 
              fontSize: 'clamp(4rem, 8vw, 8rem)', 
              fontWeight: '800',
              lineHeight: '0.8',
              color: '#111'
            }}>
              {stage.id}
            </div>
            
            <div style={{ marginTop: '2rem' }}>
              <h2 style={{ 
                fontFamily: '"Syne", sans-serif',
                fontSize: '2rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                margin: '0 0 1rem 0'
              }}>
                {stage.title}
              </h2>
              <p className="editorial-paragraph" style={{ maxWidth: '80%', margin: 0, fontSize: '1.2rem' }}>
                {stage.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Manufacturing;
