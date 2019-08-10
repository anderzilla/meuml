import React from 'react';
import { Data } from '../../../containers/Data';
import Widget from '../../widgets/Widget02';
import { Col, Row } from 'reactstrap';
import Rating from '../Rating';

const SellerMetrics = () => {
  return(
    <Data.Consumer>
      {(provider) => {
        return (
          <>
            <Title 
              period={provider.state.selectedAccount.external_data.seller_reputation.metrics.sales.period}
            />
            <CardsContainer provider={provider.state}  />
          </>
        );
      }}
    </Data.Consumer>
  );
}

const CardsContainer = props => {
  const provider = props.provider;
  return(
    <Row>
      <Row className="col-md-8">
        <Card
          col="4"
          header="Atrasos"
          body={provider.selectedAccount.external_data.seller_reputation.metrics.delayed_handling_time.rate+"%"}
          icon="fa fa-hourglass-2"
          color="secondary"
          variant={0}/>
        <Card
          col="4" 
          header="Reclamações"
          body={provider.selectedAccount.external_data.seller_reputation.metrics.claims.rate+"%"}
          icon="fa fa-thumbs-down"
          color="warning"
          variant={0}/>
      </Row>
      <Row className="col-md-8">
        <Card
          col="4" 
          header="Mediações"
          body={provider.selectedAccount.external_data.seller_reputation.metrics.sales.completed}
          icon="fa fa-support"
          color="info"
          variant={0}/>
        <Card
          col="4" 
          header="Cancelamentos"
          body={provider.selectedAccount.external_data.seller_reputation.metrics.cancellations.rate+"%"}
          icon="fa fa-times-circle-o"
          color="danger"
          variant={0}/>
      </Row>
      <Rating />
    </Row>
  );
}

const Card = props => {
  return (
    <Col md="6">
      <Widget 
        header={props.header}
        mainText={props.body}
        icon={props.icon}
        color={props.color}
        variant={props.variant}/>
    </Col>
  );
}
const Title = props => {
  let period = 'últimos 4';
  if (props.period === '60 months') period = 'últimos 60';
  return <h5>Considerando os {period} meses.</h5>
}

export default SellerMetrics;
