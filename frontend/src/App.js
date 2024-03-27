import React, {useState} from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ExistingUserLogin from './ExistingUserLogin';
import NewUserLogin from './NewUserLogin';
import MyComponent from './MyCompClass';

function App() {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(true);

  const handleExistingUserClick = () => {
    navigate('/existing-user-login');
    setShowButtons(false);
  };

  const handleNewUserClick = () => {
    navigate('/new-user-login');
    setShowButtons(false);
  };

  const handleBackToMain = () => {
    setShowButtons(true);
  };

  return (
    <React.StrictMode>
      <div className="container">
        <Routes>
          <Route path="/existing-user-login" element={<ExistingUserLogin  onBackToMain={handleBackToMain} />} />
          <Route path="/new-user-login" element={<NewUserLogin onBackToMain={handleBackToMain} />} />
          <Route path="/project-selection" element={<NewUserLogin />} />
          <Route path="/existing-project" element={<NewUserLogin />} />
          <Route path="/new-project" element={<NewUserLogin />} />
        </Routes>
        {showButtons && (
        <div className="button-container">
          <MyComponent></MyComponent>
          <button className="nav-button" onClick={handleExistingUserClick}>Login for Existing User</button>
          <button className="nav-button" onClick={handleNewUserClick}>Create New User</button>
        </div>
        )}
      </div>
    </React.StrictMode>
  );
}

export default App;
