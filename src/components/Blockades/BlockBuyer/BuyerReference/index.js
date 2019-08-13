import React, { useState } from 'react';
import { FormGroup, Input } from 'reactstrap';
import CustomInput from '../../../partials/CustomInput/index';

function ChooseReferenceType() {
  return (
    <button className="btn btn-dark disabled">
      <icon className="fa fa-user"/>
    </button>);
}

export default function BuyerReference(props) {
  const [reference, setReference] = useState('');
  const handleChange = e => {
    setReference(e.target.value);
    props.callback(reference);
  }
  return(
    <FormGroup>
      <CustomInput addon={<ChooseReferenceType />}>
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
