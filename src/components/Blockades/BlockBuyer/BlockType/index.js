import React, { useState } from 'react';
import { FormGroup, Row } from 'reactstrap';
import { AppSwitch } from '@coreui/react';

export default function BlockType(props) {
  const [bids, setBids] = useState(false);
  const [questions, setQuestions] = useState(false);

  const changeBids = e => {
    if (e.target.name === 'bids') bids ? setBids(true) : setBids(false);
    else if (e.target.name === 'question') questions ? setQuestions(true) : setQuestions(false);
  }
  const defineBlockType = () => {
    if (bids === true && questions === true) return 0;
    else if (bids === true && questions === false) return 1;
    else if (bids === false && questions === true) return 2;
    else if (bids === false && questions === false) return 3;
  }
  return(
    <Row>
      <FormGroup value={defineBlockType()}>
        <AppSwitch
          className={"mx-1"}
          variant={"pill"}
          color={"primary"}
          name="bids"
          checked={bids}
          onChange={(e)=> {
            changeBids(e);
            props.callback(e)
          }}
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
          checked={questions}
          onChange={(e)=>changeBids(e)}
        />
        <span className="textoSwitch">
          {" "}
          Bloquear para perguntas
        </span>
      </FormGroup>
    </Row>
  );
}
