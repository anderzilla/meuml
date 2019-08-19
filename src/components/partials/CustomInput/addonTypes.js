import React from "react";

export class Span extends React.Component {
  render() {
    return (
      <React.Component>
        {
          (!this.props.mrsSpan)
          ?(
            <span className="input-group-text" id={this.props.mrId}>
              {this.props.mrSpan}
            </span>
          )
          :(
            <React.Fragment>
              <span className="input-group-text" id={this.props.mrId}>
                {this.props.mrSpan}
              </span>
              <span className="input-group-text" id={this.props.mrsId}>
                {this.props.mrsSpan}
              </span>
            </React.Fragment>
          )
        }
      </React.Component>
    );
  }
}

export class CheckRadio extends React.Component {
  render() {
    return (
      <input
        id={this.props.id}
        name={this.props.name}
        type={this.props.type}
        value={this.props.value}
        aria-label={this.props.name}
      />
    );
  }
}

export class ButtonAddon extends React.Component {
  render() {
    return (
      <React.Fragment>
        {
          (!this.props.mrsButton)
          ?(
            <button
              className={`btn btn-outline-${this.props.className}`}
              type="button"
              >{this.props.mrButton}
            </button>
          )
          :(
            <React.Fragment>
              <button
                className={`btn btn-outline-${this.props.className}`}
                type="button"
                >{this.props.mrButton}
              </button>
              <button
                className={`btn btn-outline-${this.props.className}`}
                type="button"
                >{this.props.mrsButton}
              </button>
            </React.Fragment>
            )
          }
      </React.Fragment>
    );
  }
}
