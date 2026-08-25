import PageTransition from '../../components/PageTransition/PageTransition';
import './Projects.css';

// Dummy data for initial layout
const projectsData = [
  { id: 1, title: 'Project Alpha', category: 'Engineering', year: '2025' },
  { id: 2, title: 'Project Beta', category: 'Manufacturing', year: '2024' },
  { id: 3, title: 'Project Gamma', category: 'Technology', year: '2026' },
];

const Projects = () => {
  return (
    <PageTransition className="projects-page">
      <div className="projects-container">
        <h1 className="page-heading">Featured Projects</h1>
        <div className="projects-grid">
          {projectsData.map(project => (
            <div key={project.id} className="project-card glass-panel">
              <div className="project-image-placeholder">
                <span className="sg-logo-icon">SG</span>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <button className="view-project-btn">View Project</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
