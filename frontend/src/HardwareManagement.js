import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from './Forms';
import './HomePage.css'; 
import axios from 'axios';

function HardwareManagement() {
    const navigate = useNavigate();
    const location = useLocation();
    const userID = location.state?.userID;
    const projectID = location.state?.projectID;

    const [capacity1, setCapacity1] = useState(null);
    const [available1, setAvailable1] = useState(null);
    const [capacity2, setCapacity2] = useState(null);
    const [available2, setAvailable2] = useState(null);
    const [request1, setRequest1] = useState(null);
    const [request2, setRequest2] = useState(null);

    const handleCheckIn1 = () => {
        
    };

    const handleCheckOut1 = () => {
        
    };

    const handleCheckIn2 = () => {
        
    };

    const handleCheckOut2 = () => {
        
    };

    const handleBackClick = () => {
        navigate('/project-selection', { state: { userID } });
      };

  return (
    <div>
      <h1>Hardware Management</h1>
      <p>Logged in as: {userID}</p>
      <p>Project ID: {projectID}</p>

        <div>
                <h2>HW Set 1</h2>
                <p>Total Capacity: {capacity1}</p>
                <p>Available: {available1} </p>
                <Form label="Request" onInputChange={(value) => setRequest1(value)} />
                <button onClick={handleCheckIn1}>Check In</button>
                <button onClick={handleCheckOut1}>Check Out</button>
        
        </div>

        <div>
                <h2>HW Set 2</h2>
                <p>Total Capacity: {capacity2} </p>
                <p>Available: {available2} </p>
                <Form label="Request" onInputChange={(value) => setRequest2(value)} />
                <button onClick={handleCheckIn2}>Check In</button>
                <button onClick={handleCheckOut2}>Check Out</button>
        </div>
        <div className="button-container">
        <button className="nav-button" onClick={handleBackClick}>Back to Project Selection</button>
        </div>
    </div>
  );
}

export default HardwareManagement;
