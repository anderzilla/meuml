import React, { Component } from 'react';
import Iframe from 'react-iframe'

class Inicio extends Component {
  render() {
    return (
      <div className="animated fadeIn">
      
      <Iframe url="https://meuml.com/v2inicio"
        width="90%"
        height="92%"
        id="myId"
        allowFullScreen
        frameBorder="0"
        display="initial"
        scrolling="no"
        className="iframeHome"
        /> 
        
      
        </div>
    );
  }
}

export default Inicio;
