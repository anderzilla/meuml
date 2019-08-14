import React, { useState } from 'react';
import { FormGroup, Input } from 'reactstrap';

export default function BlockDescription(props) {
  const [description, setDescription] = useState('');
  const handleChange = e => {
    setDescription(e.target.value);
    props.callback(description);
  }
  return(
    <FormGroup style={{marginBottom: "30px"}}>
      <h6><b>Descreva o motivo (opcional)</b></h6>
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
    </FormGroup>
  );
}