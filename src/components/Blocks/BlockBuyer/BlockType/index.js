import React, { useState } from 'react';
import { FormGroup, Row } from 'reactstrap';
import { AppSwitch } from '@coreui/react';

export default function BlockType(props) {
  const [bids, setBids] = useState(false);
  const [questions, setQuestions] = useState(false);

  const changeBids = e => {
    if (e.target.name === 'bids') setBids(true)
    else if (e.target.name === 'question') setQuestions(true);
    if (bids === true && questions === true) props.callback(2)
    else if (bids === true && questions === false) props.callback(1)
    else if (bids === false && questions === true) props.callback(0);
  }
  return(
    <Row>
      <FormGroup callback={(value) => props.callback(value)}>
        <AppSwitch
          className={"mx-1"}
          variant={"pill"}
          color={"danger"}
          name="bids"
          checked = {bids}
          onChange={(e)=>changeBids(e)}
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
          color={"danger"}
          name="bids"
          checked = {questions}
          onChange={(e)=>changeQuestion(e)}
        />
        <span className="textoSwitch">
          {" "}
          Bloquear para compras
        </span>
      </FormGroup>
    </Row>
  );
}
