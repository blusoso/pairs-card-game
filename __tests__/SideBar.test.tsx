import React from 'react';
import { mount } from 'enzyme';
import { UserProvider } from '../stores/userContext';
import { CardGameProvider } from '../stores/CardGameContext';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components'
import SideBar from '../components/score/SideBar';
import theme from '../styles/theme';

describe('<SideBar /> component', () => {
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
            <SideBar cards={cards} globalBestScore={40} />
          </CardGameProvider>
        </UserProvider>
      </ThemeProvider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should have a new game button', () => {
    // Render twice. Client side and server side
    expect(wrapper.find('.btn')).toHaveLength(2);
    expect(wrapper.find('.btn').first().text()).toEqual('New Game')
    expect(wrapper.find('.btn').first().prop('primary'))
});

  it('on click a new game button function', () => {
    wrapper.find('button').simulate('click');
  });
});
