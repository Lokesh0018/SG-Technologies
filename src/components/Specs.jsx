import React from 'react';

const Specs = () => {
  return (
    <section id="specs" className="section-specs">
      <div className="specs-container">
        <h2 className="specs-title">Technical Specifications</h2>
        
        <div className="specs-grid">
          <div className="spec-group">
            <h3>Connectivity</h3>
            <ul>
              <li>
                <span className="spec-label">Network</span>
                <span className="spec-value">4G LTE / Wi-Fi / Bluetooth 5.2</span>
              </li>
              <li>
                <span className="spec-label">Latency</span>
                <span className="spec-value">&lt; 50ms (Global Average)</span>
              </li>
              <li>
                <span className="spec-label">PTT Protocol</span>
                <span className="spec-value">Proprietary Ultra-Low Latency VoIP</span>
              </li>
            </ul>
          </div>
          
          <div className="spec-group">
            <h3>Hardware</h3>
            <ul>
              <li>
                <span className="spec-label">Processor</span>
                <span className="spec-value">Custom ARM Cortex-A75</span>
              </li>
              <li>
                <span className="spec-label">Audio</span>
                <span className="spec-value">3W Front-facing Speaker, Dual Noise-Canceling Mics</span>
              </li>
              <li>
                <span className="spec-label">Display</span>
                <span className="spec-value">1.4" OLED High-Contrast</span>
              </li>
            </ul>
          </div>
          
          <div className="spec-group">
            <h3>Physical</h3>
            <ul>
              <li>
                <span className="spec-label">Dimensions</span>
                <span className="spec-value">130mm x 60mm x 25mm</span>
              </li>
              <li>
                <span className="spec-label">Weight</span>
                <span className="spec-value">245g (including battery)</span>
              </li>
              <li>
                <span className="spec-label">Materials</span>
                <span className="spec-value">Aerospace-grade Aluminum, TPU Bumper</span>
              </li>
            </ul>
          </div>
          
          <div className="spec-group">
            <h3>Power</h3>
            <ul>
              <li>
                <span className="spec-label">Battery Capacity</span>
                <span className="spec-value">4500mAh</span>
              </li>
              <li>
                <span className="spec-label">Charging Port</span>
                <span className="spec-value">USB-C (Fast Charge capable)</span>
              </li>
              <li>
                <span className="spec-label">Drop-in Charger</span>
                <span className="spec-value">Magnetic Desktop Dock</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specs;
