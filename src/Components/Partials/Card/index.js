import React, { Component } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from './node_modules/reactstrap';

class Cards extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col
            xs={"12" || this.props.colXs}
            sm={"12" || this.props.colSm}
            md={"10" || this.props.colMd}
            xl={"8" || this.props.colXl}>
            <Card>
              <CardHeader>
                {this.props.header}
              </CardHeader>
              <CardBody>
                {this.props.body}
              </CardBody>
              <CardFooter>
                {this.props.footer}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Cards;
