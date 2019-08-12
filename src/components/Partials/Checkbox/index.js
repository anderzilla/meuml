import React from 'react';

const Check = (props) => {
  return (
    <div class="form-check">
      <input class="form-check-input"
             type="checkbox"
             value={props.value}
             id={props.children+'Id'}
             disabled={props.disabled}
      />
      <label class="form-check-label"
             for={props.children}
             >{props.children}
      </label>
    </div>
  );
}

export default Check;
