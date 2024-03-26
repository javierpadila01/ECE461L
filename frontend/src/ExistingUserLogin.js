import React from 'react';
import Form from './Forms';

function ExistingUserLogin() {
  return (
    <div>
      <h1>Login for Existing User</h1>
      <Form label="Username" />
      <Form label="UserID" />
      <Form label="Password" />
      <button>
      Login
      </button>
    </div>
  );
}

export default ExistingUserLogin;
