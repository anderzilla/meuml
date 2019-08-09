import React from 'react';
import { Data } from '../../../containers/Data';
import { Col, Row, Card, CardHeader, CardBody } from 'reactstrap';

const SellerMetrics = () => {
  return(
    <Data.Consumer>
      {(provider) => {
        return (
          <>
            <Title 
              period={provider.state.selectedAccount.external_data.seller_reputation.metrics.sales.period}
            />
            <Row>
              <CardSample
                header="Atrasos"
                body={provider.state.selectedAccount.external_data.seller_reputation.metrics.delayed_handling_time.rate}
              />
              <CardSample
                header={'Header'}
                body={'Body'}
              />
              <CardSample
                header={'Header'}
                body={'Body'}
              />
              <CardSample
                header={'Header'}
                body={'Body'}
              />
            </Row>
          </>
        );
      }}
    </Data.Consumer>
  );
}

const CardSample = props => {
  return (
    <Col>
      <Card>
        <CardHeader>
          <h5>{props.header}</h5>
        </CardHeader>
        <CardBody>
          <p>Atrasos {props.body}%</p>
        </CardBody>
      </Card>
    </Col>
  )
}

const Title = props => {
  let period = 'últimos 4';
  if (props.period === '60 months') period = 'últimos 60';
  return <h5>Considerando os {period} meses.</h5>
}

export default SellerMetrics;