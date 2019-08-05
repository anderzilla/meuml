import React from './node_modules/react';
import { Col, Row } from './node_modules/reactstrap';
import Callout from '../../Callout';

const Sales = props => {
  return (
    <>
      <Col xs="12" md="6" xl="6">
        <h6>Vendas</h6>
        <Row>
          <Callout title="Canceladas" color="danger" info={props.canceled} />
          <Callout title="Bem Sucedidas" color="success" info={props.realyzed} />
          <Callout title="Vendas com mediações" color="warning" info={props.salesWithMediation} />
          <Callout title="Total" color="info" info={props.total} />
        </Row>
      </Col>
    </>
  );
}

export default Sales
