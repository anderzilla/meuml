import React from 'react';
import ReactDOM from 'react-dom';
import AdicionarItemLista from './AdicionarItemLista';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdicionarItemLista />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<AdicionarItemLista />);
});
