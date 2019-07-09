import React from 'react';
import { Input } from 'reactstrap';

const Inputflix = (props) => {
  return (
    <div>
      <Input 
        className={`col-md-${props.width} ${props.className}` || ''}
        bsSize={props.size || 'lg'}
        valid={props.valid}
        invalid={props.invalid}
        title={props.tooltip}
        autoFocus={props.autoFocus}
        placeholder={props.placeholder}/>
    </div>
  );
}

export default Inputflix;