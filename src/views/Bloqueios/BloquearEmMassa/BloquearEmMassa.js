import React, { Component } from 'react';
import { Row, Col, Card, Collapse, ButtonGroup, Fade, CardHeader, CardBody, CardFooter, Table, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';
import { AppSwitch } from '@coreui/react'
import 'react-select/dist/react-select.min.css';
import Picky, {components}  from "react-picky";
import "react-picky/dist/picky.css";

import ReactLoading from 'react-loading';

import {parse} from 'react-json-parser';
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
      accountList: '',
      isLoadingAccounts: true,
      isLoadingLista: true,
      lista: '',
      nomeLista: '',
      descricaoLista: '',
      bids: '',
      questions: '',
      changes: '',
      bloqueios: [],
      dataTest: [],
      collapse: false,
      accordion: [false, false, false],
      custom: [false, false, false],
      salvar: 'disabled',
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      value: null,
      arrayValue: [],
      grid: [],
      isLoadingCadastro: false
    }
    //fim dos STATES
      

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
      if(res.data.meta.total > 0){
        if(res.data.meta.total === 1) {        
          this.setState({
            'arrayValue' : [{'value':res.data.data[0].id, 'label':res.data.data[0].name }],
            'accountId': res.data.data[0].id,
          });
        }
    }else{
      Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
    }
  }
  }).catch(error => {
  });
  }

  selectMultipleOption(value) {
    console.count('onChange')
    console.log("Val", value);
    this.setState({ arrayValue: value });

    const values = this.state;
    this.state.values = value;
    this.state.accountId = [];

    const valuesToRender = this.state.values.filter(val => val.value)
    const numRows = valuesToRender.length
    
    const {accountId, accountName} = this.state;
    for (var i = 0; i < numRows; i++) {
      this.state.accountId.push(value[i].value); 
    }
  }

  fetchMotivos()
  {
    this.url = process.env.REACT_APP_API_URL + `/blacklist/motives`
    axios.get(this.url,
      { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
    
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
      [name]: value,
      isLoadingCadastro: false,
    });
  }

  toggleCustom(tab) {
    //monta a lista em JSON
    this.montarTabela(this.state.lista);
    
    const prevState = this.state.custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      custom: state,
      salvar: '',
    });
  }

//Captura a lista de forma assincrona para transformar em JSON

  async listagem(lista, closure){
    if (this.state.custom[1] === true){
      var lista =  await lista.split("\n").map(function(id) {return ({customer_id:id, motive_id: "", motive_description: ""})}) ;
    }else{
      var lista =  await lista.split("\n").map(function(id) {return ({customer_id:id, motive_id: "", motive_description: ""})}) ;
    }
    
    closure(lista, this);
  }

  mount(){
    this.setState({
      listagemJSON:JSON.stringify(this.state.listagem),
      isLoadingLista: false
    });       
  }

  montarTabela(lista) {    
    this.listagem(lista, function(lista, obj){
        obj.setState({listagem: lista});
        obj.mount()
    });
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


  concluirOperacao() {
    if (this.state.lista === ''){
      Swal.fire({html:'<p>É necessário preencher a lista antes de Concluir!</p>', type: 'error', showCloseButton: false, showConfirmButton: true, textConfirmButton:"OK"});
    }else{
    this.setState({isLoadingCadastro: true});
    this.setState({bloqueios: []});
    if (this.state.listagem === ''){
      Swal.fire({html:'<p>Preencha o campo Lista antes de Salvar!</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    }else if(this.state.nomeLista === '' && this.state.custom[0] === true ){
      Swal.fire({html:'<p>Preencha o campo Lista antes de Salvar!</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    }else if(this.state.nomeLista === '' && this.state.custom[2] === true ){
      Swal.fire({html:'<p>Preencha o nome da Lista antes de Salvar.</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    }else if(this.state.arrayValue === '' && this.state.custom[1] === true ){
      Swal.fire({html:'<p>Escolha uma conta para qual a lista  será bloqueada.</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    }else if(this.state.arrayValue === '' && this.state.custom[2] === true ){
      Swal.fire({html:'<p>PEscolha uma conta para qual a lista  será bloqueada.</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    }else if(this.state.questions === '' && this.state.bids === '' && this.state.custom[1] === true ){
      Swal.fire({html:'<p>Escolha uma opção de bloqueio antes de salvar.</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    }else if(this.state.questions === '' && this.state.bids === '' && this.state.custom[2] === true ){
      Swal.fire({html:'<p>Escolha uma opção de bloqueio antes de salvar.</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    }else{
      if (this.state.custom[0] === true){
      //APENAS SALVAR A LISTA
        axios.post(process.env.REACT_APP_API_URL + `/blacklist/list`, 
        {"list_name":this.state.nomeLista,"list_description":this.state.descricaoLista},
        {headers: {"Authorization": 'Bearer ' + getToken(), "Content-Type": 'application/json'}},
        ).then(res => {
          axios.post(process.env.REACT_APP_API_URL + `/blacklist/list/customer`, 
          {"list_name":this.state.nomeLista,"customers":JSON.parse(this.state.listagemJSON)},
          {headers: {"Authorization": 'Bearer ' + getToken(), "Content-Type": 'application/json'}},
          ).then(res => {
            const status_customer = res.data.status;
            this.setState({status_customer});
            Swal.fire({html:'<p>'+res.data.message+'</p>', type: this.state.status_customer, showCloseButton: false, showConfirmButton: true, textConfirmButton:"OK"});
            this.setState({isLoadingCadastro: false});
            window.location.href = "#/minhaslistasdebloqueios";
          }).catch((error) => {     
            !error.response ?
            (this.setState({tipoErro: error})) :
            (this.setState({tipoErro: error.response.data.message}))
            Swal.fire({html:'<p>'+ this.state.tipoErro+'<br /></p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
          });
        }).catch((error) => {     
          !error.response ?
          (this.setState({tipoErro: error})) :
          (this.setState({tipoErro: error.response.data.message}))
          Swal.fire({html:'<p>'+ this.state.tipoErro+'<br /></p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
        });
        
      }else if(this.state.custom[1] === true){
      //APENAS BLOQUEAR A LISTA  
        //BLOQUEANDO OS IDS
        console.log(this.state.listagemJSON);
        if (this.isEmpty(this.state.arrayValue)){
          this.setState({isLoadingCadastro: false});
          Swal.fire({html:'<p>Selecione uma conta para realizar os bloqueios!</p>', type: 'error', showCloseButton: false, showConfirmButton: true, textConfirmButton:"OK"});
        }else{
          this.state.arrayValue.map((s, k) => {
            const { value, name } = this.state;
            this.state.listagem.map((cid, x) => {
              const { customer_id } = this.state;
                this.state.bloqueios.push({
                "account_id": s.value,
                "bids": !this.state.bids ? false : true,
                "customer_id": cid.customer_id,
                "motive_description": this.state.motivoBloqueio,
                "motive_id": '9',
                "questions": !this.state.questions ? false : true,
              });
            })
          })
          
          axios.post(process.env.REACT_APP_API_URL + `/blacklist`, this.state.bloqueios,
          {headers: {"Authorization": 'Bearer ' + getToken(), "Content-Type": 'application/json'}},)
          .then(res => {
            
            const status = res.data.status;
            this.setState({status});
            if (this.state.status === 'success'){
              const message = res.data.message;
              this.setState({message});
              Swal.fire({html:'<p>'+this.state.message+'</p>', type: this.state.status, showCloseButton: false, showConfirmButton: true, textConfirmButton:"OK"});
            // this.props.history.push("/meusbloqueios");
              window.location.href = "#/meusbloqueios";
            }else{
              const message = res.data.message;
              this.setState({message});
              Swal.fire({html:'<p>'+this.state.message+'</p>', type: 'error', showConfirmButton: true});
            }
          }).catch((error) => {
            this.setState({isLoadingCadastro: false});
            !error.response ?
            (this.setState({tipoErro: error})) :
            (this.setState({tipoErro: error.response.data.message}))
            Swal.fire({html:'<p>'+ this.state.tipoErro+'<br /></p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
          });
        }
        
      }else if(this.state.custom[2] === true){
      //SALVAR A LISTA E BLOQUEAR 
        //SALVANDO A LISTA 
        if (this.isEmpty(this.state.arrayValue)){
          this.setState({isLoadingCadastro: false});
          Swal.fire({html:'<p>Selecione uma conta para realizar os bloqueios!</p>', type: 'error', showCloseButton: false, showConfirmButton: true, textConfirmButton:"OK"});
        }else{
          axios.post(process.env.REACT_APP_API_URL + `/blacklist/list`, {
            "list_name":this.state.nomeLista,
            "list_description":this.state.descricaoLista
          },
          {headers: {"Authorization": 'Bearer ' + getToken(), "Content-Type": 'application/json'}}
          ).then(res => {

            this.state.arrayValue.map((s, k) => {
              const { value, name } = this.state;
              this.state.listagem.map((cid, x) => {
                const { customer_id } = this.state;
                this.state.bloqueios.push({
                  "account_id": s.value,
                  "bids": !this.state.bids ? false : true,
                  "customer_id": cid.customer_id,
                  "motive_description": "Outros - Em Massa",
                  "motive_id": '9',
                  "questions": !this.state.questions ? false : true,
                });
              })
            })

            axios.post(process.env.REACT_APP_API_URL + `/blacklist/list/customer`, {
              "list_name":this.state.nomeLista,
              "customers":this.state.bloqueios
            },
            {headers: {"Authorization": 'Bearer ' + getToken(), "Content-Type": 'application/json'}}
            ).then(res => {

              axios.post(process.env.REACT_APP_API_URL + `/blacklist/list/import`, 
                {
                  "blacklist_name":this.state.nomeLista, 
                  "accounts":this.state.accountId, 
                  "bids": !this.state.bids ? false : true,
                  "questions": !this.state.questions ? false : true
                },
              {headers: {"Authorization": 'Bearer ' + getToken(), "Content-Type": 'application/json'}},)
              .then(res => {
              
                const status = res.data.status;
                this.setState({status});
                if (this.state.status === 'success'){
                  const message = res.data.message;
                  this.setState({message});
                  Swal.fire({html:'<p><b>'+this.state.message+'</b><br>'+res.data.data.status+'</p>', type: this.state.status, showCloseButton: false, showConfirmButton: true, textConfirmButton:"OK"});
                  window.location.href = "#/minhaslistasdebloqueios";
                }else{
                  const message = res.data.message;
                  this.setState({message});
                  Swal.fire({html:'<p>'+this.state.message+'</p>', type: 'error', showConfirmButton: true});
                
                }
              }).catch((error) => {
                this.setState({isLoadingCadastro: false});
                !error.response ?
                (this.setState({tipoErro: error})) :
                (this.setState({tipoErro: error.response.data.message}))
                Swal.fire({html:'<p>'+ this.state.tipoErro+'<br /></p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
              });

            }).catch((error) => {
              this.setState({isLoadingCadastro: false});
                this.state.isLoadingCadastro = false;
                !error.response ?
                (this.setState({tipoErro: error})) :
                (this.setState({tipoErro: error.response.data.message}))
                Swal.fire({html:'<p>'+ this.state.tipoErro+'<br /></p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
            });
          }).catch((error) => {     
            this.setState({isLoadingCadastro: false});
            !error.response ?
            (this.setState({tipoErro: error})) :
            (this.setState({tipoErro: error.response.data.message}))
            Swal.fire({html:'<p>'+ this.state.tipoErro+'<br /></p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
          });
        }
      }
    }
  }
}

  render() {
    const {isLoadingCadastro} = this.state;
    const { isLoadingAccounts, isLoadingLista, error, accounts, selectedOption, changes, source, options, grid  } = this.state;
    
    return (
      <div className="animated fadeIn">
        <Row>
        <Col xs="12" sm="12" md="10" xl="8">
        <Card className="card-accent-primary">
        <input type="hidden" value="autocompleteOff"/>
        <CardBody>
        <FormGroup>
          <Label for="lista">Lista de Bloqueio</Label>
          <Input type="textarea" 
          name="lista" 
          id="lista"
          rows="8"
          onChange={this.handleInputChange}
          value={this.state.lista}
          placeholder="Insira a lista aqui"
          autoComplete="given-name"
          autoFocus={true}
          onMouseOut={() => this.montarTabela(this.state.lista)}
          /> 
        </FormGroup>
        
        <ButtonGroup className="fullWidth">
        <Button 
          className="btn btn-md" 
          color="primary" 
          onClick={() => this.toggleCustom(0)} 
          aria-expanded={this.state.custom[0]} 
          aria-controls="exampleAccordion1">
          Salvar Lista
        </Button>
        <Button className="btn btn-md" color="primary" onClick={() => this.toggleCustom(1)} aria-expanded={this.state.custom[1]} aria-controls="exampleAccordion2">
          Bloquear Lista
        </Button>
        <Button className="btn btn-md" color="primary" onClick={() => this.toggleCustom(2)} aria-expanded={this.state.custom[2]} aria-controls="exampleAccordion3">
          Salvar e Bloquear Lista
        </Button>
        </ButtonGroup>
        {!isLoadingLista ? (
        <div className="animated fadeIn">
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
                  className="multiSelBlockUserList"
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
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} name="questions" value="1" onChange={this.handleInputChange} />
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
                className="multiSelBlockList"
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
              <AppSwitch 
                className={'mx-1'} 
                variant={'pill'} 
                color={'danger'} 
                name="bids" 
                value="1" 
                onChange={this.handleInputChange} 
                
              />
              <span className="textoSwitch"> Bloquear para compras</span>
              </FormGroup>
              <FormGroup>
              <AppSwitch 
                className={'mx-1'} 
                variant={'pill'} 
                color={'danger'} 
                name="questions" 
                value="1" 
                onChange={this.handleInputChange} 
                
              />
              <span className="textoSwitch">Bloquear para perguntas</span>
              </FormGroup>
              </Collapse>
          </div>
          </div>
          </div>
        ) : (
          <div></div>
        )}
        </CardBody>
        <CardFooter  className="text-right">
          {!isLoadingCadastro ? (
            <div>
              <Button color="primary" onClick={() => this.concluirOperacao()} disabled={this.state.salvar?true:false} >Concluir</Button>
             </div>
          ) : (
             <ReactLoading type={'spinningBubbles'} color={'#054785'} height={30} width={30}  className='spinnerStyleMini'/>
          )}
        </CardFooter>
        
        </Card>
        </Col>
        </Row>
      </div>
    );
  }
}

export default BloquearEmMassa;
