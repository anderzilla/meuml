import React from 'react';
import Widget04 from '../../widgets/Widget04';
import { Data } from '../../../containers/Data';
import { Col, Row } from 'reactstrap';

const getValue = data => {
  if (data !== 0) {
    const newData = String(data).substring(2);
    return newData;
  }
}

const Rating = () => {
  return(
    <Data.Consumer>
      {(provider) => {
        console.log(provider.state)
        return(
        provider.state.isLoading ? <p>Carregando ...</p> : provider.state.accountsFound > 0 ? (<>
        <h5>Avaliações</h5>
          <Row className="col-md-8" id="rating-container">
            <Col md="3">
              <Widget04 
                icon="cui-thumb-up" 
                color="success"
                header={provider.state.selectedAccount.external_data.seller_reputation.transactions.ratings.positive}
                value={getValue(provider.state.selectedAccount.external_data.seller_reputation.transactions.ratings.positive)}
                >Positivas
              </Widget04>
            </Col>
            <Col md="3">
              <Widget04 
                icon="icon-drop" 
                color="primary"
                header={provider.state.selectedAccount.external_data.seller_reputation.transactions.ratings.negative}
                value={getValue(provider.state.selectedAccount.external_data.seller_reputation.transactions.ratings.negative)}
                >Neutras
              </Widget04>
            </Col>
            <Col md="3">
              <Widget04 
                icon="cui-thumb-down" 
                color="danger"
                header={provider.state.selectedAccount.external_data.seller_reputation.transactions.ratings.neutral}
                value={getValue(provider.state.selectedAccount.external_data.seller_reputation.transactions.ratings.neutral)}
                >Negativas
              </Widget04>
            </Col>
          </Row>
        </>):(<div/>)
      )}}
    </Data.Consumer>
  );
}

export default Rating;