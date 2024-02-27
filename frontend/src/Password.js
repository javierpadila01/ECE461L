/**
 * A React component that renders a form with an input field for the user to 
 * enter their name.
 * @component
 */
import React, { useState } from 'react';

function Password() {
  const [inputValue, setInputValue] = useState('');

  /**
   * Event handler for input change.
   * Updates the input value state with the new value entered by the user.
   * @param {object} event - The event object.
   */
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  return(
    <div>
      <center>
      <form>
        <label>
          Password: 
          <input type="text" value={inputValue} onChange={handleInputChange}/>
          <br></br>
          <br></br>
        </label>
      </form>
      </center>
    </div>
  )
}

export default Password;