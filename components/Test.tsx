import styled from 'styled-components';
import SideBar from './score/SideBar';
import CardGame from './cardGame/CardGame';
import { device } from '../static/device';

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

const Test = ({cards, globalBestScore}) => {
    return (
        <>
        <SideBar cards={cards} globalBestScore={globalBestScore} />
          <CardGameGrid>
            <CardGame cards={cards} />
          </CardGameGrid></>
    )
}

export default Test;