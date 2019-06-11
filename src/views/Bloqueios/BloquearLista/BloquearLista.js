import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Form,
  Label,
  FormGroup,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';

import Picky, {components} from "react-picky";
import "react-picky/dist/picky.css";

class BloquearLista extends Component {
  constructor(props) {
    super(props);

    this.toggleConta = this.toggleConta.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
        this.selectMultipleOption = this.selectMultipleOption.bind(this);

    this.state={
      accountId : '',
      accountName: '',
      blackListName: '',
      accounts: [],
      backlistList: [],
      isLoadingBlacklistList: true,
      isLoadingAccounts: true,
      accountId: null,
      value: null,
      arrayValue: [],
    }

    this.nbloqueios = "2048";
    this.nlistas = "48";
    // ...

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  toggleConta() {
    this.setState(prevState => ({
      dropdownOpenConta: !prevState.dropdownOpenConta
    }));
  }

  fetchBlacklist(accountId,accountName) {
    this.setState({accountId: accountId, accountName: accountName});
  }

  componentDidMount() {
    this.fetchAccounts();

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
    //Prepara o array para ser manipulado
    const values = this.state;
    this.state.values = value;
    //Conta quantos resultados foram selecionados
    const valuesToRender = this.state.values.filter(val => val.value)
    const numRows = valuesToRender.length
    //Monta a variável com as contas que receberão a lsta de blqueios (123,124,125,...)
    const {accountId, accountName} = this.state;
    for (var i = 0; i < numRows; i++) {
    this.state.accountId = !this.state.accountId? this.state.accountId = value[i].value : this.state.accountId+','+value[i].value;
    }
  }

  handleSubmit(event) {

    event.preventDefault();
    if (this.state.blackListName === ''){
      Swal.fire({html:'<p>Preencha o nome da lista para bloqueá-la</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    }else{
      axios.post(process.env.REACT_APP_API_URL + `/blacklist/list/import`, [{
        "account_id": this.state.accountId,
        "blacklist_name": this.state.blackListName,
      }],
      {headers: {"Authorization": 'Bearer ' + getToken(), "Content-Type": 'application/json'}},)
      .then(res => {
        //console.log(res.data);
        const status = res.data.status;
        this.setState({status});
        if (this.state.status === 'success'){
          const message = res.data.message;
          this.setState({message});
          Swal.fire({html:'<p>'+this.state.message+'</p>', type: this.state.status, showCloseButton: false, showConfirmButton: true, textConfirmButton:"OK"});
        }else{
          const message = res.data.message;
          this.setState({message});
          Swal.fire({html:'<p>'+this.state.message+'</p>', type: 'error', showConfirmButton: true});
        }

      }).catch((error) => {
        console.log(error);
        !error.response ?
        (this.setState({tipoErro: error})) :
        (this.setState({tipoErro: error.response.data.message}))
        Swal.fire({html:'<p>'+ this.state.tipoErro+'<br /></p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });
  }

  }

  render() {
    const { isLoading, isLoadingAccounts, isLoadingBlacklistList, backlistList, error, accounts} = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
        <Form name='novaLista' onSubmit={this.handleSubmit}>
          <CardHeader>
            <h5>Bloquear Lista</h5>
          </CardHeader>
          <CardBody>
          <Row>
            <Col md="4" xs="12">
            <FormGroup>
            <Label for="idConta">Conta do Mercado Livre</Label>
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
              className="multiSelect"
            />

            ) : (
              <h3>Carregando...</h3>
            )}
            </FormGroup>
            </Col>
            <Col md="8" xs="12">
              <FormGroup>
                  <Label for="idUsusario">Digite o Nome de uma lista abaixo para bloqueá-la </Label>
                  <Input type="text"
                    name="blackListName"
                    id="blackListName"
                    placeholder="Nome da lista"
                    autoComplete="given-name"
                    autoFocus={true}
                    required
                    onChange={this.handleInputChange}
                    value={this.state.blackListName} />
                </FormGroup>
            </Col>
          </Row>
          </CardBody>
          <CardFooter>
          <Button type="submit" size="sm" color="primary"><i className="fa fa-file-text"></i> Bloquear Lista</Button>
          </CardFooter>
          </Form>
        </Card>
      </div>
    )
  }
}

export default BloquearLista;
