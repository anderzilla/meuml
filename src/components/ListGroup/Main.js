import React, { Component } from  'react';

export class GroupItem extends Component {
  render() {
    return(
      <>
        <button onClick={()=>this.handleClick()} className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{this.props.title}</h5>
            <small>{this.props.smallTitle}</small>
          </div>
          <p className="mb-1">{this.props.label}</p>
          <small>{this.props.smallLabel}</small>
        </button>
      </>
    );
  }
}

export class GroupHolder extends Component {
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