import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from './Forms';
import axios from 'axios';

function ExistingProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.state?.userID;
  
  const [projectID, setProjectID] = useState('');

  const handleLoginClick = async () => {
    try {
      
      if (!projectID) {
        console.log('All fields are required');
        return;
      }
      navigate('/hardware-management', { state: { userID, projectID } }); //change the location of this line
      const response = await axios.post('/api/users/signup', {
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
      <h1>Login to Existing Project</h1>
      <p>Logged in as: {userID}</p>
      <Form label="ProjectID" onInputChange={(value) => setProjectID(value)} />
      <button onClick={handleLoginClick}>Login to Current Project</button>
      <div>
        <button onClick={handleBackClick}>Back to Project Selection</button>
      </div>
    </div>
  );
}

export default ExistingProject;
