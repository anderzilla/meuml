import React from "react";

export class Input extends React.Component {
  render() {
    return (
      <input
        type={this.props.type}
        class="form-control"
        placeholder={this.props.placeholder}
        aria-label={this.props.placeholder}
        aria-describedby="basic-addon1"
      />
    );
  }
}

export class InputCouple extends React.Component {
  render() {
    return (
      <React.Fragment>
        <input
          type={this.props.mrType}
          class="form-control"
          placeholder={this.props.mrPlaceholder}
          aria-label={this.props.mrPlaceholder}
          aria-describedby="basic-addon1"
        />
        <input
          type={this.props.mrsType}
          class="form-control"
          placeholder={this.props.mrsPlaceholder}
          aria-label={this.props.mrsPlaceholder}
          aria-describedby="basic-addon1"
        />
      </React.Fragment>
    );
  }
}

export class InputOptions extends React.Component {
  render() {
    return (
      <select class="custom-select" id="inputGroupSelect01">
        {this.props.options.map(option => {
          return (
            <React.Fragment>
              <option selected>Escolha uma opção ...</option>
              <option value={option} key={option+'key'}>{option}</option>
            </React.Fragment>
          );
        })}
      </select>
    );
  }
}

export class InputFile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <input type="file" className="custom-file-input" id="inputFile"/>
        <label className="custom-file-label" for="inputFile">{this.props.label || 'Escolher um arquivo'}</label>
      </React.Fragment>
    );
  }
}
