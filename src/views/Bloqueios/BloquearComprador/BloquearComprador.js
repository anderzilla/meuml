import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  ButtonDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';
import { AppSwitch } from '@coreui/react'
import 'react-select/dist/react-select.min.css';

class BloquearComprador extends Component {
  //Adaptar para os valores de motivos de bloqueio
  constructor(props) {
    super(props);

    this.toggleConta = this.toggleConta.bind(this);
    this.toggleMotivo = this.toggleMotivo.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      dropdownOpenConta: false,
      dropdownOpenMotivo: false,
      accountId : '',
      accountName: '',
      accountsSelected: '',
	    bids : '',
      customer_id : '',
      motivoBloqueio : '',
	    motiveDescription : '',
	    motiveId : '',
      questions : '',
      accounts: [],
      motivos: [],
      isLoadingAccounts: true,
      isLoadingMotivos: true,
      tipoUser: '',
      valueID: '',
    }
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  toggleConta() {
    this.setState(prevState => ({
      dropdownOpenConta: !prevState.dropdownOpenConta
    }));
  }

  toggleMotivo() {
    this.setState(prevState => ({
      dropdownOpenMotivo: !prevState.dropdownOpenMotivo
    }));
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
      this.setState({
        accounts: res.data.data,
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

  saveChangesSelect(value) {
    this.setState({ accountsSelected: value });
  }

  fetchBlacklist(accountId,accountName) {
    this.setState({accountId: accountId, accountName: accountName});
  }

  fetchMotivoSelecionado(motiveId,motiveName,motiveDescription) {
    this.setState({motiveId: motiveId, motiveName: motiveName, motiveDescription: motiveDescription});
  }

  fetchTipoUser(tipo){
    this.setState({tipoUser: tipo, customer_id: ''});
  }

  handleSubmit(event) {

    event.preventDefault();
    //customer_id
    if (this.state.accountId === ''){
      alert('Selecione uma conta para realizar o bloqueios!');
    }else if(this.state.customer_id === '' ){
      alert('Preencha o id ou usuário do comprador.');
    }else if(this.state.motiveId === '' ){
      alert('Defina o motivo do bloqueio.');
    }else{
      axios.post(process.env.REACT_APP_API_URL + `/blacklist`, {
        "account_id": this.state.accountId,
	      "bids": !this.state.bids ? false : true,
	      "customer_id": this.state.customer_id,
	      "motive_description": this.state.motivoBloqueio,
	      "motive_id": this.state.motiveId,
        "questions": !this.state.questions ? false : true,
      },
      {headers: {"Authorization": 'Bearer ' + getToken(), "Content-Type": 'application/json'}},)
      .then(res => {
        //console.log(res.data);
        const status = res.data.status;
        this.setState({status});
        if (this.state.status === 'success'){
          const message = res.data.message;
          this.setState({message});
          Swal.fire({html:'<p>'+this.state.message+'</p>', type: this.state.status, showCloseButton: false, showConfirmButton: true, textConfirmButton:"OK"});
          this.props.history.push("/meusbloqueios");
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

    const { isLoading, isLoadingAccounts, isLoadingMotivos, error, accounts, motivos } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="10" xl="8">
            <Card className="card-accent-primary">
            <Form onSubmit={this.handleSubmit} name='bloquearcomprador'>
              <CardHeader>
                <h5>Bloquear Comprador </h5>
              </CardHeader>
              <CardBody>

              <Row>
              <Col xs="12" sm="6" md="6">
                <FormGroup>
                <Label for="idConta">Conta do Mercado Livre</Label>
                  {!isLoadingAccounts ? (
                    <Dropdown id="idConta"  isOpen={this.state.dropdownOpenConta} toggle={() => {this.toggleConta();}}>
                      <DropdownToggle caret color="outline-dark" size="sm">
                        {!this.state.accountId ? ('Selecione uma conta!') : this.state.accountName}
                      </DropdownToggle>
                      <DropdownMenu>
                        {accounts.map((c, k) => {
                          const { id, name } = this.state;
                          return (<DropdownItem onClick={() => this.fetchBlacklist(c.id, c.name)}>{c.name}</DropdownItem>)
                        })}
                      </DropdownMenu>
                      </Dropdown>
                      ) : (
                        <h3>Carregando...</h3>
                      )}
                </FormGroup>
                <FormGroup>
                  <Label for="idUsusario">ID ou Usuário do comprador</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    <ButtonDropdown  isOpen={this.state.first} toggle={() => { this.setState({ first: !this.state.first }); }}>
                      <DropdownToggle caret color="outline-dark" size="sm">
                        {!this.state.tipoUser ? ('Selecione') : this.state.tipoUser}
                      </DropdownToggle>
                      <DropdownMenu className={this.state.first ? 'show' : ''}>
                        <DropdownItem onClick={() => this.fetchTipoUser('ID do usuário')}>ID do usuário</DropdownItem>
                        <DropdownItem onClick={() => this.fetchTipoUser('Nome de Usuário')}>Nome de Usuário</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </InputGroupAddon>
                  <Input type="text"
                    name="customer_id"
                    id="idUsuario"
                    placeholder={this.state.tipoUser === 'ID do usuário'? 'ID do usuário' : 'Nome de Usuário'}
                    autoComplete="given-name"
                    autoFocus={true}
                    color="outline-dark"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.customer_id}
                    pattern={this.state.tipoUser === 'ID do usuário'? '"[0-9]*"' : '[a-zA-Z0-9]'}
                    onChange={(event) => {
                      if (this.state.tipoUser === 'ID do usuário'){
                        if (isNaN(Number(event.target.value))) {
                          return;
                        } else {
                          this.setState({ customer_id: event.target.value });
                        }
                      }else{
                          this.setState({ customer_id: event.target.value });
                      }
                    }}

                     />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                <Label for="idMotivo">Selecione o motivo do bloqueio</Label>
                  {!isLoadingMotivos ? (
                    <Dropdown id="idMotivo"  isOpen={this.state.dropdownOpenMotivo} toggle={() => {this.toggleMotivo();}}>
                      <DropdownToggle caret color="outline-dark" size="sm">
                        {!this.state.motiveId ? ('Selecione um motivo!') : (this.state.motiveId+' - '+this.state.motiveName)}
                      </DropdownToggle>
                      <DropdownMenu>
                        {motivos.map((m, key) => {
                          const { id, name, description } = this.state;
                          return (<DropdownItem onClick={() => this.fetchMotivoSelecionado(m.id, m.name, m.description)}>{m.id} - {m.name}</DropdownItem>)
                        })}
                      </DropdownMenu>
                      </Dropdown>
                      ) : (
                        <h3>Carregando...</h3>
                      )}
                  </FormGroup>
                  </Col>
                <Col xs="12" sm="6" md="6">
                <FormGroup>
                <Label for="motivoBloqueio">Descreva o motivo do bloqueio <em>(opcional)</em></Label>
                  <Input type="textarea"
                    name="motivoBloqueio"
                    id="motivoBloqueio"
                    rows="3"
                    color="outline-dark"
                    onChange={this.handleInputChange}
                    value={this.state.motivoBloqueio} />
                </FormGroup>

                <FormGroup>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} name="bids" value="1" onChange={this.handleInputChange}  />
                <span class="textoSwitch"> Bloquear para compras</span>
                </FormGroup>
                <FormGroup>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} name="questions" value="1" onChange={this.handleInputChange}/>
                <span class="textoSwitch">Bloquear para perguntas</span>
                </FormGroup>
                </Col>
                </Row>


              </CardBody>
              <CardFooter>
                <Button type="submit" size="md" color="primary"><i className="fa fa-lock"></i> Bloquear</Button>
              </CardFooter>
              </Form>
            </Card>
          </Col>
          </Row>

      </div>
    )
  }
}

export default BloquearComprador;
