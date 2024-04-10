import React, { useState, useEffect, useInsertionEffect } from 'react';
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

    useEffect(() => {
      if (projectID) {fetchData(); } 
            }, [projectID, request1, request2]);

  const fetchData = async () => {
      try {
          const response = await axios.get('/availability-capacity',
        {
          params: {
                projectID: projectID
            }
        });
        if (response.status === 200) {
          const { data } = response;
          const [avail1, cap1, avail2, cap2] = data;
          setAvailable1(avail1);
          setCapacity1(cap1);
          setAvailable2(avail2);
          setCapacity2(cap2);
          console.log('Fetch Successful');
      }
      } catch (error) {
          console.error('Error fetching HW data:', error);
      }
  };

    const handleCheckIn = async (HWset) => {
        try {
          if (!request1 && !request2) {
            console.log('All fields are required');

            return;
          }

          console.log('userID:', userID);
          console.log('projectID:', projectID);
          console.log('HWset:', HWset);
          console.log('quantity:', HWset === 1 ? request1 : request2);

          const response = await axios.post('/checkin', {
            userID: userID,
            projectID: projectID,
            HWSetName: HWset,
            quantity: HWset === 1 ? request1 : request2
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

    const handleCheckOut = async (HWset) => {
        //pass in userid, projectid, and quantity request
        // if there is not enough capacity, that is the error
        //otherwise update the database for that user to check out that amount
        try {
          if (!request1 && !request2) {
            console.log('All fields are required');
            return;
          }
          console.log('userID:', userID);
          console.log('projectID:', projectID);
          console.log('HWset:', HWset);
          console.log('quantity:', HWset === 1 ? request1 : request2);

          const response = await axios.post('/checkout', {
              userID: userID,
              projectID: projectID,
              HWSetName: HWset,
              quantity: HWset === 1 ? request1 : request2
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
                <button onClick={() => handleCheckIn(1)}>Check In</button>
                <button onClick={() => handleCheckOut(1)}>Check Out</button>
        
        </div>

        <div>
                <h2>HW Set 2</h2>
                <p>Total Capacity: {capacity2} </p>
                <p>Available: {available2} </p>
                <Form label="Request" onInputChange={(value) => setRequest2(value)} />
                <button onClick={() => handleCheckIn(2)}>Check In</button>
                <button onClick={() => handleCheckOut(2)}>Check Out</button>
        </div>
        <div className="button-container">
        <button className="nav-button" onClick={handleBackClick}>Back to Project Selection</button>
        </div>
    </div>
  );
}

export default HardwareManagement;
