import React, { useState } from 'react';
import './component.css'

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter-container">
      <h2>Counter: {count}</h2>
      <div className="btn-group">
        <button onClick={increment}>+</button>
        <button onClick={decrement} disabled={count <= 0}>-</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
