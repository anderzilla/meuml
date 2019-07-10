import React, { Component } from 'react';
import Breadcrumbs from './../Breadcrumbs/index';

import { Label, FormGroup, FormText, Input } from 'reactstrap';

export default class Form extends Component {
  constructor(props) {
    super(props);
    
    this.state = {}
  }                    

  onSubmit(form) {
    form.preventDefault();
    if(this.props.onSubmit) this.props.onSubmit(this.state);
  }

  onChange(element, key) {
    this.setState({
      [key]: this[key].value
    });
  }

  renderForm() {
    let layout = this.props.layout;

    let layoutBuild = layout.map((element)=> {
      let key = element.key;
      let type = element.type || 'text';
      let props = element.props || {};

      return(
        <div key={key} className="form-group">
          <label className="form-label"
            key={element.key+"label"}
            htmlFor={element.key}>
            {element.label}
          </label>
          <input {...props} 
            ref={(key)=> this[element.key] = key}
            className="form-input"
            type={type}
            key={element.key+"input"}
            onChange={(e)=> this.onChange(e, key)}
          />

        </div>
      );
    });
    return layoutBuild;
  }

  render() {
    let title = this.props.title || "Form Title";
    return(
      <div>
        <Breadcrumbs
          crumbs={this.props.crumbs}/>
      <div className="card-header">
        <h3>{title}</h3>
        <form className="card-body" onSubmit={(form)=> this.onSubmit(form)}>
          {this.renderForm()}
          <div className="card-footer">
            {
              (!this.props.url)?(
                <button className="btn btn-primary" type="submit">
                  Enviar
                </button>   
              ):(
              <div></div>
              )
            }
          </div>
        </form>
      </div>

      </div>
    );
  }
}