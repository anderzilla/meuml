import React from 'react';
import ReactDOM from 'react-dom';
import Processos from './Processos';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Processos />, div);
  ReactDOM.unmountComponentAtNode(div);
});
