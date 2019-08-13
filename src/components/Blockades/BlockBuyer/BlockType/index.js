import React from 'react';
import { FormGroup, Row } from 'reactstrap';
import { AppSwitch } from '@coreui/react';

export default function BlockType(props) {
  return(
    <Row>
      <FormGroup>
        <AppSwitch
          className={"mx-1"}
          variant={"pill"}
          color={"primary"}
          name="bids"
          checked={props.checked}
          onChange={props.onChange}
        />
        <span className="textoSwitch">
          {" "}
          Bloquear para compras
        </span>
      </FormGroup>
      <FormGroup>
        <AppSwitch
          className={"mx-1"}
          variant={"pill"}
          color={"primary"}
          name="questions"
          checked={props.checked}
          onChange={props.onChange}
        />
        <span className="textoSwitch">
          {" "}
          Bloquear para perguntas
        </span>
      </FormGroup>
    </Row>
  );
}
