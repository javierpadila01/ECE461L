import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Forms';
import axios from 'axios';

function ExistingUserLogin() {
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

   const response = await axios.post('/signin', {
    userid: userID,
    username: username,
    password: password,
  });
  
  if (response.status === 200) {
    console.log('User signed in successfully');
    navigate('/project-selection', { state: { userID } }); 

  } else {
    console.log('Error:', response.data.message);
  }
} catch (error) {
  console.error('Signup Error:', error);
}
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Login to Existing User</h1>
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

export default ExistingUserLogin;
