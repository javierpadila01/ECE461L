


/**
 * A React component that renders a form with an input field for the user to 
 * enter their name.
 * @component
 */
import React, { useState } from 'react';
  
function Form({ label, onInputChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    onInputChange(value);
  };

  return(
    <div>
      <center>
      <form>
        <label>
         {label}:
          <input type="text" value={inputValue} onChange={handleInputChange}/>
          <br></br>
          <br></br>
        
        </label>
      </form>
      </center>
      
    </div>
  )

}

export default Form;
