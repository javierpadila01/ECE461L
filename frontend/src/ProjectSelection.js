import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectSelection() {
  const navigate = useNavigate();

  const handleExistingProjectClick = () => {
    navigate('/existing-project');
  };

  const handleNewProjectClick = () => {
    navigate('/new-project');
  };

  return (
    <div className="container">
      <div className="button-container">
        <button onClick={handleExistingProjectClick}>Find Existing Project</button>
        <button onClick={handleNewProjectClick}>Create New Project</button>
      </div>
    </div>
  );
}

export default ProjectSelection;
