import PageTransition from '../../components/PageTransition/PageTransition';
import Factory3D from '../../components/Factory3D/Factory3D';
import './Manufacturing.css';

const stages = [
  {
    id: '01',
    title: 'Design',
    description: 'Advanced CAD and engineering design processes to ensure product viability and mechanical integrity before prototyping begins.'
  },
  {
    id: '02',
    title: 'Prototyping',
    description: 'Rapid prototyping and validation using industrial 3D printing and CNC machining to test form, fit, and function.'
  },
  {
    id: '03',
    title: 'Manufacturing',
    description: 'Precision production utilizing automated robotic systems and strict quality tolerances for large-scale manufacturing.'
  },
  {
    id: '04',
    title: 'Assembly',
    description: 'Component integration and final assembly performed in clean-room environments for sensitive electronic equipment.'
  }
];

const Manufacturing = () => {
  return (
    <PageTransition className="manufacturing-page">
      <div className="manufacturing-scroll-container">
        
        <div className="manufacturing-header">
          <h1 className="m-title">Our Production Journey</h1>
          <p className="m-subtitle">From concept to deployment, discover how we build the future of technology.</p>
        </div>

        <div className="factory-stages">
          {stages.map((stage, index) => (
            <div key={stage.id} className="stage-card">
              <span className="stage-number">{stage.id}</span>
              <div className="stage-info">
                <h2>{stage.title}</h2>
                <p>{stage.description}</p>
              </div>
              <div className="stage-3d-placeholder">
                {/* We use the same abstract machine for all stages for this demo */}
                <Factory3D />
              </div>
            </div>
          ))}
        </div>

      </div>
    </PageTransition>
  );
};

export default Manufacturing;
