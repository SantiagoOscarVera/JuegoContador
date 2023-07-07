import React from 'react';
import { Button } from '@chakra-ui/react';

const StartButton = ({ handleStartClick }) => {
  return (
    <Button variant="outline" colorScheme="whatsapp" onClick={handleStartClick} marginBottom="2">
      Iniciar juego
    </Button>
  );
};

export default StartButton;

