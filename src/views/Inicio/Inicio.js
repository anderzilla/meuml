import React, { Component } from 'react';
import {Col, Row } from 'reactstrap';
import Iframe from 'react-iframe';
import logo from '../../assets/img/Logo-transparente.png';

class Inicio extends Component {
  render() {
    return (
      <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="6" className="padding-20">
          <p className="text-center space-top50">
          <img src={logo} width="80%"></img>
          </p>
        
        </Col>
        <Col xs="12" md="6" className="padding-20">
        <h1 className="text-center">Seja bem-vindo!</h1>
        <p className="space-top20">
        <p>Este é o MeuML.com Versão 2!</p>
        Nesta nova versão teremos muito mais flexibilidade e agilidade 
        para desenvolver novas ferramentas para você, vendedor. 
        Para começar, aproveite para usar nossas ferramentas gratuitas, 
        que em breve publicaremos novas funcionalidades!
        </p>
        </Col>
      </Row>
      <Row className="space-top20">
        <Col className="padding-20">
          <p className="textoJustificado">
            <h2 className="text-center">Multicontas</h2>
            A versão 2 do MeuML.com continua Multicontas, assim como já era na versão 1. Fique a vontade para adicionar quantas contas quiser!
          </p>
        </Col>
        <Col className="padding-20">
          <p className="textoJustificado">
            <h2 className="text-center">Pesos e Dimensões</h2>
            Acompanhe os pesos e dimensões de todas as categorias do MercadoLivre, de forma gratuita!
          </p>
        </Col>
        <Col className="padding-20">
          <p className="textoJustificado">
            <h2 className="text-center">Bloqueios</h2>
            Bloqueie compradores indesejados de forma simples e rápida, em várias contas ao mesmo tempo, de forma gratuita!
          </p>
        </Col>
      </Row>
     {/*<Iframe url="https://meuml.com/v2inicio"
        width="90%"
        height="92%"
        id="myId"
        allowFullScreen
        frameBorder="0"
        display="initial"
        scrolling="no"
        className="iframeHome"
        /> 
    */}  
      
        </div>
    );
  }
}

export default Inicio;
