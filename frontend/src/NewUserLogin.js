import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Forms';
import axios from 'axios';

function NewUserLogin({ onBackToMain }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = async () => {
    try {
      if (!username || !userID || !password) {
        console.log('All fields are required');
        return;
      }

      const response = await axios.post('/api/users/login', {
        userId: userID,
        password: password,
      });

      const token = response.data.token;
      console.log('Login Successful');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/');
    onBackToMain();
  };

  return (
    <div>
      <h1>Create New User</h1>
      <Form label="Username" onInputChange={(value) => setUsername(value)} />
      <Form label="UserID" onInputChange={(value) => setUserID(value)} />
      <Form label="Password" onInputChange={(value) => setPassword(value)} />
      <button onClick={handleLoginClick}>Login</button>
      <div>
        <button onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
}

export default NewUserLogin;
