import React from 'react';
import styled from 'styled-components';
import SideBar from '@/components/SideBar';
import CardGame from '@/components/CardGame';
import { CardGameProvider } from '@/stores/CardGameContext';
import axios from 'axios';
import { device } from '@/static/device';

interface Props {
  cards: Card[];
  globalBestScore: number;
}

interface Card {
  _id: string;
  value: number;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  gap: 0 2.5rem;

  @media ${device.mobileL} {
    grid-template-columns: 1fr;
  }
`;

const CardGameGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 220px);
  gap: 10px;

  @media ${device.mobileL} {
    grid-template-rows: repeat(3, 150px);
    gap: 20px 10px;
  }
`;

const Home: React.FC<Props> = ({ cards, globalBestScore }) => {
  return (
    <>
      <GridContainer>
        <CardGameProvider>
          <SideBar cards={cards} globalBestScore={globalBestScore} />
          <CardGameGrid>
            <CardGame cards={cards} />
          </CardGameGrid>
        </CardGameProvider>
      </GridContainer>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const cards = await axios
    .get(`${process.env.API_ENDPOINT}/cards`)
    .then((res) => res.data.data);

  const globalBestScore = await axios
    .get(`${process.env.API_ENDPOINT}/users/global-best`)
    .then((res) => res.data.data.best_score);

  return {
    props: {
      cards,
      globalBestScore,
    },
  };
};
