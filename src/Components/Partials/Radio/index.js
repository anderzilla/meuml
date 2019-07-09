import React from 'react';

export default class Radioflix extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: 0
    }

    this.checkMe = this.checkMe.bind(this);
  }

  checkState(value) {
    this.setState({
      checked: value
    })
  }

  checkMe(clickedRadio){
    if(this.state.checked === clickedRadio) {
      return true
    } else {
      return false
    }
  }

  kurasumei(perspective) {

    if(perspective === '') {
      return '';
    
    } else if(perspective === 'inline') {
      return 'form-check-inline';
    
      } else {
        return '';
      }
  }

  render() {
    return (
      <div>
        {this.props.config.map(config => {
          return (
            <div className={`form-check ${this.kurasumei(config.orientation)}`}>
              <input className="form-check-input"
                     type="radio"
                     name={config.name}
                     id={config.id}
                     value={config.value}
                     checked={this.checkMe(config.value)}
                     onClick={()=>this.checkState(config.value)}
              />
              <label className="form-check-label"
                     for={config.id}
                     >{config.label}
              </label>
            </div>
          );
        })}
      </div>
    );
  };
}
