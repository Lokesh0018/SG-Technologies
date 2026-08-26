import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../../components/PageTransition/PageTransition';
import './Manufacturing.css';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    id: '01',
    title: 'DESIGN',
    description: 'Engineering ideas become precise product designs through research, planning and technical development.'
  },
  {
    id: '02',
    title: 'PROTOTYPE',
    description: 'Concepts are transformed into functional prototypes for validation and refinement.'
  },
  {
    id: '03',
    title: 'MANUFACTURING',
    description: 'Advanced manufacturing processes transform engineered designs into precision components and products.'
  },
  {
    id: '04',
    title: 'ASSEMBLY',
    description: 'Individual components are carefully integrated into complete products.'
  },
  {
    id: '05',
    title: 'TESTING',
    description: 'Every product undergoes testing and quality verification before delivery.'
  },
  {
    id: '06',
    title: 'DELIVERY',
    description: 'Completed products are prepared for deployment and delivery.'
  }
];

const Manufacturing = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // We track the scroll progress and pass it down to the 3D canvas
  useLayoutEffect(() => {
    // Refresh ScrollTrigger to ensure correct heights if DOM changes
    ScrollTrigger.refresh();

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Dispatch custom event to 3D canvas to update camera
        window.dispatchEvent(new CustomEvent('manufacturing-scroll', { detail: self.progress }));
      }
    });

    // Animate cards on scroll
    const cards = gsap.utils.toArray('.m-stage-card-wrapper');
    cards.forEach((card: any) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 80 },
        {
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
    
    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <PageTransition className="manufacturing-page">
      
      {/* Background Image (Replaces 3D Canvas) */}
      <div className="manufacturing-canvas-container">
        {/* <Factory3D /> */}
      </div>

      {/* Foreground Scrollable Content */}
      <div ref={containerRef} className="manufacturing-content-overlay">
        
        {stages.map((stage, index) => (
          <div key={stage.id} className="m-stage-section" id={`stage-${index}`}>
            <div className="m-stage-card-wrapper">
              <div className="m-stage-card">
                <span className="m-stage-number">{stage.id}</span>
                
                <div className="m-stage-progress">
                  <span>{stage.id} / 06</span>
                  <div className="m-stage-dots">
                    {stages.map((_, dotIdx) => (
                      <div key={dotIdx} className={`m-dot ${dotIdx === index ? 'active' : ''}`}></div>
                    ))}
                  </div>
                </div>

                <h2 className="m-stage-title">{stage.title}</h2>
                <p className="m-stage-desc">{stage.description}</p>
              </div>
            </div>
          </div>
        ))}
        
      </div>

    </PageTransition>
  );
};

export default Manufacturing;
