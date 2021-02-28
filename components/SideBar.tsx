import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardGameContext } from '@/stores/CardGameContext';
import { device } from '@/static/device';
import { UserContext } from '@/stores/userContext';
import axios from 'axios';

interface Props {
    cards: Card[];
    globalBestScore: number;
  }

  interface Card {
    _id: string;
    value: number;
  }

const SideBarWrapper = styled.div`
  width: 100%;

  @media ${device.mobileL} {
    margin-bottom: 2.8rem;
  }
`;

const ScoreWrapper = styled.div`
  width: 100%;

  @media ${device.mobileL} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
`;

const ScoreGroup = styled.div`
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.colors.lightBlue};
  padding: 1.3rem 0.3rem;
  border-radius: 8px;
`;

const Paragraph = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.3px;
  text-align: center;
  color: ${(props) => props.score && props.theme.colors.blue};
  font-size: ${(props) => (props.score ? '20px' : '14px')};
  font-weight: ${(props) => props.score && '600'};
`;

const Button = styled.button`
  color: ${(props) => (props.primary ? '#fff' : props.theme.colors.blue)};
  background-color: ${(props) =>
    props.primary ? props.theme.colors.blue : props.theme.colors.lightBlue};
  width: 100%;
  padding: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-size: 600;
  &:hover {
    background-color: ${(props) =>
      props.primary ? 'rgba(0, 87, 255, 0.9)' : 'rgba(0, 87, 255, 0.2)'};
  }
`;

const SideBar: React.FC<Props> = ({ cards, globalBestScore }) => {
  const {
    counterContext,
    comparedCardsContext,
    completedCardsContext,
  } = useContext(CardGameContext);
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [counter, setCounter] = counterContext;
  const [comparedCards, setComparedCards] = comparedCardsContext;
  const [completedCards, setCompletedCards] = completedCardsContext;
  const [myBest, setMyBest] = useState<number>(0);
  const [globalBest, setGlobalBest] = useState(globalBestScore);

  useEffect(() => {
    if (userInfo) {
      axios
        .get(`${process.env.API_ENDPOINT}/users/${userInfo._id}`)
        .then((res) => setMyBest(res.data.data.best_score));
    }
  }, [userInfo]);

  useEffect(() => {
    if (completedCards.length == cards.length) {
    //   if (myBest == 0) {
    //     setMyBest(counter);
    //   } else {
    //     if (counter < myBest) {
    //       setMyBest(counter);
    //       storeMyBestScore(counter);
    //     }
    //   }
      storeMyBestScore(counter);


      if (globalBest == 0) {
        setGlobalBest(counter);
      } else {
        if (counter < globalBest) {
          setGlobalBest(counter);
        }
      }

    //   setTimeout(() => clearScore(), 1000);
    }
  }, [completedCards]);

  const storeMyBestScore = async (counter) => {
    await axios
      .put(`${process.env.API_ENDPOINT}/users/my-best/${userInfo._id}`, {
        best_score: counter,
      })
      .then((res) => {
        setMyBest(res.data.data.best_score);
      });
  };

  const handleNewGame = () => {
    clearScore();
  };

  const clearScore = () => {
    setCounter(0);
    setComparedCards([]);
    setCompletedCards([]);
  };

  return (
    <>
      <SideBarWrapper>
        <ScoreWrapper>
          <ScoreGroup>
            <Paragraph>Click</Paragraph>
            <Paragraph score>{counter}</Paragraph>
          </ScoreGroup>
          <ScoreGroup>
            <Paragraph>My Best</Paragraph>
            <Paragraph score>{myBest}</Paragraph>
          </ScoreGroup>
          <ScoreGroup>
            <Paragraph>Global Best</Paragraph>
            <Paragraph score>{globalBest}</Paragraph>
          </ScoreGroup>
        </ScoreWrapper>
        <Button primary onClick={handleNewGame}>
          New Game
        </Button>
      </SideBarWrapper>
    </>
  );
};

export default SideBar;
