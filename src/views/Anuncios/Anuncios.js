import React, { Component } from 'react';
import Filters from './components/Filters';

class Anuncios extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Filters />
      </div>
    );
  }
}

export default Anuncios;
