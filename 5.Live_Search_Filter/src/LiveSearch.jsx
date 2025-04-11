import React, { useState } from 'react';
import './LiveSearch.css';

const namesData = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Krishna',
  'Ishaan', 'Kabir', 'Arjun', 'Sai', 'Ansh',
  'Riya', 'Diya', 'Anaya', 'Meera', 'Saanvi'
];

const LiveSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNames = namesData.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-container">
      <h2>Live Name Search</h2>
      <input
        type="text"
        placeholder="Search names..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredNames.length > 0 ? (
          filteredNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))
        ) : (
          <li className="no-result">No names found</li>
        )}
      </ul>
    </div>
  );
};

export default LiveSearch;
