import React, { Component } from 'react';
import ApiInvoker from './../buttons/ApiInvoker';

import Breadcrumbs from './../Breadcrumbs/index';
import {
  Label, FormGroup, Input, CardTitle,
  CardBody, CardFooter, CardHeader } from 'reactstrap';

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
        <FormGroup key={key}>
          <Label className="form-label"
            key={element.key+"label"}
            htmlFor={element.key}>
            {element.label}
          </Label>
          <Input {...props} 
            ref={(key)=> this[element.key] = key}
            className="form-input col-md-5"
            type={type}
            key={element.key+"input"}
            onChange={(e)=> this.onChange(e, key)}
          />

        </FormGroup>
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
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        
        <form onSubmit={(form)=> this.onSubmit(form)}>
          <CardBody>{this.renderForm()}</CardBody>
          <CardFooter>
            {
              (!this.props.url)?(
                <button className="btn btn-primary" type="submit">
                  {this.props.btnName}
                </button>   
              ):(
              <ApiInvoker 
                url={this.props.url}
                data={this.props.data}
                http={this.props.http}
                onSuccess={this.props.onSuccess}
                className={this.props.btnClass}
                >{this.props.btnName}
              </ApiInvoker>
              )
            }
          </CardFooter>
        </form>
        </CardHeader>
      </div>
    );
  }
}