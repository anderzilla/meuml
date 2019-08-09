import React from 'react';
import { Progress, Col } from 'reactstrap';
import { Data } from '../../../containers/Data';
import fotoPadrao from '../../../assets/img/avatars/user.svg';
import './index.css';
const LevelId = () => {
  return (
    <Data.Consumer>
      {(provider) => {
        let id = provider.state.selectedAccount.external_data.seller_reputation.level_id;
        let status = provider.state.selectedAccount.external_data.seller_reputation.power_seller_status;
        return provider.state.isLoading === false ? (
          createComponent(id, status)
        ):(<div name="level-id"/>)
      }}
    </Data.Consumer>
  )
}

const createComponent = (id, status) => {
  if(id === null) {
    return (
      <Col lg="3">
        <i className="cui cui-star font-lg" title="Sua conta não possui vendas suficientes para ser avaliada."></i>
        <Progress
          className="progress-xs"
          color={"#ffff"}
          value={10}
          title="0"/>
        <img
          src={fotoPadrao}
          title="Avatar"
          className="img-full70 align-content-center"
          alt="Avatar"
          id="avatar"/>
      </Col>
    );
  } else {
    const statusTranslation = validate(status);
    const color = id.substring(2);
    const miniValue = id.substring(0, 1);
    const value = scaleConvert(miniValue);
    return (
      <Col lg="3">
        {star(statusTranslation)}
        <Progress
          className="progress-xs"
          color={color}
          value={value}
          title={value}/>
        <img
          src={fotoPadrao}
          title="Avatar"
          className="img-full70 align-content-center"
          alt="Avatar"
          id="avatar"/>
      </Col>
    );
  }
}

const star = status => {
  if (status === false) return <i className="cui cui-tus font-lg"></i>
  else if (status === 'silver') return <i id="star-silver" className="cui cui-star font-lg" title="Prata"></i>
  else if (status === 'gold') return <i id="star-gold" className="cui cui-star font-lg" title="Ouro"></i>
  else if (status === 'platinum') return <i id="star-platinum" className="cui cui-star font-lg" title="Platina"></i>
  else return <div />
}

const scaleConvert = props => {
  if (props === 1 || props === '1') return 20
  else if (props === 2 || props === '2') return 40
  else if (props === 3 || props === '3') return 60
  else if (props === 4 || props === '4') return 80
  else if (props === 5 || props === '5') return 100
  else return 0;
}

const validate = props => {
  if (props === null) return 'platinum'
  else if(props.status === 'silver') return 'Prata'
  else if(props.status === 'gold') return 'Ouro'
  else if(props.status === 'platinum') return 'Platina'
  else return false;
}

export default LevelId;