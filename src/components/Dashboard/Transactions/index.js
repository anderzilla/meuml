import React from 'react';
import { Col, Row } from 'reactstrap';
import { Data } from '../../../containers/Data';
import Widget02 from '../../widgets/Widget02';

const Transactions = props => {
  return (
    <Data.Consumer>
      {(provider) => {
        return(
          provider.state.isLoading ? (<div/>) : provider.state.accountsFound > 0 ? (<>
          <h5>Vendas</h5>
          <Row>
            <Col xs="12" sm="6" lg="3">
              <Widget02 
                header={provider.state.selectedAccount.external_data.seller_reputation.transactions.completed || '-'} 
                mainText="Realizadas" icon="fa fa-check" color="success"
              />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Widget02 
                header={provider.state.selectedAccount.external_data.seller_reputation.transactions.canceled || '-'} 
                mainText="Canceladas" icon="fa fa-ban" color="danger"
              />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Widget02 
                header={provider.state.selectedAccount.external_data.seller_reputation.metrics.sales.completed || '-'} 
                mainText="Mediações" icon="fa fa-undo" color="warning"
              />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Widget02 
                header={provider.state.selectedAccount.external_data.seller_reputation.transactions.total || '-'} 
                mainText="Total" icon="fa fa-calculator" color="primary"
              />
            </Col>
         </Row>
        
        </>):(<div/>))
      }}
    </Data.Consumer>
  );
}

export default Transactions;
