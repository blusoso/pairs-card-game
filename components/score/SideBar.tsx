import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardGameContext } from '../../stores/CardGameContext';
import { device } from '../../static/device';
import { UserContext } from '../../stores/userContext';
import Button from '../../components/template/Button';
import axios from 'axios';

interface Props {
  cards: Card[];
  globalBestScore: number;
}

interface Card {
  _id: string;
  value: number;
}

interface StyledProps {
  score?: boolean;
  theme: any;
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
  background-color: ${(props: StyledProps) => props.theme.colors.lightBlue};
  padding: 1.3rem 0.3rem;
  border-radius: 8px;
`;

const Paragraph = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.3px;
  text-align: center;
  color: ${(props: StyledProps) => props.score && props.theme.colors.blue};
  font-size: ${(props: StyledProps) => (props.score ? '20px' : '14px')};
  font-weight: ${(props: StyledProps) => props.score && '600'};
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
      storeMyBestScore(counter);

      if (globalBest == 0) {
        setGlobalBest(counter);
      } else {
        if (counter < globalBest) {
          setGlobalBest(counter);
        }
      }
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
        <Button primary uppercase padding={1.2} handleOnclick={handleNewGame}>
          New Game
        </Button>
      </SideBarWrapper>
    </>
  );
};

export default SideBar;
