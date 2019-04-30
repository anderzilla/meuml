import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import AlterarSenha from './AlterarSenha';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><AlterarSenha/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
