import React from 'react';
import ReactDOM from 'react-dom';
import AdicionarConta from './AdicionarConta';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdicionarConta />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<AdicionarConta />);
});
