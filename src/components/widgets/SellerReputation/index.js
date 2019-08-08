import React from 'react';
import { Progress, Col } from 'reactstrap';

const LevelId = props => {
  if(props === undefined) return <div />
  else return <Col lg="3">{createComponent(props)}</Col>
}

const createComponent = props => {
  const color = props.levelId.substring(2);
  const miniValue = props.levelId.substring(0, 1);
  const value = scaleConvert(miniValue);
  return <Progress className="progress-xs mt-1" color={color} value={value} />;
}

const scaleConvert = props => {
  if (props == 1) return 20
  else if (props == 2) return 40
  else if (props == 3) return 60
  else if (props == 4) return 80
  else if (props == 5) return 100
  else return 0;
}

export default LevelId;