import PageTransition from '../../components/PageTransition/PageTransition';
import MechanicalCore3D from '../../components/MechanicalCore3D/MechanicalCore3D';
import './About.css';

const About = () => {
  return (
    <PageTransition className="about-page">
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">Technology With Purpose</h1>
          
          <div className="about-features">
            <div className="feature-item">
              <h3>Innovation</h3>
              <p>Advanced engineering and technology solutions.</p>
            </div>
            
            <div className="feature-item">
              <h3>Engineering</h3>
              <p>Practical and scalable engineering systems.</p>
            </div>
            
            <div className="feature-item">
              <h3>Manufacturing</h3>
              <p>Precision-focused production capabilities.</p>
            </div>
            
            <div className="feature-item">
              <h3>Reliability</h3>
              <p>Products designed for real-world environments.</p>
            </div>
          </div>
        </div>
        
        <div className="about-3d-wrapper">
          <MechanicalCore3D />
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
