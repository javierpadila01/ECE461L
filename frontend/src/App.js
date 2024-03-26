import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ExistingUserLogin from './ExistingUserLogin';
import NewUserLogin from './NewUserLogin';

function App() {
  const navigate = useNavigate();

  const handleExistingUserClick = () => {
    navigate('/existing-user-login');
  };

  const handleNewUserClick = () => {
    navigate('/new-user-login');
  };

  return (
    <React.StrictMode>
      <div className="container">
        <Routes>
          <Route path="/existing-user-login" element={<ExistingUserLogin />} />
          <Route path="/new-user-login" element={<NewUserLogin />} />
        </Routes>
        <div className="button-container">
          <button className="nav-button" onClick={handleExistingUserClick}>Login for Existing User</button>
          <button className="nav-button" onClick={handleNewUserClick}>Create New User</button>
        </div>
      </div>
    </React.StrictMode>
  );
}

export default App;
