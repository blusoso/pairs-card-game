import React from 'react';
import { mount } from 'enzyme';
import { UserProvider } from '../stores/userContext';
import { CardGameProvider } from '../stores/CardGameContext';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

import CardGame from '../components/cardGame/CardGame';

describe('<CardGame /> component', () => {
  let wrapper;

  const cards = [
    { _id: '1', value: 1 },
    { _id: '2', value: 1 },
    { _id: '3', value: 2 },
    { _id: '4', value: 2 },
    { _id: '5', value: 3 },
    { _id: '6', value: 3 },
    { _id: '7', value: 4 },
    { _id: '8', value: 4 },
    { _id: '9', value: 5 },
    { _id: '10', value: 5 },
    { _id: '11', value: 6 },
    { _id: '12', value: 6 },
  ];

  beforeEach(() => {
    wrapper = mount(
      <ThemeProvider theme={theme}>
        <UserProvider>
          <CardGameProvider>
            <CardGame cards={cards} />
          </CardGameProvider>
        </UserProvider>
      </ThemeProvider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render 12 cards correctly', () => {
    expect(wrapper.find(CardGame)).toHaveLength(1);

    // Test props
    expect(wrapper.find(CardGame).first().prop('cards')).toBe(cards);
    expect(wrapper.find(CardGame).first().prop('cards')).toHaveLength(12);
  });
});
