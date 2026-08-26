import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../../components/PageTransition/PageTransition';
import AnimatedCounter from '../../components/AnimatedCounter/AnimatedCounter';
import './Projects.css';

// Expanded dummy data for premium layout
const projectsData = [
  { 
    id: 'proj-1', 
    title: 'Global Mining Comms', 
    category: 'Engineering', 
    year: '2025',
    client: 'Apex Minerals',
    description: 'Deployed a mesh communication network 500m underground for continuous operations.',
    image: '/wlakie talkie/walkie talkie.png' 
  },
  { 
    id: 'proj-2', 
    title: 'Automated Facility Security', 
    category: 'Security', 
    year: '2024',
    client: 'Titan Logistics',
    description: 'Integrated a 4K AI-driven surveillance system across a 1M sq ft warehouse.',
    image: '/camera/cc camera.png' 
  },
  { 
    id: 'proj-3', 
    title: 'PoC LTE Fleet Rollout', 
    category: 'Telecommunications', 
    year: '2026',
    client: 'National Transport Alliance',
    description: 'Equipped a fleet of 5,000 vehicles with borderless Push-to-Talk over Cellular.',
    image: '/poc-lte radio/poc-lte-radio.png' 
  }
];

const categories = ['All', 'Engineering', 'Security', 'Telecommunications'];

const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Projects = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <PageTransition className="projects-page">
      
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="projects-hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Case Studies & Projects
          </motion.h1>
          <motion.p 
            className="projects-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transforming global infrastructure with uncompromising engineering and technology.
          </motion.p>
          
          <motion.div 
            className="projects-metrics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-metric">
              <AnimatedCounter to={150} suffix="+" className="p-metric-val" />
              <span className="p-metric-label">Projects Delivered</span>
            </div>
            <div className="p-metric">
              <AnimatedCounter to={24} className="p-metric-val" />
              <span className="p-metric-label">Countries Served</span>
            </div>
            <div className="p-metric">
              <AnimatedCounter to={100} suffix="%" className="p-metric-val" />
              <span className="p-metric-label">Client Retention</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="projects-grid-section">
        <div className="section-container">
          
          {/* Filter Bar */}
          <div className="projects-filter-bar">
            {categories.map(category => (
              <button 
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Animated Grid */}
          <motion.div layout className="premium-projects-grid">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div 
                  layout
                  key={project.id} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="premium-project-card card"
                >
                  <div className="project-bg">
                    {project.image ? (
                      <img src={project.image} alt={project.title} />
                    ) : (
                      <div className="project-bg-placeholder">
                        <span className="sg-logo-icon">SG</span>
                      </div>
                    )}
                    <div className="project-overlay"></div>
                  </div>
                  
                  <div className="project-content">
                    <div className="project-meta-top">
                      <span className="project-category-tag">{project.category}</span>
                      <span className="project-year">{project.year}</span>
                    </div>
                    
                    <div className="project-info-reveal">
                      <h3>{project.title}</h3>
                      <p className="project-client">Client: {project.client}</p>
                      <p className="project-desc">{project.description}</p>
                      
                      <button className="view-case-study-btn" onClick={() => navigate('/case-study')}>
                        View Case Study <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* Impact Banner */}
      <section className="impact-banner">
        <motion.div 
          className="impact-content"
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>"SG Technologies didn't just meet our engineering requirements—they completely redefined what we thought was possible in harsh environments."</h2>
          <p>— Global Operations Director, Apex Minerals</p>
        </motion.div>
      </section>

    </PageTransition>
  );
};

export default Projects;
