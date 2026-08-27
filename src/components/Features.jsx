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
  const part3Ref = useRef(null);

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

          // Background Color Interpolation
          if (bgRef.current) {
            // Transition from off-white (#F5F5F2) to near-black (#0a0a0a) at 66% progress
            if (p < 0.6) {
              bgRef.current.style.backgroundColor = '#F5F5F2';
            } else if (p > 0.8) {
              bgRef.current.style.backgroundColor = '#0a0a0a';
            } else {
              // Interpolate
              const t = (p - 0.6) / 0.2;
              const r = Math.round(245 - (t * (245 - 10)));
              const g = Math.round(245 - (t * (245 - 10)));
              const b = Math.round(242 - (t * (242 - 10)));
              bgRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            }
          }

          // Part 1: Hero (Fades out around 30%)
          if (part1Ref.current) {
            const opacity = p < 0.25 ? 1 : Math.max(0, 1 - ((p - 0.25) / 0.08));
            part1Ref.current.style.opacity = opacity;
            part1Ref.current.style.transform = `translateY(${-p * 150}px)`;
            part1Ref.current.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none';
          }

          // Part 2: Product (Fades in at 35%, fades out at 65%)
          if (part2Ref.current) {
            let opacity = 0;
            let translateY = 50;
            
            if (p > 0.3 && p < 0.7) {
              if (p < 0.4) {
                opacity = (p - 0.3) / 0.1; // Fade in
                translateY = 50 * (1 - opacity);
              } else if (p > 0.6) {
                opacity = 1 - ((p - 0.6) / 0.1); // Fade out
                translateY = -50 * (1 - opacity);
              } else {
                opacity = 1;
                translateY = 0;
              }
            }
            part2Ref.current.style.opacity = opacity;
            part2Ref.current.style.transform = `translateY(${translateY}px)`;
            part2Ref.current.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none';
          }

          // Part 3: CTA (Fades in at 75%)
          if (part3Ref.current) {
            const opacity = p > 0.75 ? Math.min(1, (p - 0.75) / 0.1) : 0;
            part3Ref.current.style.opacity = opacity;
            part3Ref.current.style.transform = `translateY(${50 * (1 - opacity)}px)`;
            part3Ref.current.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none';
          }
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

  return (
    <section ref={sectionRef} className="cinematic-section" style={{ height: '1200vh', position: 'relative', padding: 0 }}>
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
          background-color: #F5F5F2; /* Initial warm off-white */
          transition: background-color 0.1s linear;
        }

        .typography-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 15; /* Sits above or intertwined with 3D model depending on z-index */
          display: flex;
          align-items: center;
          padding: 0 10vw;
        }

        .huge-headline {
          font-size: clamp(4rem, 8vw, 7rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -3px;
          margin: 0 0 2rem 0;
          color: #111;
        }

        .subtitle {
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          font-weight: 500;
          color: #444;
          max-width: 500px;
          line-height: 1.4;
          letter-spacing: -0.5px;
          margin-bottom: 3rem;
        }

        .btn-minimal {
          display: inline-block;
          padding: 1rem 2.5rem;
          background-color: #111;
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

        /* Part 2 Specifics */
        .tech-list {
          list-style: none;
          padding: 0;
          margin: 0;
          margin-top: 3rem;
        }

        .tech-list li {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
        }

        .tech-list li::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: #ff3300;
          border-radius: 50%;
          margin-right: 1rem;
        }

        /* Part 3 Specifics */
        .part3-content .huge-headline {
          color: #fff;
        }
        
        .part3-content .subtitle {
          color: #aaa;
        }
        
        .part3-content .btn-minimal {
          background-color: #fff;
          color: #000;
        }
        
        .part3-content .btn-minimal:hover {
          background-color: #ff3300;
          color: #fff;
        }

        .footer-links {
          margin-top: 4rem;
          display: flex;
          gap: 1.5rem;
          pointer-events: auto;
        }

        .footer-links a {
          color: #888;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: #fff;
        }

        @media (max-width: 768px) {
          .typography-layer {
            padding: 0 5vw;
          }
        }
      `}</style>

      <div ref={bgRef} className="sticky-bg">
        {/* We place WalkieTalkie3D exactly in the middle so it intertwines with the text */}
        <WalkieTalkie3D progressRef={progressRef} />
        
        {/* PART 1: BUILT FOR THE MOMENT */}
        <div ref={part1Ref} className="typography-layer" style={{ justifyContent: 'flex-start', willChange: 'opacity, transform' }}>
          <div>
            <h2 className="huge-headline">
              BUILT FOR<br />THE MOMENT.
            </h2>
            <p className="subtitle">
              Professional communication engineered for demanding environments.
            </p>
            <a href="#" className="btn-minimal">Explore Product</a>
          </div>
        </div>

        {/* PART 2: ENGINEERED TO PERFORM */}
        <div ref={part2Ref} className="typography-layer" style={{ justifyContent: 'center', opacity: 0, willChange: 'opacity, transform' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 className="huge-headline" style={{ position: 'relative', zIndex: 10 }}>
              ENGINEERED<br />TO PERFORM.
            </h2>
            <p className="subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
              Every detail is designed for reliable communication when it matters most.
            </p>
            
            <ul className="tech-list" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '4rem' }}>
              <li>Rugged construction</li>
              <li>Clear audio</li>
              <li>Long-range</li>
              <li>48-Hour battery</li>
            </ul>
          </div>
        </div>

        {/* PART 3: READY WHEN IT MATTERS */}
        <div ref={part3Ref} className="typography-layer part3-content" style={{ justifyContent: 'flex-start', opacity: 0, willChange: 'opacity, transform' }}>
          <div>
            <h2 className="huge-headline">
              READY<br />WHEN IT<br />MATTERS.
            </h2>
            <p className="subtitle">
              Reliable communication. Wherever the job takes you.
            </p>
            <a href="#" className="btn-minimal">Buy Now</a>
            
            <div className="footer-links">
              <a href="#">Product</a>
              <a href="#">Technology</a>
              <a href="#">Features</a>
              <a href="#">Specs</a>
              <a href="#">About</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
