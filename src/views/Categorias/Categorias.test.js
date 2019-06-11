import React from 'react';
import ReactDOM from 'react-dom';
import Categorias from './Bloqueios';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
ReactDOM.render(<Categorias />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<Categorias />);
});
