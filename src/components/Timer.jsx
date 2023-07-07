import React from 'react';

const Timer = ({ timerStarted, timeLeft, countdownMessage }) => {
  return (
    <div className="tiempo" style={{ fontSize: '20px' }}>
      {timerStarted && timeLeft !== null && timeLeft > 0
        ? `Tiempo restante: ${timeLeft} segundos`
        : countdownMessage}
    </div>
  );
};

export default Timer;
