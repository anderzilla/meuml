import React, { Component } from 'react';

class Select extends Component {

  kurasumei(size, kurasu) {

    if(size === 'sm') {
      return `${kurasu} form-control-sm`;

    } else if(size === 'lg') {
      return `${kurasu} form-control-lg`;

      } else {
        return kurasu;
      }
  }

  render() {
    return (
      <div>
        { this.props.options !== undefined ? (
        <select className={`${this.kurasumei(this.props.size, this.props.className)}`}
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

export default Select;