import React from "react";

export default function CustomInput(props) {
  return (
    <div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          {props.addon}
        </div>
          {props.children}
      </div>
    </div>
  );
}
