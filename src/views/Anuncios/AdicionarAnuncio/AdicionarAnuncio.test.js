import React from 'react';
import ReactDOM from 'react-dom';
import AdicionarAnuncio from './AdicionarAnuncio';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
ReactDOM.render(<AdicionarAnuncio />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<AdicionarAnuncio />);
});