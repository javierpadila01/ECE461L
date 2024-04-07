import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Forms';
import axios from 'axios';

function ExistingProject({ onBackToMain }) {
    const handleClick = async () => {
        const btn = document.getElementById('btn');
        btn.addEventListener('click', function handleClick() {
            btn.textContent = 'Button clicked';
        });
    }

    return (
        <div>
  
          <h1>Projects</h1>
  
          <div class = "border">
          <h2>Project 1</h2>
              <CheckIn />
          </div>
  
          <div class = "border">
          <h2>Project 2</h2>
              <CheckIn />
          </div>
  
          <div class = "border">
          <h2>Project 3</h2>
              <CheckIn />
          </div>

            <Button onClick={() => this.handleClick()}>Join</Button>

            <TextField id='btn' label="Enter qty" variant="outlined" > </TextField>
        </div>
  
      )
}