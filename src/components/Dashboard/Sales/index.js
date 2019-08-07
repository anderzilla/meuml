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
              <Widget02 
                header={provider.state.selectedAccount.seller_reputation.transactions.canceled || '-'} 
                mainText="Canceladas" icon="fa fa-ban" color="primary"
              />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Widget02 
                header={provider.state.selectedAccount.seller_reputation.transactions.completed || '-'} 
                mainText="Realizadas" icon="fa fa-check" color="info"
              />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Widget02 
                header={provider.state.selectedAccount.seller_reputation.metrics.sales.completed || '-'} 
                mainText="Mediações" icon="fa fa-undo" color="warning"
              />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Widget02 
                header={provider.state.selectedAccount.seller_reputation.transactions.total || '-'} 
                mainText="Total" icon="fa fa-calculator" color="danger"
              />
            </Col>
         </Row>
        </>);
      }}
    </Data.Consumer>
  );
}

export default Sales
