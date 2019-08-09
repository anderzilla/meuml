import React from 'react';
import { Data } from '../../../containers/Data';

const SellerStatus = () => {
  return (
    <Data.Consumer>
      {(provider) => {
        return provider.state.isLoading === false ? (
        createComponent(provider.state.selectedAccount.external_data.seller_reputation.power_seller_status)
        ):(<div name="seller-status"/>)}}
    </Data.Consumer>
  );
}

const createComponent = props => {
  const validation = validate(props);
  if (validation === false) return <div name="seller-status"/>
  else if (validation !== false) return <h5>{validation}</h5>
}

const validate = props => {
  if (props === null) return false
  else if(props.status === 'silver') return 'Prata'
  else if(props.status === 'gold') return 'Ouro'
  else if(props.status === 'platinum') return 'Platina'
  else return false;
}

export default SellerStatus;