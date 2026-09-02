import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WalkieTalkie3D from './WalkieTalkie3D';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  
  const bgRef = useRef(null);
  const part1Ref = useRef(null);
  const part2Ref = useRef(null);
  const part4Ref = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const animation = gsap.to({}, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          progressRef.current = p;

          // Maintained single off-white background throughout

          // Helper to manage fade and translate of text blocks (with staggering)
          const animatePart = (ref, startP, endP, currentP, fadeIn = true, fadeOut = true) => {
            if (!ref.current) return;
            
            // Global Pointer Events
            const localProgress = (currentP - startP) / (endP - startP);
            let isActive = false;
            if (currentP >= startP || !fadeIn) {
              if (fadeOut && currentP > endP) {
                isActive = false;
              } else {
                isActive = true;
              }
            }
            ref.current.style.pointerEvents = isActive ? 'auto' : 'none';

            // Staggered lines
            const lines = ref.current.querySelectorAll('.reveal-inner');
            lines.forEach((line, index) => {
              const staggerOffset = index * 0.05;
              const lineProgress = localProgress - staggerOffset;
              
              let lineOpacity = 0;
              let lineTranslateY = 100;
              
              if (currentP >= startP || !fadeIn) {
                if (lineProgress < 0 && fadeIn) {
                  // Not yet started for this specific line
                  lineOpacity = 0;
                  lineTranslateY = 100;
                } else if (lineProgress < 0.25 && fadeIn) {
                  // Fading in
                  lineOpacity = lineProgress / 0.25;
                  lineTranslateY = 100 * (1 - (lineProgress / 0.25));
                } else if (fadeOut && lineProgress > 0.75) {
                  // Fading out (only if fadeOut is true)
                  const fadeOutProgress = (lineProgress - 0.75) / 0.25;
                  if (fadeOutProgress > 1) {
                    lineOpacity = 0;
                    lineTranslateY = -100;
                  } else {
                    lineOpacity = 1 - fadeOutProgress;
                    lineTranslateY = -100 * fadeOutProgress;
                  }
                } else {
                  // Fully visible
                  lineOpacity = 1;
                  lineTranslateY = 0;
                }
              }
              
              line.style.opacity = lineOpacity;
              line.style.transform = `translateY(${lineTranslateY}%)`;
            });
          };

          // Part 1 (Right - Starts fully visible)
          animatePart(part1Ref, 0.0, 0.30, p, false, true); 
          // Part 2 (Left - extended time)
          animatePart(part2Ref, 0.20, 0.70, p, true, true);
          // Part 4 (Left - CTA - Stays visible at end)
          animatePart(part4Ref, 0.65, 1.0, p, true, false);
        }
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  // Helper component for staggered text lines
  const RevealLine = ({ children, className = "" }) => (
    <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }} className={className}>
      <div className="reveal-inner" style={{ willChange: 'transform, opacity', display: 'block', transform: 'translateY(100%)', opacity: 0 }}>
        {children}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="cinematic-section" style={{ height: '1600vh', position: 'relative', padding: 0 }}>
      <style>{`
        .cinematic-section {
          position: relative;
          z-index: 10;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', sans-serif;
        }
        
        .sticky-bg {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background-color: #F5F5F2; 
        }

        .typography-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 15; 
          display: flex;
          align-items: center;
          padding: 0 5vw;
        }

        .text-column-left {
          width: 45%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 5vw;
        }
        
        .text-column-right {
          width: 45%;
          margin-left: 55%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-right: 5vw;
        }

        .huge-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 4.5vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -2px;
          margin: 0 0 1.5rem 0;
          color: #111111;
        }

        .subtitle {
          font-size: clamp(1rem, 1.5vw, 1.25rem);
          font-weight: 500;
          color: #444;
          max-width: 500px;
          line-height: 1.5;
          letter-spacing: -0.5px;
          margin-bottom: 2.5rem;
        }

        .btn-minimal {
          display: inline-block;
          padding: 1.25rem 3rem;
          background-color: #111111;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-radius: 3rem;
          text-decoration: none;
          transition: all 0.3s ease;
          pointer-events: auto;
        }

        .btn-minimal:hover {
          background-color: #ff3300;
          transform: translateY(-2px);
        }

        .tech-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tech-list li {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111111;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
        }

        .tech-list li::before {
          content: '0' counter(list-item) ' ';
          counter-increment: list-item;
          color: #ff3300;
          margin-right: 1.5rem;
          font-size: 0.9rem;
          letter-spacing: 2px;
        }

        @media (max-width: 1024px) {
          .typography-layer {
            align-items: flex-end;
            padding-bottom: 10vh;
          }
          .text-column-left, .text-column-right {
            width: 100%;
            margin-left: 0;
            padding: 0;
          }
          .huge-headline {
            font-size: 3.5rem;
          }
        }
      `}</style>

      <div ref={bgRef} className="sticky-bg">
        <WalkieTalkie3D progressRef={progressRef} />
        
        {/* SECTION 01: Model Left, Text Right */}
        <div ref={part1Ref} className="typography-layer">
          <div className="text-column-right">
            <h2 className="huge-headline">
              <RevealLine>BUILT FOR</RevealLine>
              <RevealLine>THE MOMENT.</RevealLine>
            </h2>
            <div className="subtitle">
              <RevealLine>Professional communication</RevealLine>
              <RevealLine>engineered for demanding environments.</RevealLine>
            </div>
            <RevealLine><a href="#" className="btn-minimal">Explore Product</a></RevealLine>
          </div>
        </div>

        {/* SECTION 02: Text Left, Model Right */}
        <div ref={part2Ref} className="typography-layer">
          <div className="text-column-left">
            <h2 className="huge-headline">
              <RevealLine>ENGINEERED</RevealLine>
              <RevealLine>TO PERFORM.</RevealLine>
            </h2>
            <div className="subtitle">
              <RevealLine>Every component is designed for</RevealLine>
              <RevealLine>reliable communication when performance matters.</RevealLine>
            </div>
            <ul className="tech-list" style={{ counterReset: 'list-item' }}>
              <RevealLine><li>Rugged construction</li></RevealLine>
              <RevealLine><li>Clear audio</li></RevealLine>
              <RevealLine><li>Long-range</li></RevealLine>
              <RevealLine><li>All-day battery</li></RevealLine>
            </ul>
          </div>
        </div>



        {/* SECTION 04: Text Left, Model Right */}
        <div ref={part4Ref} className="typography-layer part4-content">
          <div className="text-column-left">
            <h2 className="huge-headline">
              <RevealLine>WHEN IT</RevealLine>
              <RevealLine>MATTERS,</RevealLine>
              <RevealLine>BE READY.</RevealLine>
            </h2>
            <div className="subtitle">
              <RevealLine>Professional communication</RevealLine>
              <RevealLine>without compromise.</RevealLine>
            </div>
            <RevealLine><a href="#" className="btn-minimal">Buy Now</a></RevealLine>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
