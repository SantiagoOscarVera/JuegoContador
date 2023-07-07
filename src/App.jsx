import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Flex } from '@chakra-ui/react';
import StartButton from './components/StartButton';
import ClickButton from './components/ClickButton';
import Score from './components/Score';
import Timer from './components/Timer';

const App = () => {
  const [firstTimerStarted, setFirstTimerStarted] = useState(false);
  const [firstTimerTimeLeft, setFirstTimerTimeLeft] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [clicksLeft, setClicksLeft] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [jumpAnimation, setJumpAnimation] = useState(false);
  const [countdownMessage, setCountdownMessage] = useState('');

  useEffect(() => {
    if (timeLeft !== null && timeLeft === 0) {
      setTimerStarted(false);
      setClicksLeft(0);

      if (clicksLeft > maxScore) {
        setMaxScore(clicksLeft);
        Swal.fire({
          title: '¡Hiciste nuevo máximo!',
          text: '¡Felicidades, ganaste un descuento en la empresa de los Mario Bros!',
          imageUrl:
            'https://www.muycomputer.com/wp-content/uploads/2023/05/SuperMarioBros.Lapelicula-1000x600.jpg',
          imageWidth: 500,
          imageHeight: 300,
          imageAlt: 'Custom image',
          zIndex: '9999',
        });
      }
    }
  }, [timeLeft, clicksLeft, maxScore]);

  const handleStartClick = () => {
    if (firstTimerTimeLeft !== null && firstTimerTimeLeft > 0) {
      return;
    }

    setFirstTimerStarted(true);
    setFirstTimerTimeLeft(3);
  };

  const handleButtonClick = () => {
    if (timeLeft === null || timeLeft === 0) {
      return;
    }

    setClicksLeft((prevClicks) => prevClicks + 1);
    setJumpAnimation(true);
    setTimeout(() => {
      setJumpAnimation(false);
    }, 500);
  };

  useEffect(() => {
    let firstTimer;

    if (firstTimerStarted && firstTimerTimeLeft !== null && firstTimerTimeLeft > 0) {
      firstTimer = setTimeout(() => {
        setFirstTimerTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (firstTimerTimeLeft === 0) {
      setFirstTimerStarted(false);
      setTimerStarted(true);
      setTimeLeft(5);
      setClicksLeft(0);
    }

    return () => clearTimeout(firstTimer);
  }, [firstTimerStarted, firstTimerTimeLeft]);

  useEffect(() => {
    let timer;

    if (timerStarted && timeLeft !== null && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerStarted(false);
      setClicksLeft(0);
      setCountdownMessage('');
    }

    return () => clearTimeout(timer);
  }, [timerStarted, timeLeft]);
  useEffect(() => {
    let countdown;

    if (firstTimerStarted && firstTimerTimeLeft !== null && firstTimerTimeLeft > 0) {
      countdown = setTimeout(() => {
        switch (firstTimerTimeLeft) {
          case 3:
            setCountdownMessage('Preparados');
            break;
          case 2:
            setCountdownMessage('Listos');
            break;
          case 1:
            setCountdownMessage('Ya');
            break;
          default:
            setCountdownMessage('');
            break;
        }
      }, 1000 * (1 - firstTimerTimeLeft));
    }

    return () => clearTimeout(countdown);
  }, [firstTimerStarted, firstTimerTimeLeft]);


  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" direction="column">

      <h1
        style={{
          fontSize: "40px",
        }}>
        JuegoContador
      </h1>
      
      <img
        src="https://media.discordapp.net/attachments/734432464398975006/1126657120893415504/pngwing.com.png"
        alt="Mario Bross"
        style={{
          width: '200px',
          marginBottom: '20px',
          marginTop: "40px",
          animation: jumpAnimation ? 'jump 0.5s' : 'none',
        }}
      />
      <img
        src="https://images-ext-2.discordapp.net/external/8fTtobzkPXM8peXdVdeI_zN0w0aFkAv387htNG1OzXc/https/media.tenor.com/SxEswkTxF1kAAAAi/turtle-mario-gaming.gif"
        alt="Turtle Mario"
        style={{
          width: '200px',
          marginBottom: '20px',
          animation: 'fly 10s infinite',
          left: 0,
          top: 0,
          zIndex: '1',
          position: 'absolute',
        }}
      />
      <img
        src="https://images-ext-2.discordapp.net/external/8fTtobzkPXM8peXdVdeI_zN0w0aFkAv387htNG1OzXc/https/media.tenor.com/SxEswkTxF1kAAAAi/turtle-mario-gaming.gif"
        alt="Turtle Mario"
        style={{
          width: '200px',
          marginBottom: '20px',
          animation: 'fly 13s infinite',
          left: 0,
          position: 'absolute',
        }}
      />
      <StartButton handleStartClick={handleStartClick} />
      <ClickButton handleButtonClick={handleButtonClick} clicksLeft={clicksLeft} />
      <div className="tiempo">
        <Score maxScore={maxScore} />
      </div>
      <div>
        <Timer
          timerStarted={timerStarted}
          timeLeft={timeLeft}
          countdownMessage={countdownMessage}
        />
      </div>
    </Flex>
  );
};

export default App;
