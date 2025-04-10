import React, { useState } from 'react';
import './CharCounter.css';

const CharCounter = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="char-container">
      <h2>Live Character Counter</h2>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
        rows={5}
      ></textarea>
      <p className="count">Character Count: {text.length}</p>
    </div>
  );
};

export default CharCounter;
