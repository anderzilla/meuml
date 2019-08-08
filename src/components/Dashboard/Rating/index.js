import React, { Component } from 'react';
import Widget04 from '../../widgets/Widget04';
import { Data } from '../DataContainer';
import { Col, Row } from 'reactstrap';

export default class Rating extends Component {
  getValue = data => {
    if (data !== 0) {

      const newData = String(data).substring(2);
      return newData;
    }
  }
  render() {
    return(
      <Data.Consumer>
        {(provider) => {
          let positives = provider.state.selectedAccount.seller_reputation.transactions.ratings.positive;
          let negatives = provider.state.selectedAccount.seller_reputation.transactions.ratings.negative;
          let neutrals = provider.state.selectedAccount.seller_reputation.transactions.ratings.neutral;
          let convertedPositives = this.getValue(positives);
          let convertedNegatives = this.getValue(negatives);
          let convertedNeutrals = this.getValue(neutrals);
          return(<>
          <h5>Avaliações</h5>
            <Row>
              <Col sm="6" md="4">
                <Widget04 
                  icon="cui-thumb-up" 
                  color="success"
                  header={positives}
                  value={convertedPositives}
                  >Positivas
                </Widget04>
              </Col>
              <Col sm="6" md="4">
                <Widget04 
                  icon="icon-drop" 
                  color="primary"
                  header={negatives}
                  value={convertedNegatives}
                  >Neutras
                </Widget04>
              </Col>
              <Col sm="6" md="4">
                <Widget04 
                  icon="cui-thumb-down" 
                  color="danger"
                  header={neutrals}
                  value={convertedNeutrals}
                  >Negativas
                </Widget04>
              </Col>
            </Row>
          </>);
        }}
      </Data.Consumer>
    );
  }
}
