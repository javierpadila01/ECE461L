import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; 

function HomePage() {
  const navigate = useNavigate();

  const handleExistingUserClick = () => {
    navigate('/existing-user-login');
  };

  const handleNewUserClick = () => {
    navigate('/new-user-login');
  };

  return (
    <div className="button-container">
      <button className="nav-button" onClick={handleExistingUserClick}>Login for Existing User</button>
      <button className="nav-button" onClick={handleNewUserClick}>Create New User</button>
    </div>
  );
}

export default HomePage;
