import React from 'react';
import ReactDOM from 'react-dom';
import ListaContas from './ListaContas';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListaContas />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<ListaContas />);
});
