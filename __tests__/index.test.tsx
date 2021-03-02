import React from 'react';
import { shallow } from 'enzyme';

import Index from '../pages/index';

describe('render', () => {
  it('render completely', () => {
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
    const wrapper = shallow(<Index cards={cards} globalBestScore={30} />);
    expect(wrapper).not.toBeNull();
  });
});
