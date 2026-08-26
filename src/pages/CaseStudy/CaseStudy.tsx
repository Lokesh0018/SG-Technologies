import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CaseStudyBackground from '../../components/CaseStudyBackground/CaseStudyBackground';
import './CaseStudy.css';

interface SectionData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  bullets?: string[];
}

const SECTIONS: SectionData[] = [
  {
    id: 'intro',
    title: 'Walkie-Talkie',
    subtitle: 'Next-gen field communication',
    description: 'Engineered with aerospace-grade materials for extreme conditions.',
  },
  {
    id: 'clarity',
    title: 'Unmatched Clarity',
    description: 'Advanced noise-cancellation for crystal-clear voice transmission.',
    bullets: [
      'Active noise cancellation',
      'Reduced interference'
    ]
  },
  {
    id: 'autonomy',
    title: 'Extended Autonomy',
    description: 'Up to 72 hours of continuous operation.',
    bullets: [
      'High-density graphene cell',
      'Hot-swappable packs'
    ]
  },
  {
    id: 'integration',
    title: 'Seamless Integration',
    description: 'Connect instantly with industrial IoT and real-time tracking.',
    bullets: [
      'IoT connectivity',
      'Encrypted channels'
    ]
  },
  {
    id: 'elements',
    title: 'Built to Last',
    description: 'Zero equipment failure in critical moments.',
    bullets: [
      'Aerospace materials',
      'IP68 water/dust proof'
    ]
  }
];

const CaseStudy: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollHeight > 0) {
        const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate style for each section
  const getSectionStyle = (index: number) => {
    const totalSections = SECTIONS.length;
    // Each section gets a portion of the scroll
    const sectionLength = 1 / totalSections;
    const sectionStart = index * sectionLength;
    const sectionEnd = sectionStart + sectionLength;

    // Calculate local progress within this section's window (0 to 1)
    let localProgress = 0;
    if (scrollProgress >= sectionStart && scrollProgress <= sectionEnd) {
      localProgress = (scrollProgress - sectionStart) / sectionLength;
    } else if (scrollProgress > sectionEnd) {
      localProgress = 1;
    }

    // 0 to 0.2: Fade in & move up from 100px
    // 0.2 to 0.8: Hold (opacity 1, translateY 0)
    // 0.8 to 1.0: Fade out & move up to -100px
    let opacity = 0;
    let translateY = 100;
    
    if (localProgress > 0 && localProgress <= 0.2) {
      const p = localProgress / 0.2; // 0 to 1
      opacity = p;
      translateY = 100 * (1 - p);
    } else if (localProgress > 0.2 && localProgress <= 0.8) {
      opacity = 1;
      translateY = 0;
    } else if (localProgress > 0.8 && localProgress < 1) {
      const p = (localProgress - 0.8) / 0.2; // 0 to 1
      opacity = 1 - p;
      translateY = -100 * p;
    } else if (localProgress >= 1) {
      opacity = 0;
      translateY = -100;
    }

    // Waving motion (translateX)
    const isLeft = index % 2 === 0;
    // Wave: Center (0) -> Slightly Out (15px) -> Center (0)
    const waveAmount = Math.sin(localProgress * Math.PI) * 15;
    // Left: wave goes right (positive). Right: wave goes left (negative)
    const translateX = isLeft ? waveAmount : -waveAmount;

    // Visibility
    const isActive = localProgress > 0 && localProgress < 1;

    const style: React.CSSProperties = {
      opacity,
      transform: `translate(${translateX}px, ${translateY}px)`,
      pointerEvents: isActive ? 'auto' : 'none',
      visibility: isActive ? 'visible' : 'hidden',
    };
    
    return style;
  };

  return (
    <div className="case-study-page">
      <button className="case-study-back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back
      </button>

      <CaseStudyBackground scrollProgress={scrollProgress} />
      
      {/* Edge Fades */}
      <div className="edge-fade-left"></div>
      <div className="edge-fade-right"></div>

      {/* Fixed Narrative Container */}
      <div className="narrative-container">
        {SECTIONS.map((section, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div 
              key={section.id} 
              className={`narrative-section ${isLeft ? 'align-left' : 'align-right'}`}
              style={getSectionStyle(index)}
            >
              <div className="narrative-content">
                <h1>{section.title}</h1>
                {section.subtitle && <p className="subtitle">{section.subtitle}</p>}
                <p className="description">{section.description}</p>
                
                {section.bullets && (
                  <ul className="bullets">
                    {section.bullets.map((bullet, bIndex) => (
                      <li key={bIndex} style={{ transitionDelay: `${bIndex * 0.1}s` }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseStudy;
