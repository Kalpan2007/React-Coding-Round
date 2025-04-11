import React, { useState } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'container dark' : 'container light'}>
      <h1>{darkMode ? 'Dark Mode' : 'Light Mode'}</h1>
      <button onClick={handleToggle}>
        Toggle to {darkMode ? 'Light' : 'Dark'}
      </button>
      <p>This is a simple theme toggle component using React.</p>
    </div>
  );
};

export default ThemeToggle;
