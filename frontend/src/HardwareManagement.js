import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from './Forms';
import axios from 'axios';

function HardwareManagement() {
    const navigate = useNavigate();
    const location = useLocation();
    const userID = location.state?.userID;
    const projectID = location.state?.projectID;

  return (
    <div>
      <h1>Hardware Management</h1>
      <p>This is the hardware management page.</p>
      <p>Logged in as: {userID}</p>
      <p>Project ID: {projectID}</p>
    </div>
  );
}

export default HardwareManagement;
