import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

interface CaseStudyData {
  framePath: string;
  sections: SectionData[];
}

const CASE_STUDIES: Record<string, CaseStudyData> = {
  'walkie-talkie': {
    framePath: '/wlakie talkie/walkie talkie/ezgif-frame-',
    sections: [
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
    ]
  },
  'cc-camera': {
    framePath: '/camera/cc camera/ezgif-frame-',
    sections: [
      {
        id: 'intro',
        title: 'CC Camera System',
        subtitle: 'Automated Facility Security',
        description: 'An intelligent 4K AI-driven surveillance system for massive industrial spaces.',
      },
      {
        id: 'vision',
        title: 'Crystal Clear 4K',
        description: 'Capture every detail with ultra-high-definition optics and low-light sensors.',
        bullets: [
          '4K UHD resolution',
          'Starlight night vision'
        ]
      },
      {
        id: 'ai-tracking',
        title: 'AI Active Tracking',
        description: 'Automatically detect and follow unauthorized personnel or vehicles.',
        bullets: [
          'Real-time object recognition',
          'Automated PTZ tracking'
        ]
      },
      {
        id: 'durability',
        title: 'Industrial Grade',
        description: 'Built to withstand harsh environments, from extreme heat to freezing rain.',
        bullets: [
          'IP67 weatherproof rating',
          'Vandal-resistant housing'
        ]
      },
      {
        id: 'network',
        title: 'Smart Integration',
        description: 'Seamlessly connects to your central security hub with zero-latency streaming.',
        bullets: [
          'Edge processing',
          'Encrypted video streams'
        ]
      }
    ]
  },
  'poc-lte': {
    framePath: '/poc-lte radio/poc lte/ezgif-frame-',
    sections: [
      {
        id: 'intro',
        title: 'PoC LTE Radio',
        subtitle: 'Borderless Push-to-Talk',
        description: 'Instant, limitless communication powered by global cellular networks.',
      },
      {
        id: 'coverage',
        title: 'Global Coverage',
        description: 'No more range limits. Talk across the city or across the country.',
        bullets: [
          'National LTE coverage',
          'Wi-Fi seamless handover'
        ]
      },
      {
        id: 'design',
        title: 'Tactical Design',
        description: 'Engineered for fast, reliable operation in fast-paced environments.',
        bullets: [
          'Dedicated PTT button',
          'High-contrast display'
        ]
      },
      {
        id: 'audio',
        title: 'Loud & Clear',
        description: 'High-power speakers ensuring you hear every dispatch in noisy areas.',
        bullets: [
          '2W advanced speaker',
          'Dynamic noise suppression'
        ]
      },
      {
        id: 'tracking',
        title: 'Fleet Management',
        description: 'Integrated GPS for precise real-time tracking of all team members.',
        bullets: [
          'Live GPS positioning',
          'Route history logs'
        ]
      }
    ]
  }
};

const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  const caseStudyData = id ? CASE_STUDIES[id] : null;

  useEffect(() => {
    // Reset scroll progress when switching case studies
    window.scrollTo(0, 0);
    setScrollProgress(0);

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
  }, [id]);

  if (!caseStudyData) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2>Case Study Not Found</h2>
        <button className="case-study-back-btn" style={{ position: 'relative', marginTop: '2rem', left: 'auto', top: 'auto' }} onClick={() => navigate('/projects')}>
          <ArrowLeft size={20} /> Back to Projects
        </button>
      </div>
    );
  }

  // Calculate style for each section
  const getSectionStyle = (index: number) => {
    const totalSections = caseStudyData.sections.length;
    const sectionLength = 1 / totalSections;
    const sectionStart = index * sectionLength;
    const sectionEnd = sectionStart + sectionLength;

    let localProgress = 0;
    if (scrollProgress >= sectionStart && scrollProgress <= sectionEnd) {
      localProgress = (scrollProgress - sectionStart) / sectionLength;
    } else if (scrollProgress > sectionEnd) {
      localProgress = 1;
    }

    let opacity = 0;
    let translateY = 100;
    
    if (localProgress > 0 && localProgress <= 0.2) {
      const p = localProgress / 0.2; 
      opacity = p;
      translateY = 100 * (1 - p);
    } else if (localProgress > 0.2 && localProgress <= 0.8) {
      opacity = 1;
      translateY = 0;
    } else if (localProgress > 0.8 && localProgress < 1) {
      const p = (localProgress - 0.8) / 0.2; 
      opacity = 1 - p;
      translateY = -100 * p;
    } else if (localProgress >= 1) {
      opacity = 0;
      translateY = -100;
    }

    const isLeft = index % 2 === 0;
    const waveAmount = Math.sin(localProgress * Math.PI) * 15;
    const translateX = isLeft ? waveAmount : -waveAmount;
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

      <CaseStudyBackground scrollProgress={scrollProgress} framePath={caseStudyData.framePath} />
      
      {/* Edge Fades */}
      <div className="edge-fade-left"></div>
      <div className="edge-fade-right"></div>

      {/* Fixed Narrative Container */}
      <div className="narrative-container">
        {caseStudyData.sections.map((section, index) => {
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
