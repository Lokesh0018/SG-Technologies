import PageTransition from '../../components/PageTransition/PageTransition';
import Hero3DScene from '../../components/Hero3DScene/Hero3DScene';
import './Home.css';

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
            <button className="cta-button primary">Explore Our Technology</button>
            <button className="cta-button secondary">View Products</button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
