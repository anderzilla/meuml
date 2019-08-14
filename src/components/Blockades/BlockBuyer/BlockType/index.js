import React from 'react';
import { FormGroup } from 'reactstrap';
import { AppSwitch } from '@coreui/react';

export default function BlockType(props) {
  return(<>
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
  </>);
}
