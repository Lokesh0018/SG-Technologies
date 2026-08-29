import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'WALKIE TALKIE',
    category: 'INDUSTRIAL COMMUNICATION',
    date: 'FIELD DEPLOYMENT / 2026',
    subtitle: 'Industrial-grade two-way communication device.',
    image: '/walkie-talkie/walkie-talkie.png',
    desc: 'Designed for extreme environments with robust housing, encrypted frequencies, and extended battery life for field operations.',
    specs: ['Long Range', 'Encrypted', 'Ruggedized']
  },
  {
    id: '02',
    title: 'CC CAMERA',
    category: 'SECURITY SYSTEMS',
    date: 'INDUSTRIAL SITE / 2025',
    subtitle: 'High-definition closed-circuit surveillance system.',
    image: '/cc camera/cc camera.png',
    desc: 'Advanced optical sensors with night vision, motion tracking, and remote pan-tilt-zoom capabilities for absolute security.',
    specs: ['4K Resolution', 'Night Vision', 'Weatherproof']
  },
  {
    id: '03',
    title: 'POC-LTE RADIO',
    category: 'REMOTE OPERATIONS',
    date: 'FIELD NETWORK / 2025',
    subtitle: 'Push-to-talk over cellular communication network.',
    image: '/poc-lte/poc-lte radio.png',
    desc: 'Global range communication leveraging LTE networks for instant, secure team coordination without traditional radio limits.',
    specs: ['LTE Network', 'Instant PTT', 'GPS Tracking']
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const [hoveredProject, setHoveredProject] = React.useState(null);

  const handleScrollToProject = (id) => {
    const element = document.getElementById(`project-${id}`);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal headers and paragraphs
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

      // Reveal images
      const revealImages = gsap.utils.toArray('.reveal-image');
      revealImages.forEach((el) => {
        gsap.fromTo(el, 
          { scale: 0.9, opacity: 0 }, 
          { 
            scale: 1, 
            opacity: 1, 
            duration: 1, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Hero project index animation
      const projectIndexes = gsap.utils.toArray('.reveal-project-index');
      gsap.fromTo(projectIndexes,
        { x: 30, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.6, 
          ease: 'power2.out', 
          stagger: 0.1,
          delay: 0.2
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-editorial-page" style={{ paddingTop: '100px' }} ref={containerRef}>
      
      <div style={{ position: 'relative', zIndex: 1, padding: '0 5vw' }}>
        
        {/* HEADER SECTION */}
        <section className="about-section hero-section" style={{ minHeight: 'auto', paddingBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4rem', paddingTop: '40px' }}>
          
          <div style={{ flex: '1 1 50%', maxWidth: '600px' }}>
            <div className="section-label reveal-up">ARCHIVE</div>
            <h1 className="editorial-headline reveal-up" style={{ display: 'inline-block' }}>OUR<br/>PROJECTS.</h1>
            <p className="editorial-paragraph reveal-up">
              A selection of our most demanding engineering projects, designed to perform where conventional technology fails.
            </p>
          </div>

          <div style={{ flex: '1 1 40%', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {projects.map((proj, index) => (
              <div 
                key={proj.id}
                className="reveal-project-index"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem', 
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseEnter={() => setHoveredProject(proj.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => handleScrollToProject(proj.id)}
              >
                {/* Number */}
                <div style={{ 
                  fontFamily: '"Courier New", Courier, monospace', 
                  fontSize: '0.8rem', 
                  fontWeight: 'bold',
                  color: hoveredProject === proj.id ? 'var(--sg-red, #D2232A)' : '#111',
                  transition: 'color 0.3s ease'
                }}>
                  {proj.id}
                </div>

                {/* Line */}
                <div style={{ 
                  flex: 1, 
                  height: '1px', 
                  backgroundColor: hoveredProject === proj.id ? 'var(--sg-red, #D2232A)' : '#e0e0e0',
                  opacity: hoveredProject === proj.id ? 0.5 : 1,
                  transition: 'background-color 0.3s ease, opacity 0.3s ease'
                }}></div>

                {/* Image */}
                <div style={{ width: '140px', flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                  <img 
                    src={proj.image} 
                    alt={proj.title}
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      maxHeight: '100px',
                      objectFit: 'contain',
                      filter: 'grayscale(100%) contrast(1.1) brightness(0.95)',
                      transform: hoveredProject === proj.id ? 'scale(1.05) translateX(4px)' : 'scale(1) translateX(0)',
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </div>

                {/* Metadata */}
                <div style={{ 
                  width: '180px',
                  flexShrink: 0,
                  fontFamily: '"Courier New", Courier, monospace', 
                  fontSize: '0.65rem', 
                  letterSpacing: '0.1em', 
                  color: hoveredProject === proj.id ? '#111' : '#888',
                  transition: 'color 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <div style={{ fontWeight: hoveredProject === proj.id ? 'bold' : 'normal', transition: 'font-weight 0.3s ease' }}>{proj.category}</div>
                  <div>{proj.date}</div>
                </div>

              </div>
            ))}
          </div>

        </section>

        {/* PROJECTS LISTING */}
        <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '2rem', paddingBottom: '10vh' }}>
          {projects.map((proj, i) => (
            <section id={`project-${proj.id}`} key={proj.id} className="about-section split-section" style={{ borderTop: i === 0 ? 'none' : '1px solid #e0e0e0', paddingTop: i === 0 ? '0' : '4rem', marginTop: i === 0 ? '0' : '2rem' }}>
              
              {/* Left Side: Number & Name */}
              <div className="split-left">
                <div className="section-label reveal-up">PROJECT {proj.id}</div>
                <h2 className="editorial-subheadline reveal-up" style={{ marginTop: '1rem' }}>{proj.title}</h2>
              </div>
              
              {/* Right Side: Details & Image */}
              <div className="split-right">
                <p className="editorial-paragraph reveal-up" style={{ fontWeight: 600, color: '#111' }}>
                  {proj.subtitle}
                </p>
                <p className="editorial-paragraph reveal-up" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                  {proj.desc}
                </p>
                
                <div className="reveal-up" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                  {proj.specs.map(spec => (
                    <span key={spec} style={{
                      fontFamily: '"Courier New", Courier, monospace',
                      fontSize: '0.8rem',
                      padding: '0.3rem 0.6rem',
                      border: '1px solid #e0e0e0',
                      color: '#666'
                    }}>
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Minimal Image Presentation */}
                <div className="reveal-image" style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  backgroundImage: `url("${proj.image}")`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px'
                }}></div>
              </div>

            </section>
          ))}
        </div>

        {/* OUTRO */}
        <section className="about-section final-section">
          <div className="section-label reveal-up">NEXT CYCLE</div>
          <h2 className="editorial-headline reveal-up" style={{ margin: '1rem 0', display: 'inline-block' }}>START A<br/>PROJECT.</h2>
          <p className="editorial-paragraph reveal-up" style={{ marginBottom: '3rem' }}>
            Ready to build technology without compromise?
          </p>
          <div className="final-links reveal-up">
            <a href="/contact">[ CONTACT ENGINEERING ]</a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Projects;
