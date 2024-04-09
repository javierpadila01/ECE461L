import React from 'react';
import './HomePage.css'; 
import {useLocation, useNavigate } from 'react-router-dom';

function ProjectSelection({}) {
  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.state?.userID;

  const handleExistingProjectClick = () => {
    navigate('/existing-project', { state: { userID } });

  };

  const handleNewProjectClick = () => {
    navigate('/new-project', { state: { userID } });
    
  };

  const handleLogout = () => {
    navigate('/');
  };


  return (
   <div>
   <h1>Project Selection</h1>
   <p>Logged in as: {userID}</p>
   <div className="button-container">
      <button className="nav-button" onClick={handleExistingProjectClick}>Login for Existing Project</button>
      <button className="nav-button" onClick={handleNewProjectClick}>Create New Project</button>
      <button className="nav-button" onClick={handleLogout}>Logout</button>
    </div>
    </div>
  );
}

export default ProjectSelection;
