import React, {useState} from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ExistingUserLogin from './_ExistingUserLogin';
import NewUserLogin from './_NewUserLogin';
import MyComponent from './MyCompClass';

class App extends React.Component {
  render () {
    return (

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/existing-user-login" element={<_ExistingUserLogin />} />
          <Route path="/new-user-login" element={<_NewUserLogin />} />
          <Route path="/project-selection" element={<_ProjectSelection />} />
          <Route path="/existing-project" element={<_ExistingProject/>} />
          <Route path="/new-project" element={<_NewProject />} />
          <Route path="/hardware-management" element={<_HardwareManagement />} />
        </Routes>
      </div>
  );
}

}

export default App;
