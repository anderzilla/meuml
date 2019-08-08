import React from 'react';
import { Progress, Col } from 'reactstrap';

const LevelId = props => {
  if(props === undefined || props === null) return <div />
  else return createComponent(props);
}

const createComponent = props => {
  console.log(props)
  const color = props.levelId.substring(2); // a prop não deve estar correta, tem que ler o console log e continuar daqui
  const miniValue = props.levelId.substring(0, 1);
  const value = scaleConvert(miniValue);
  return <Col lg="3">
           <Progress
            className="progress-xs mt-1"
            color={color}
            value={value}/>
         </Col>
}

const scaleConvert = props => {
  if (props === 1 || props === '1') return 20
  else if (props === 2 || props === '2') return 40
  else if (props === 3 || props === '3') return 60
  else if (props === 4 || props === '4') return 80
  else if (props === 5 || props === '5') return 100
  else return 0;
}

export default LevelId;