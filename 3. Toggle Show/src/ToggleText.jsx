import React, { useState } from 'react';
import './ToggleText.css';

const ToggleText = () => {
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(prev => !prev);
  };

  return (
    <div className="toggle-container">
      <h2>Toggle Show/Hide</h2>
      <button onClick={handleToggle}>
        {visible ? 'Hide' : 'Show'} Text
      </button>

      {/* Conditional rendering with a fade effect */}
      {visible && <p className="fade-in">👋 Hello World!</p>}
    </div>
  );
};

export default ToggleText;
