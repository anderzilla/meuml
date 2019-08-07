import React from 'react';

const SellerStatus = props => {
  return validate(props);
}

const validate = props => {
  if(props.status === 'silver') {
    return <h5>Prata</h5>
  
  } else if(props.status === 'gold') {
    return <h5>Ouro</h5>
  
  } else if(props.status === 'platinum') {
    return <h5>Platina</h5>
  
  } else return <div />
}

export default SellerStatus;