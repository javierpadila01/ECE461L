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

   // when the page gets started, render and fetch the data for the quantities of capacity and available into the 

    const handleCheckIn = async () => {
        //pass in userid, projectid, and quantity request
        // if user does not have enough that is the error
        //otherwise update the database with that difference
        try {
          if (!projectName || !description || !projectID) {
            console.log('All fields are required');
            return;
          }
          const response = await axios.post('/checkin', {
            //userid, projectid, quantity
          });
          
          if (response.status === 201) {
            console.log('Checkin Successful');

          } else {
            console.log('Error:', response.data.message);
          }
         
        } catch (error) {
          console.error('Login Error:', error);
        }
    };

    const handleCheckOut = async () => {
        //pass in userid, projectid, and quantity request
        // if there is not enough capacity, that is the error
        //otherwise update the database for that user to check out that amount
        try {
          if (!projectName || !description || !projectID) {
            console.log('All fields are required');
            return;
          }
          const response = await axios.post('/checkout', {
            //userid, projectid, quantity
          });
          
          if (response.status === 201) {
            console.log('Checkout successful');
          } else {}
            console.log('Error:', response.data.message);
          
        }catch(error) {
          console.error('Login Error:', error);
        }
    
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
                <button onClick={handleCheckIn}>Check In</button>
                <button onClick={handleCheckOut}>Check Out</button>
        
        </div>

        <div>
                <h2>HW Set 2</h2>
                <p>Total Capacity: {capacity2} </p>
                <p>Available: {available2} </p>
                <Form label="Request" onInputChange={(value) => setRequest2(value)} />
                <button onClick={handleCheckIn}>Check In</button>
                <button onClick={handleCheckOut}>Check Out</button>
        </div>
        <div className="button-container">
        <button className="nav-button" onClick={handleBackClick}>Back to Project Selection</button>
        </div>
    </div>
  );
}

export default HardwareManagement;
