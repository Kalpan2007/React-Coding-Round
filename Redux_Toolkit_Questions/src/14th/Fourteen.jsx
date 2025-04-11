import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset } from './counterSlice';
import './Fourteen.css';

const Fourteen = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="counter-container">
      <h2>Counter: {count}</h2>
      <div className="btns">
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </div>
  );
};

export default Fourteen;
