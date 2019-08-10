import React from 'react';
import Widget04 from '../../widgets/Widget04';
import { Data } from '../../../containers/Data';
import { Col, Row } from 'reactstrap';
import './index.css';

const getValue = props => {
  const { negative, neutral, positive } = props;
  if (negative > positive) {
    const newData = String(negative).substring(2);
    return newData;
  }
  else if (negative < positive) {
    const newData = String(positive).substring(2);
    return newData;
  }
  else if (neutral > positive && neutral > negative) {
    const newData = String(neutral).substring(2);
    return newData;
  }
}

const cardConfig = props => {
  const { negative, neutral, positive } = props;
  let color = '';
  if (negative > positive) color = "danger"
  else if (positive > negative) color = "success"
  else if (neutral > positive && neutral > negative) color = "warning";
  return { 
    content: `Positivas: ${positive}% | Neutras: ${neutral}% | Negativas: ${negative}%`,
    value: getValue({negative, neutral, positive}),
    color: color
  }
}

const Rating = () => {
  return(
    <Data.Consumer>
      {(provider) => {
        let negative = provider.state.selectedAccount.external_data.seller_reputation.transactions.ratings.negative;
        let neutral = provider.state.selectedAccount.external_data.seller_reputation.transactions.ratings.neutral;
        let positive = provider.state.selectedAccount.external_data.seller_reputation.transactions.ratings.positive;
        let config = cardConfig({negative, neutral, positive})
        return(
        provider.state.isLoading ? <p>Carregando ...</p> : provider.state.accountsFound > 0 ? (
          <Col id="rating-container">
            <Widget04 
              icon="cui-thumb-up cui-sm" 
              color={config.color}
              header="Avaliações"
              value={config.value}
              >{config.content}
            </Widget04>
          </Col>
        ):(<div/>)
      )}}
    </Data.Consumer>
  );
}

export default Rating;