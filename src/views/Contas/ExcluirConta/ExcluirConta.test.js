import React from 'react';
import ReactDOM from 'react-dom';
import ExcluirConta from './ExcluirConta';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
ReactDOM.render(<ExcluirConta />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<ExcluirConta />);
});
