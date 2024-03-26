import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Forms';

function ExistingUserLogin({onBackToMain}) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    //check if the login is valid (that is both fields are good and valid, check the password, login, and userID and pass the UserID along)    
    navigate('/project-selection');
  };

  const handleBackClick = () => {
    navigate('/');
    onBackToMain();
  };

  return (
    <div>
      <h1>Login to Existing User</h1>
      <Form label="Username" />
      <Form label="UserID" />
      <Form label="Password" />
      <button onClick={handleLoginClick}>Login</button>
      <div>
        <button onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
}

export default ExistingUserLogin;