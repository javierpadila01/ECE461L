import React from 'react';
import Form from './Forms';

function NewUserLogin() {
  return (
    <div>
      <h1>Create New User</h1>
      <Form label="Username" />
      <Form label="Password" />
      <button>
        Login
      </button>
    </div>
  );
}

export default NewUserLogin;
