import React from "react";

export default class Selectflix extends React.Component {

  kurasumei(size) {

    if(size === 'sm') {
      return 'form-control-sm';
    
    } else if(size === 'lg') {
      return 'form-control-lg';
    
      } else {
        return '';
      }
  }

  render() {
    return (
      <div>
        { this.props.options !== undefined ? (
        <select className={`form-control ${this.kurasumei(this.props.size)}`}
                name={this.props.name}
                id={this.props.id}
        >{this.props.options.map(text => {
            return (
              <option
                key={text}
                value={text}
                >{text}
              </option>
            );
          })}
        </select>
        ):(<select className="form-control form-control-sm">
          <option>Não há opções</option>
        </select>)}
      </div>
    );
  }
}
