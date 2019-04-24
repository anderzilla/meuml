import React from 'react';
import ReactDOM from 'react-dom';
import SincronizarConta from './SincronizarConta';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SincronizarConta />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<SincronizarConta />);
});
