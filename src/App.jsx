import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Flex } from '@chakra-ui/react';
import StartButton from './components/StartButton';
import ClickButton from './components/ClickButton';
import Score from './components/Score';
import Timer from './components/Timer';

const App = () => {
  const [firstTimerStarted, setFirstTimerStarted] = useState(false); // Estado para controlar si el primer temporizador ha empezado
  const [firstTimerTimeLeft, setFirstTimerTimeLeft] = useState(null); // Estado para almacenar el tiempo restante del primer temporizador
  const [timerStarted, setTimerStarted] = useState(false); // Estado para controlar si el temporizador principal ha empezado
  const [timeLeft, setTimeLeft] = useState(null); // Estado para almacenar el tiempo restante del temporizador principal
  const [clicksLeft, setClicksLeft] = useState(0); // Estado para almacenar la cantidad de clics restantes
  const [maxScore, setMaxScore] = useState(0); // Estado para almacenar la puntuación máxima alcanzada
  const [jumpAnimation, setJumpAnimation] = useState(false); // Estado para controlar la animación de salto de la imagen
  const [countdownMessage, setCountdownMessage] = useState(''); // Estado para almacenar el mensaje de cuenta regresiva

  useEffect(() => { // Efecto que se ejecuta cuando el tiempo restante o la cantidad de clics cambian
    if (timeLeft !== null && timeLeft === 0) {  // Si el tiempo se ha agotado, se detiene el temporizador y se reinicia la cantidad de clics
      setTimerStarted(false);
      setClicksLeft(0);

      if (clicksLeft > maxScore) { // Si la cantidad de clics actual es mayor a la puntuación máxima, se actualiza la puntuación máxima y se muestra una alerta
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
    if (firstTimerTimeLeft !== null && firstTimerTimeLeft > 0) { // Si el primer temporizador todavía está en marcha, no se hace nada
      return;
    }

    setFirstTimerStarted(true);
    setFirstTimerTimeLeft(3);
  };

  const handleButtonClick = () => {
    if (timeLeft === null || timeLeft === 0) { // Si el temporizador principal no ha empezado o ha terminado, no se hace nada
      return;
    }

    setClicksLeft((prevClicks) => prevClicks + 1);
    setJumpAnimation(true);
    setTimeout(() => {
      setJumpAnimation(false);
    }, 500);
  };

  useEffect(() => { // Efecto que se ejecuta cuando el primer temporizador ha empezado o su tiempo restante ha cambiado
    let firstTimer;

    if (firstTimerStarted && firstTimerTimeLeft !== null && firstTimerTimeLeft > 0) { // Si el primer temporizador está en marcha y todavía tiene tiempo restante, se actualiza el tiempo restante cada segundo
      firstTimer = setTimeout(() => {
        setFirstTimerTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (firstTimerTimeLeft === 0) { // Si el primer temporizador ha terminado, se detiene y se inicia el temporizador principal
      setFirstTimerStarted(false);
      setTimerStarted(true);
      setTimeLeft(5);
      setClicksLeft(0);
    }

    return () => clearTimeout(firstTimer);
  }, [firstTimerStarted, firstTimerTimeLeft]);

  useEffect(() => {  // Efecto que se ejecuta cuando el temporizador principal ha empezado o su tiempo restante ha cambiado
    let timer;

    if (timerStarted && timeLeft !== null && timeLeft > 0) { // Si el temporizador principal está en marcha y todavía tiene tiempo restante, se actualiza el tiempo restante cada segundo
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) { // Si el temporizador principal ha terminado, se detiene y se reinicia la cantidad de clics y el mensaje de cuenta regresiva
      setTimerStarted(false);
      setClicksLeft(0);
      setCountdownMessage('');
    }

    return () => clearTimeout(timer);
  }, [timerStarted, timeLeft]);

  useEffect(() => { // Efecto que se ejecuta cuando el primer temporizador ha empezado o su tiempo restante ha cambiado

    let countdown;

    if (firstTimerStarted && firstTimerTimeLeft !== null && firstTimerTimeLeft > 0) {  // Si el primer temporizador está en marcha y todavía tiene tiempo restante, se actualiza el mensaje de cuenta regresiva según el tiempo restante
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
