import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Forms';

function NewUserLogin({onBackToMain}) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    //check if the login is valid (that is both fields are filled and valid)    
    navigate('/project-selection');
  };

  const handleBackClick = () => {
    navigate('/');
    onBackToMain();
  };

  return (
    <div>
      <h1>Create New User</h1>
      <Form label="Username" />
      <Form label="Password" />
      <button onClick={handleLoginClick}>Login</button>
      <div>
        <button onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
}

export default NewUserLogin;
