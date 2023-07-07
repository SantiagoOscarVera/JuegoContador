import React from 'react';
import { Button } from '@chakra-ui/react';

const ClickButton = ({ handleButtonClick, clicksLeft }) => {
  return (
    <Button variant="outline" colorScheme="teal" onClick={handleButtonClick} marginBottom="7">
      Clickear ({clicksLeft})
    </Button>
  );
};

export default ClickButton;