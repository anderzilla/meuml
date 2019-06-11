import React, { Component } from 'react';
import { Row, Col, Card, Collapse, ButtonGroup, Fade, CardHeader, CardBody, CardFooter, Table, Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';
import { AppSwitch } from '@coreui/react'
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import Picky from "react-picky";
import "react-picky/dist/picky.css";

import ReactDOM from 'react-dom';

import ReactDataGrid from 'react-data-grid';


import {createStore, combineReducers} from 'redux';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';



class BloquearEmMassa extends Component {
  constructor(props) {
    super(props);

    this.toggleFade = this.toggleFade.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.selectMultipleOption = this.selectMultipleOption.bind(this);

    this.state = {
      dropdownOpenConta: false,
      blacklist: [],
      totalDataSize: 0,
      sizePerPage: 50,
      offset: 1,
      filter: '',
      accounts: [],
      isLoadingAccounts: true,
      nomeLista: '',
      descricaoLista: '',
      bids: '',
      questions: '',
      changes: '',
      dataTest: [],
      collapse: false,
      accordion: [true, false, false],
      custom: [true, false, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      value: null,
      arrayValue: [],
      grid: [],
      data : [
        ['', '',''],
        ['', '',''],
        ['', '','']
      ],
      settings: {
        columns: [
          { data: "id", type: "text", title: 'ID'},
          { data: "motivo", title: 'Código do Motivo', type: "text"},
          { data: "descricao", title: 'Descrição', type: "text"}
        ],
        contextMenu: {
          items: {
            'row_below': {
              name: 'Adicionar linha'
            },
            'separator': Handsontable.plugins.ContextMenu.SEPARATOR,
            'clear_custom': {
              name: 'Limpar tabela',
              callback: function() {
                this.clear();
              }
            },
          }
        }
      },
    }
    //fim dos STATES
      this.hotTableComponent = React.createRef();

  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  componentDidMount() {
    this.fetchAccounts();
    this.fetchMotivos();
  }
  fetchAccounts()
  {
    this.url = process.env.REACT_APP_API_URL + `/accounts`
    axios.get(this.url,
      { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
    //console.log(res);
    if (res.status === 200){
      const listaContas = [];
      const resContas = res.data.data;
      resContas.map((c, k) => {
        const { id, name } = this.state;
        listaContas.push({'value':c.id, 'label':c.name });
      })
      this.setState({
        accounts: listaContas,
        isLoadingAccounts: false
      });
      if(res.data.data.meta.total > 0){
        this.fetchBlacklist(res.data.data[0].id);
      }else{
      }
    }else{
      Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
    }
  }).catch(error => {
  });
  }

  selectMultipleOption(value) {
    console.count('onChange')
    console.log("Val", value);
    this.setState({ arrayValue: value });
  }

  fetchMotivos()
  {
    this.url = process.env.REACT_APP_API_URL + `/blacklist/motives`
    axios.get(this.url,
      { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
    //console.log(res);
    if (res.status === 200){
      this.setState({
        motivos: res.data.data,
        isLoadingMotivos: false
      });
      if(res.data.data.meta.total > 0){
        this.fetchMotivoSelecionado(res.data.data[0].id);
      }else{
      }
    }else{
      Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
    }
  }).catch(error => {
  });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  toggleCustom(tab) {

    const prevState = this.state.custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      custom: state,
    });
  }

  mostraTabela() {

//    console.log('nome da lista:'+this.state.nomeLista);
//    console.log('descricao da lista:'+this.state.descricaoLista);
//    console.log('contas para bloqueio:'+this.state.arrayValue);
//    console.log('bids:'+this.state.bids);
//    console.log('questions:'+this.state.questions);
//    console.log('escolha:'+this.state.custom);

  }

  render() {

    const { isLoadingAccounts, error, accounts, selectedOption, changes, source, options, grid  } = this.state;
    //const hot = new Handsontable(document.getElementById('grid'), );

    return (
      <div className="animated fadeIn">
        <Card>
        <CardHeader>
        <h5>Bloqueio em Massa</h5>
        </CardHeader>
        <CardBody>
        <FormGroup>
          <Label for="idConta">Lista de Bloqueio</Label>
          <Input type="textarea" name="lista">
        </FormGroup>
        <ButtonGroup>
        <Button className="btn btn-md" color="primary" onClick={() => this.toggleCustom(0)} aria-expanded={this.state.custom[0]} aria-controls="exampleAccordion1">
          Salvar Lista
        </Button>
        <Button className="btn btn-md" color="primary" onClick={() => this.toggleCustom(1)} aria-expanded={this.state.custom[1]} aria-controls="exampleAccordion2">
          Bloquear Lista
        </Button>
        <Button className="btn btn-md" color="primary" onClick={() => this.toggleCustom(2)} aria-expanded={this.state.custom[2]} aria-controls="exampleAccordion3">
          Salvar e Bloquear Lista
        </Button>
        </ButtonGroup>
        <div id="exampleAccordion" data-children=".item">
          <div className="item">
            <Collapse isOpen={this.state.custom[0]} data-parent="#exampleAccordion" id="exampleAccordion1">
              <h5 className="tituloAccordion">Salvar Lista</h5>
              <FormGroup>
              <Label for="idConta">Nome da Lista</Label>
              <Input type="text" name="nomeLista"
                onChange={this.handleInputChange}
                value={this.state.nomeLista}
                id="nomeLista"
                placeholder="Nome da Lista"
                autoComplete="given-name"
                autoFocus={true}
                color="outline-dark"
               />
              </FormGroup>
              <FormGroup>
              <Label for="idConta">Descrição</Label>
              <Input type="textarea" name="descricaoLista"
                rows="3"
                color="outline-dark"
                onChange={this.handleInputChange}
                value={this.state.descricaoLista}
              />
              </FormGroup>
              </Collapse>
          </div>
          <div className="item">
              <Collapse isOpen={this.state.custom[1]} data-parent="#exampleAccordion" id="exampleAccordion2">
              <h5 className="tituloAccordion">Bloquear Lista</h5>
                <FormGroup>
                <Label for="idConta">Selecione as Contas:</Label>
                {!isLoadingAccounts ? (

                <Picky
                  value={this.state.arrayValue}
                  options={accounts}
                  onChange={this.selectMultipleOption}
                  open={false}
                  valueKey="value"
                  labelKey="label"
                  multiple={true}
                  includeSelectAll={true}
                  includeFilter={true}
                  dropdownHeight={600}
                  placeholder="Selecione..."
                  manySelectedPlaceholder="%s Selecionados"
                  allSelectedPlaceholder="%s Selecionados"
                  selectAllText="Selecionar Todos"
                  filterPlaceholder="Filtrar por..."
                />

                ) : (
                  <h3>Carregando...</h3>
                )}
                </FormGroup>
                <FormGroup>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} name="bids" value="1" onChange={this.handleInputChange}  />
                <span className="textoSwitch"> Bloquear para compras</span>
                </FormGroup>
                <FormGroup>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} name="questions" value="1" onChange={this.handleInputChange}/>
                <span className="textoSwitch">Bloquear para perguntas</span>
                </FormGroup>
              </Collapse>
          </div>
          <div className="item">
              <Collapse isOpen={this.state.custom[2]} data-parent="#exampleAccordion" id="exampleAccordion3">
              <h5 className="tituloAccordion">Salvar e Bloquear Lista</h5>
              <FormGroup>
              <Label for="idConta">Nome da Lista</Label>
              <Input type="text" name="nomeLista"
                onChange={this.handleInputChange}
                value={this.state.nomeLista}
                id="nomeLista"
                placeholder="Nome da Lista"
                autoComplete="given-name"
                autoFocus={true}
                color="outline-dark"
               />
              </FormGroup>
              <FormGroup>
              <Label for="idConta">Descrição</Label>
              <Input type="textarea" name="descricaoLista"
                rows="3"
                color="outline-dark"
                onChange={this.handleInputChange}
                value={this.state.descricaoLista}
              />
              </FormGroup>

              <FormGroup>
              <Label for="idConta">Selecione as Contas:</Label>
              {!isLoadingAccounts ? (

              <Picky
                value={this.state.arrayValue}
                options={accounts}
                onChange={this.selectMultipleOption}
                open={false}
                valueKey="value"
                labelKey="label"
                multiple={true}
                includeSelectAll={true}
                includeFilter={true}
                dropdownHeight={600}
                placeholder="Selecione..."
                manySelectedPlaceholder="%s Selecionados"
                allSelectedPlaceholder="%s Selecionados"
                selectAllText="Selecionar Todos"
                filterPlaceholder="Filtrar por..."
              />

              ) : (
                <h3>Carregando...</h3>
              )}
              </FormGroup>
              <FormGroup>
              <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} name="bids" value="1" onChange={this.handleInputChange}  />
              <span className="textoSwitch"> Bloquear para compras</span>
              </FormGroup>
              <FormGroup>
              <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} name="questions" value="1" onChange={this.handleInputChange}/>
              <span className="textoSwitch">Bloquear para perguntas</span>
              </FormGroup>
              </Collapse>
          </div>
          </div>


        </CardBody>
        <CardFooter>
          <Button color="primary" onClick={() => this.mostraTabela()}>Salvar Lista (mostrar tabela)</Button>
        </CardFooter>

        </Card>
      </div>
    );
  }
}

export default BloquearEmMassa;
