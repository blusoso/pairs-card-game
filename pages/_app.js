import React from 'react';
import GlobalStyle from '@/styles/globalStyles';
import styled, { ThemeProvider } from 'styled-components';
import NavGlobalV1 from '@/components/nav/NavGlobalV1';
import { device } from '@/static/device';
import { UserProvider } from "@/stores/userContext";

const theme = {
  colors: {
    blue: '#0057ff',
    lightBlue: 'rgba(0, 87, 255, 0.135)',
    gray: '#e8e8e8',
    lightGray: '#fafafb',
    darkGray: '#3d3d4e',
    yellow: '#ffd100',
    lightYellow: '#F5EAD2',
  },
};

const Container = styled.div`
  max-width: 1060px;
  height: 100%;
  margin: 0 auto;
  padding: 15px 0;
  display: flex;
  user-select: none;

  @media ${device.tablet} {
    margin: 0 1rem;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UserProvider>
          <NavGlobalV1 />
          <Container>
            <Component {...pageProps} />
          </Container>
        </UserProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
