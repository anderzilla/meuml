import React, { useState, useEffect } from 'react';
import { FormGroup, Input } from 'reactstrap';
import CustomInput from '../../../partials/CustomInput/index';

function Addon() {
  return (
    <button className="btn btn-dark disabled">
      <icon className="fa fa-user"/>
    </button>);
}

export default function BuyerReference(props) {
  const [reference, setReference] = useState('');
  const handleChange = e => {
    setReference(e.target.value);
  }
  useEffect(() => {
    return () => {
      props.callback(reference);
    };
  }, [reference]);
  return(
    <FormGroup style={{marginBottom: "50px"}}>
      <h6><b>ID ou Apelido</b></h6>
      <CustomInput addon={<Addon />}>
        <Input required
          type="text"
          placeholder="Informe o ID ou Apelido do comprador"
          autoComplete="off"
          autoFocus={true}
          value={reference}
          onChange={handleChange}
          callback={(value)=> props.callback(value)}
        />
      </CustomInput>
    </FormGroup>
  );
}
