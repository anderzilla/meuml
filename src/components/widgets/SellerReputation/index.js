import React from 'react';
import { Progress, Col } from 'reactstrap';
import { Data } from '../../../containers/Data';
import fotoPadrao from '../../../assets/img/avatars/user.svg';
const LevelId = () => {
  return (
    <Data.Consumer>
      {(provider) => {
        return provider.state.isLoading === false ? (
          createComponent(provider.state.selectedAccount.external_data.seller_reputation.level_id)
        ):(<div name="level-id"/>)
      }}
    </Data.Consumer>
  )
}

const createComponent = props => {
  if(props === null) {
    return (
      <>
        <Col lg="7">
          <i className="cui cui-star font-lg"></i>
          <Progress
            className="progress-xs"
            color={"#ffff"}
            value={0}/>
        </Col>
        <img
          src={fotoPadrao}
          title="Avatar"
          className="img-full70 align-content-center"
          alt="Avatar"
          id="avatar"
        />
      </>
    );
  } else {
    const color = props.substring(2);
    const miniValue = props.substring(0, 1);
    const value = scaleConvert(miniValue);
    return (
      <>
        <img
          src={fotoPadrao}
          title="Avatar"
          className="img-full70 align-content-center"
          alt="Avatar"
          id="avatar"
        />
        <Col lg="7">
          <i className="cui cui-star font-lg"></i>
          <Progress
            className="progress-xs"
            color={color}
            value={value}/>
        </Col>
      </>
    );
  }
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