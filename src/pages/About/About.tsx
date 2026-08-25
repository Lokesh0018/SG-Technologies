import { motion } from 'framer-motion';
import { Lightbulb, Wrench, Factory, ShieldCheck } from 'lucide-react';
import PageTransition from '../../components/PageTransition/PageTransition';
import MechanicalCore3D from '../../components/MechanicalCore3D/MechanicalCore3D';
import './About.css';

const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const About = () => {
  return (
    <PageTransition className="about-page">
      {/* Existing Hero Section */}
      <div className="about-hero-container">
        <div className="about-content">
          <h1 className="about-title">Technology With Purpose</h1>
          <p className="about-subtitle">Pioneering the future of industrial systems.</p>
        </div>
        <div className="about-3d-wrapper">
          <MechanicalCore3D />
        </div>
      </div>

      {/* Mission Section */}
      <section className="mission-section">
        <motion.div 
          className="section-container"
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="mission-statement">
            Our mission is to engineer robust, scalable, and innovative technology solutions that empower industries to operate at their absolute peak potential.
          </h2>
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section className="values-section">
        <motion.div 
          className="section-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeInVariant} className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that drive our engineering excellence.</p>
          </motion.div>
          
          <div className="values-grid">
            <motion.div variants={fadeInVariant} className="value-card card">
              <div className="value-icon"><Lightbulb size={32} /></div>
              <h3>Innovation</h3>
              <p>Relentless pursuit of advanced engineering and disruptive technology solutions.</p>
            </motion.div>
            
            <motion.div variants={fadeInVariant} className="value-card card">
              <div className="value-icon"><Wrench size={32} /></div>
              <h3>Engineering</h3>
              <p>Building highly practical, scalable, and intelligent industrial systems.</p>
            </motion.div>
            
            <motion.div variants={fadeInVariant} className="value-card card">
              <div className="value-icon"><Factory size={32} /></div>
              <h3>Manufacturing</h3>
              <p>Precision-focused production capabilities guaranteeing the highest standards.</p>
            </motion.div>
            
            <motion.div variants={fadeInVariant} className="value-card card">
              <div className="value-icon"><ShieldCheck size={32} /></div>
              <h3>Reliability</h3>
              <p>Designing products proven to withstand the harshest real-world environments.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <motion.div 
          className="section-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeInVariant} className="section-header">
            <h2>Our Journey</h2>
            <p>A history of continuous technological advancement.</p>
          </motion.div>

          <div className="timeline">
            {[
              { year: '2010', title: 'Company Founded', desc: 'Started as a small engineering consultancy focused on communication devices.' },
              { year: '2015', title: 'First Industrial Contract', desc: 'Secured our first major manufacturing contract for heavy-duty security hardware.' },
              { year: '2020', title: 'Global Expansion', desc: 'Opened offices in three new countries and launched our flagship Walkie-Talkie Pro.' },
              { year: '2025', title: 'Next-Gen LTE Radio', desc: 'Revolutionized the industry with our PoC LTE Global Radio systems.' }
            ].map((milestone, index) => (
              <motion.div key={index} variants={fadeInVariant} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content card">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Leadership Team Section */}
      <section className="team-section">
        <motion.div 
          className="section-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeInVariant} className="section-header">
            <h2>Leadership Team</h2>
            <p>The visionaries behind SG Technologies.</p>
          </motion.div>

          <div className="team-grid">
            {[
              { name: 'Sarah Griffin', role: 'Chief Executive Officer' },
              { name: 'David Chen', role: 'Head of Engineering' },
              { name: 'Marcus Johnson', role: 'VP of Manufacturing' },
              { name: 'Elena Rodriguez', role: 'Lead Product Designer' }
            ].map((member, index) => (
              <motion.div key={index} variants={fadeInVariant} className="team-card card">
                <div className="team-avatar">
                  <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

    </PageTransition>
  );
};

export default About;
