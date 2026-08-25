import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Factory, ShieldCheck, ArrowRight } from 'lucide-react';
import PageTransition from '../../components/PageTransition/PageTransition';
import Hero3DScene from '../../components/Hero3DScene/Hero3DScene';
import AnimatedCounter from '../../components/AnimatedCounter/AnimatedCounter';
import './Home.css';

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

const Home = () => {
  return (
    <PageTransition className="home-page">
      <section className="hero-section">
        <Hero3DScene />
        <div className="hero-content">
          <h1 className="hero-title">Engineering Technology.<br/>Building the Future.</h1>
          <p className="hero-subtitle">
            SG Technologies delivers innovative technology, engineering, manufacturing and product solutions built for real-world applications.
          </p>
          <div className="hero-actions">
            <Link to="/about" className="cta-button primary">Explore Our Technology</Link>
            <Link to="/products" className="cta-button secondary">View Products</Link>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="services-section">
        <motion.div 
          className="section-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeInVariant} className="section-header">
            <h2>Core Capabilities</h2>
            <p>Delivering excellence across multiple industrial domains.</p>
          </motion.div>
          
          <div className="services-grid">
            <motion.div variants={fadeInVariant} className="service-card card">
              <div className="service-icon"><Cpu size={32} /></div>
              <h3>Advanced Engineering</h3>
              <p>Cutting-edge R&D and engineering solutions for complex industrial challenges.</p>
            </motion.div>
            <motion.div variants={fadeInVariant} className="service-card card">
              <div className="service-icon"><Factory size={32} /></div>
              <h3>Precision Manufacturing</h3>
              <p>State-of-the-art manufacturing facilities ensuring highest quality standards.</p>
            </motion.div>
            <motion.div variants={fadeInVariant} className="service-card card">
              <div className="service-icon"><ShieldCheck size={32} /></div>
              <h3>Enterprise Security</h3>
              <p>Robust security and communication systems for critical infrastructure.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Trust & Metrics Banner */}
      <section className="metrics-section">
        <motion.div 
          className="metrics-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInVariant} className="metric">
            <AnimatedCounter to={15} suffix="+" className="metric-number" />
            <div className="metric-label">Years Experience</div>
          </motion.div>
          <motion.div variants={fadeInVariant} className="metric">
            <AnimatedCounter to={50} suffix="+" className="metric-number" />
            <div className="metric-label">Global Clients</div>
          </motion.div>
          <motion.div variants={fadeInVariant} className="metric">
            <AnimatedCounter to={100} suffix="%" className="metric-number" />
            <div className="metric-label">Quality Assured</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Technology Section */}
      <section className="featured-section">
        <motion.div 
          className="section-container"
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="featured-header">
            <h2>Featured Technology</h2>
            <Link to="/products" className="view-all-link">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="featured-grid">
            {/* Hardcoded snippet for homepage showcase */}
            <div className="featured-card card">
              <div className="featured-image">
                <img src="/wlakie talkie/walkie talkie.png" alt="Walkie-Talkie Pro X" />
              </div>
              <div className="featured-info">
                <h3>Walkie-Talkie Pro X</h3>
                <p>Advanced industrial communication device with extreme durability.</p>
                <Link to="/products/walkie-talkie-pro" className="featured-link">Discover <ArrowRight size={16}/></Link>
              </div>
            </div>
            <div className="featured-card card">
              <div className="featured-image">
                <img src="/camera/cc camera.png" alt="Industrial CC Camera" />
              </div>
              <div className="featured-info">
                <h3>Industrial CC Camera</h3>
                <p>High-definition security camera with night vision and robust casing.</p>
                <Link to="/products/cc-camera" className="featured-link">Discover <ArrowRight size={16}/></Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Global CTA */}
      <section className="cta-section">
        <motion.div 
          className="cta-container card"
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Ready to Transform Your Infrastructure?</h2>
          <p>Get in touch with our experts to discuss your specific requirements.</p>
          <Link to="/contact" className="cta-button primary large">Contact Us Today</Link>
        </motion.div>
      </section>

    </PageTransition>
  );
};

export default Home;
