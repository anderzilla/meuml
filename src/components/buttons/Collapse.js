import React, { Component } from 'react';

export default class Collapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    if(this.state.collapsed === false) this.setState({ collapsed: true })
    else if(this.state.collapsed === true) this.setState({ collapsed: false })
    else this.setState({ collapsed: false });
  }
  
  render() {
    return(
      <div>
        <p>
          <button className={this.props.className}
            onClick={()=>this.toggle()}
            type="button"
            >{this.props.name}
          </button>
        </p>
        
        {this.state.collapsed ? <div /> : (
        <div className="animated fadeIn">
          <div className="row">
            <div className="col">
              <div className="card card-body">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    );
  }
}