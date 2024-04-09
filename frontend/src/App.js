import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ExistingUserLogin from './ExistingUserLogin';
import NewUserLogin from './NewUserLogin';
import HomePage from './HomePage';
import ProjectSelection from './ProjectSelection';
import ExistingProject from './ExistingProject';
import NewProject from './NewProject';
import HardwareManagement from './HardwareManagement';

class App extends React.Component {
  render () {
    return (

      <div className="container">
        <Routes>
          {/* This is the routing for the project "/" is the initial page and everything navigates using useNavigate */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/existing-user-login" element={<ExistingUserLogin />} />
          <Route path="/new-user-login" element={<NewUserLogin />} />
          <Route path="/project-selection" element={<ProjectSelection />} />
          <Route path="/existing-project" element={<ExistingProject/>} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/hardware-management" element={<HardwareManagement />} />
        </Routes>
      </div>
  );
}

}

export default App;
