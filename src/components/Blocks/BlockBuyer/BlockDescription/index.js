import React, { useState } from 'react';
import { Col, Input } from 'reactstrap';

export default function BlockDescription(props) {
  const [description, setDescription] = useState('');
  const handleChange = e => {
    setDescription(e.target.value);
    props.callback(description);
  }
  return(
    <Col md={props.col}>
      <h5>Descreva o motivo (opcional)</h5>
      <Input
        type="textarea"
        name={props.name}
        id={props.id}
        rows={props.rows}
        color="outline-dark"
        onChange={(e)=>handleChange(e)}
        value={description}
        callback={(value) => props.callback(value)}
      />
    </Col>
  );
}