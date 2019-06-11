import React, { Component } from 'react';
import {Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';


class AdicionarItemLista extends Component {

  constructor(props) {
    super(props);

    this.nbloqueios = "2048";
    this.nlistas = "48";
    this.lista = "Lista Teste";
    // ...

  }

  render() {
    return (
      <div className="animated fadeIn">
      <h1 className="text-info">Lista: {this.lista}</h1>
      <Row>
        <Col xs="12" sm="6" md="6">
        <Card>
        <CardHeader><h2>Importar Lista</h2></CardHeader>
        <CardBody>
          
        </CardBody>  
        <CardFooter></CardFooter>
        </Card>

        <Card>
        <CardHeader><h2>Adicionar Manualmente</h2></CardHeader>
        <CardBody>
          
        </CardBody>  
        <CardFooter></CardFooter>
        </Card>
        </Col>
        <Col xs="12" sm="6" md="6">
        <Card>
        <CardHeader><h2>Lista</h2></CardHeader>
        <CardBody>
          
        </CardBody>  
        <CardFooter></CardFooter>
        </Card>
        </Col>
      </Row>
      
      </div>
    );
  }
}

export default AdicionarItemLista;