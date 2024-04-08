import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from './Forms';
import axios from 'axios';

function NewProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.state?.userID;

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [projectID, setProjectID] = useState('');


  const handleLoginClick = async () => {
    try {
      if (!projectName || !description || !projectID) {
        console.log('All fields are required');
        return;
      }
      navigate('/hardware-management', { state: { userID, projectID } });

      const response = await axios.post('/api/users/signup', {
        projectName: projectName,
        description: description,
        projectID: projectID,
      });

      const token = response.data.token;
      console.log('Login Successful');
    
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/project-selection', { state: { userID } });
  };

  return (
    <div>
      <h1>Create New Project</h1>
      <p>Logged in as: {userID}</p>
      <Form label="Project Name" onInputChange={(value) => setProjectName(value)} />
      <Form label="Description" onInputChange={(value) => setDescription(value)} />
      <Form label="ProjectID" onInputChange={(value) => setProjectID(value)} />
      <button onClick={handleLoginClick}>Create Project</button>
      <div>
        <button onClick={handleBackClick}>Back to Project Selection</button>
      </div>
    </div>
  );
}

export default NewProject;
