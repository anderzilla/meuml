import React from 'react';
import ReactDOM from 'react-dom';
import RenomearConta from './RenomearConta';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RenomearConta />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<RenomearConta />);
});
