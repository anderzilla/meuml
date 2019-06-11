import React from 'react';
import ReactDOM from 'react-dom';
import CallBack from './CallBack';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CallBack />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<CallBack />);
});
