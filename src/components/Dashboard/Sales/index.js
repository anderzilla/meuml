import React from 'react';
import { Col, Row } from 'reactstrap';
import Widget02 from '../../widgets/Widget02';
import { Data } from '../DataContainer';

const Sales = props => {
  return (
    <Data.Consumer>
      {(provider) => {
        return(<>
          <h5>Vendas</h5>
          <Row>
            <Col xs="12" sm="6" lg="3">
              <Widget02 header={provider.state.selectedAcc.canceled || '-'} mainText="Canceladas" icon="fa fa-cogs" color="primary" />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Widget02 header={provider.state.selectedAcc.realyzed || '-'} mainText="Realizadas" icon="fa fa-laptop" color="info" />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Widget02 header={provider.state.selectedAcc.salesWithMediation || '-'} mainText="Mediações" icon="fa fa-moon-o" color="warning" />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Widget02 header={provider.state.selectedAcc.total || '-'} mainText="Total" icon="fa fa-bell" color="danger" />
            </Col>
         </Row>
        </>);
      }}
    </Data.Consumer>
  );
}

export default Sales
