import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="timer-container">
      <h1>Timer</h1>
      <p className="time">{seconds}s</p>
      <div className="btn-group">
        <button onClick={startTimer} className="start-btn">Start</button>
        <button onClick={stopTimer} className="stop-btn">Stop</button>
      </div>
    </div>
  );
};

export default Timer;
