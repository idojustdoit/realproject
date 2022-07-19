import React, { useEffect } from "react";
import styled from "styled-components";

const Timer = () => {
  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    setRunning(true);
  }, []);

  // window.addEventListener("unload", setRunning(false));
  return (
    <div className="stopwatch">
      <div className="numbers">
        <span>{("0" + Math.floor((time / 600000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>
      <div className="buttons">
        <button onClick={() => setTime(0)}>Reset</button>
      </div>
    </div>
  );
};
export default Timer;
