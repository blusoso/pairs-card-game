import React, { useState, createContext } from 'react';

export const CardGameContext = createContext();

export const CardGameProvider = (props) => {
  const [counter, setCounter] = useState(0);
  const [comparedCards, setComparedCards] = useState([]);
  const [completedCards, setCompletedCards] = useState([]);

  return (
    <CardGameContext.Provider
      value={{
        counterContext: [counter, setCounter],
        comparedCardsContext: [comparedCards, setComparedCards],
        completedCardsContext: [completedCards, setCompletedCards],
      }}
    >
      {props.children}
    </CardGameContext.Provider>
  );
};
