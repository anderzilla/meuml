import React from 'react';

const Input = (props) => {
  return (
    <div>
      <input
        className={`form-control col-md-${props.width} ${props.className}` || ''}
        bsSize={props.size || 'lg'}
        valid={props.valid}
        invalid={props.invalid}
        title={props.tooltip}
        autoFocus={props.autoFocus}
        placeholder={props.placeholder}/>
    </div>
  );
}

export default Input;
