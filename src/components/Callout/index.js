import React from 'react';
import { Col } from 'reactstrap';

const Callout = props => {
  return(
    <Col sm="6">
      <div className={`callout callout-${props.color}`}>
        <small className="text-muted">{props.title}</small>
        <br />
        <strong className="h4">{props.info}</strong>
      </div>
    </Col>
  );
}

export default Callout;