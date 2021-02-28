import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { CardGameContext } from '@/stores/CardGameContext';
import { UserContext } from '@/stores/userContext';
import { useRouter } from 'next/router';

const Card = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid
    ${(props) =>
      props.isFlipped ? props.theme.colors.yellow : props.theme.colors.blue};
  background-color: ${(props) =>
    props.isFlipped
      ? props.theme.colors.lightYellow
      : props.theme.colors.lightBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.6s;
  transform-style: preserve-3d;
  transform: rotateY(${(props) => (props.isFlipped ? '0deg' : '180deg')});
  cursor: ${(props) => (props.Disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${(props) => props.Disabled && 'none'};

  span {
    font-size: 1.5em;
  }

  img {
    transform: rotateY(180deg);
    width: 20%;
  }
`;

const CardGame = ({ cards }) => {
  const router = useRouter();
  const {
    counterContext,
    comparedCardsContext,
    completedCardsContext,
  } = useContext(CardGameContext);

  const [userInfo, setUserInfo] = useContext(UserContext);
  const [counter, setCounter] = counterContext;
  const [comparedCards, setComparedCards] = comparedCardsContext;
  const [completedCards, setCompletedCards] = completedCardsContext;

  useEffect(() => {
    if (comparedCards.length == 2) {
      if (comparedCards[0].value === comparedCards[1].value) {
        setCompletedCards([
          ...completedCards,
          comparedCards[0],
          comparedCards[1],
        ]);
      }

      setTimeout(() => setComparedCards([]), 1000);
    }
  }, [comparedCards]);

  const handleCard = (cardSelected) => {
    if (userInfo) {
      setCounter(counter + 1);
      setComparedCards([...comparedCards, cardSelected]);
    } else {
      router.push('/login');
    }
  };

  return (
    <React.Fragment>
      {cards?.map((card) => (
        <Card
          key={card._id}
          isFlipped={
            comparedCards.includes(card) || completedCards.includes(card)
          }
          Disabled={comparedCards.length >= 2 || completedCards.includes(card)}
          onClick={() => handleCard(card)}
        >
          {comparedCards.includes(card) || completedCards.includes(card) ? (
            <span>{card.value}</span>
          ) : (
            <img src="assets/bluepi-logo.png"></img>
          )}
        </Card>
      ))}
    </React.Fragment>
  );
};

export default CardGame;
