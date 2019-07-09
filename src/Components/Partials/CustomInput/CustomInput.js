import React from "react";

export default class Custominput extends React.Component {

  render() {
    return (
      <div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            {this.props.addon}
          </div>
            {this.props.input}
        </div>
      </div>
    );
  }
}
