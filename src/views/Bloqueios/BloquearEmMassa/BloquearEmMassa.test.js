import React from 'react';
import ReactDOM from 'react-dom';
import BloquearEmMassa from './BloquearEmMassa';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
ReactDOM.render(<BloquearEmMassa />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<BloquearEmMassa />);
});
