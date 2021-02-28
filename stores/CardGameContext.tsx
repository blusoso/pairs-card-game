import React, { useState, createContext } from 'react';

interface Card {
  _id: string;
  value: number;
}

export const CardGameContext = createContext(null);

export const CardGameProvider: React.FC = ({ children }) => {
  const [counter, setCounter] = useState<number>(0);
  const [comparedCards, setComparedCards] = useState<Card[]>([]);
  const [completedCards, setCompletedCards] = useState<Card[]>([]);

  return (
    <CardGameContext.Provider
      value={{
        counterContext: [counter, setCounter],
        comparedCardsContext: [comparedCards, setComparedCards],
        completedCardsContext: [completedCards, setCompletedCards],
      }}
    >
      {children}
    </CardGameContext.Provider>
  );
};
