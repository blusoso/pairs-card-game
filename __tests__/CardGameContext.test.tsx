import React, { useContext } from 'react';
import { CardGameContext, CardGameProvider } from '../stores/CardGameContext';
import { mount, shallow } from 'enzyme';

describe('Card Game Context', () => {
  it('set counter by use context', () => {
    const TestComponent = () => {
      const { counterContext } = useContext(CardGameContext);
      const [counter, setCounter] = counterContext;

      const increaseCounter = () => {
        setCounter(counter + 1);
      };

      return (
        <>
          <h1>{counter.toString()}</h1>
          <button onClick={increaseCounter}>++</button>
        </>
      );
    };

    const wrapper = mount(
      <CardGameProvider>
        <TestComponent />
      </CardGameProvider>
    );

    expect(wrapper.find('h1').text()).toEqual('0');
    wrapper.find('button').simulate('click');
    expect(wrapper.find('h1').text()).toEqual('1');
    wrapper.find('button').simulate('click');
    expect(wrapper.find('h1').text()).toEqual('2');
  });
});
