import React, { Component } from  'react';

export class ActionLabel extends Component {
  render() {
    return(
      <>
        <div key={this.props.key} className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1 mr-3">{this.props.title}</h5>
            <small className="mr-3">{this.props.smallTitle}</small>
            {this.props.children}
          </div>
          <p className="mb-1">{this.props.label}</p>
          <small>{this.props.smallLabel}</small>
        </div>
      </>
    );
  }
}

export class ActionGroup extends Component {
  render() {
    return(
      <>
        <div className={`list-group ${this.props.className}`}>
          {this.props.children}
        </div>
      </>
    );
  }
}
