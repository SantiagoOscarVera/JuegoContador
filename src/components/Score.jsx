import React from 'react';

const Score = ({ maxScore }) => {
  return (
    <div
      className="puntaje"
      style={{
        fontSize: '24px',
        marginBottom: '10px',
        borderRadius: '10px',
      }}
    >
      Puntaje máximo: {maxScore}
    </div>
  );
};

export default Score;
