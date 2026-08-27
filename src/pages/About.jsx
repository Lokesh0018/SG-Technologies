import React from 'react';
import About3DSection from '../components/About3DSection';

const About = () => {
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <About3DSection />
    </div>
  );
};

export default About;
