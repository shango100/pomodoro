import logo from './logo.svg';
import './App.css';
import {useEffect, useRef, useState} from "react";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            handleSwitch();
            return sessionLength * 60;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isRunning, sessionLength]);

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength((prevBreak) => prevBreak - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength((prevBreak) => prevBreak + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength((prevSession) => prevSession - 1);
      setTimeLeft((prevTime) => prevTime - 60);
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength((prevSession) => prevSession + 1);
      setTimeLeft((prevTime) => prevTime + 60);
    }
  };

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const handleSwitch = () => {
    if (timerLabel === 'Session') {
      setTimerLabel('Break');
      setTimeLeft(breakLength * 60);
    } else {
      setTimerLabel('Session');
      setTimeLeft(sessionLength * 60);
    }
    playBeep();
  };

  const playBeep = () => {
    audioRef.current.play();
  };

  return (

      <div className="app">
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{`${Math.floor(timeLeft / 60)
            .toString()
            .padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`}</div>
        <button id="start_stop" onClick={handleStartStop}>Start/Stop</button>
        <button id="reset" onClick={handleReset}>Reset</button>
        <div className="length-control">
          <div id="break-label">Break Length</div>
          <button id="break-decrement" onClick={handleBreakDecrement}>-</button>
          <div id="break-length">{breakLength}</div>
          <button id="break-increment" onClick={handleBreakIncrement}>+</button>
        </div>
        <div className="length-control">
          <div id="session-label">Session Length</div>
          <button id="session-decrement" onClick={handleSessionDecrement}>-</button>
          <div id="session-length">{sessionLength}</div>
          <button id="session-increment" onClick={handleSessionIncrement}>+</button>
        </div>

        <audio id="beep" ref={audioRef}>
          <source src="../src/assets/beep.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

      </div>

  );
};

export default App;
