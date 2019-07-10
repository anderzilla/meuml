import React, { Component } from 'react';
import Form from './Form';
import BtnGroup from './buttons/ButtonGroup';
import ApiInvoker from './buttons/ApiInvoker';

export default class Testes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedValue: 1
    }
  }

  onSubmit = (model) => {
    alert(JSON.stringify(model));
    this.setState({
      data: [model]
    })
  }

  render() {
    return (
      <div>
        <div className="mb-3">
          <BtnGroup className="vertical-button-group">
            <ApiInvoker url="" className="dropdown-item" http="" data="">Botão 1</ApiInvoker>
            <ApiInvoker url="" className="dropdown-item" http="" data="">Botão 2</ApiInvoker>
            <ApiInvoker url="" className="dropdown-item" http="" data="">Botão 3</ApiInvoker>
          </BtnGroup>
        </div>
        <div className="mb-3 mt-3">
          <BtnGroup className="horizontal-button-group">
            <ApiInvoker url="" className="btn btn-secondary" http="" data="">Botão 1</ApiInvoker>
            <ApiInvoker url="" className="btn btn-secondary" http="" data="">Botão 2</ApiInvoker>
            <ApiInvoker url="" className="btn btn-secondary" http="" data="">Botão 3</ApiInvoker>
          </BtnGroup>
        </div>


        <Form
          className="form"
          title="Cadastro"
          crumbs={[{title:'Início', link:'/inicio'} ,{title:'Testes'}]}
          layout={[
            {key: "name", label: "Nome", props: {required: true}},
            {key: "address", label: "Endereço", type:"text"},
            {key: "age", label: "Idade", type: "number"},
            {key: "email", label: "Email"},
          ]}
          url="parara"
          btnClass="btn btn-danger"
          btnName="Salvar"
          onSubmit={(layout)=> this.onSubmit(layout)}
          />

        <pre style={{width:"300px"}}>
        {JSON.stringify(this.state.data)}
        </pre>
      </div>
    );
  }
}

