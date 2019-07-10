import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Collapse, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../../assets/img/brand/MeuML-logo2.png';
import { AppSwitch } from '@coreui/react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import api from '../../../services/api';


class Cadastro extends Component {

  constructor(props){
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: false,
      fadeIn: true,
      timeout: 300,
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termos: false,
      token: '',
      message: '',
      status: '',
      isLoadingCadastro: false,
    };

    this.mudaTermos = this.mudaTermos.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  mudaTermos(){
    if (this.state.termos === false){
      this.setState({ termos: true });  
    }else{
      this.setState({ termos: false });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  
  handleSubmit(event) {

    event.preventDefault();
    this.setState({
      isLoadingCadastro: true,

    });
    
    if (this.state.userName === ''){
      alert('Preencha  o seu Usuário! Nã deixe campos em branco');
    }else if(this.state.email === ''){
      alert('Preencha  o seu E-mail! Nã deixe campos em branco');
    }else if(this.state.password === '' || this.state.confirmPassword === ''){
      alert('Preencha  o sua Senha! Não deixe campos em branco');
    }else if(this.state.password.length < 6 || this.state.confirmPassword < 6){
      alert('A senha deve ter um mínimo de 6 caracteres!');
    }else if(this.state.password !== this.state.confirmPassword ){
      alert('As senhas não conferem!');
    /*}else if (this.state.termos === '' ){
      alert('Aceite os termos de uso!' + this.state.termos);*/
    }else{
      api.post(`/user`, {
        "email":this.state.email,
        "name":this.state.userName,
        "password":this.state.password
      })
      .then(res => {
        //console.log(res.data);
        const status = res.data.status;
        this.setState({status});
        if (this.state.status === 'success'){
          const message = res.data.message;
          this.setState({message});
          Swal.fire({html:'<p>'+this.state.message+'</p>', type: this.state.status, showCloseButton: false, showConfirmButton: true, textConfirmButton:"OK"});
          this.setState({
            isLoadingCadastro: false,
      
          });
          this.props.history.push("/");
          //TO DO: Inserir redirect
        }else{
          const message = res.data.message;
          if (res.data.email !== '' || res.data.email !== 'undefined'){
            this.setState({tipoErro: res.data.data.email});
          }else if(res.data.data._schema !== '' || res.data.data._schema !== 'undefined'){
            this.setState({tipoErro: res.data.data._schema});
          }else{
            this.setState({tipoErro: "Erro desconhecido, tente novamente!"});
          }
          this.setState({message});
          this.setState({
            isLoadingCadastro: false,
      
          });
          Swal.fire({html:'<p>'+this.state.message+' <br /> <b>'+ this.state.tipoErro +'</b> </p>', type: 'error', showConfirmButton: true});
        }
      })/*.catch((error) => {
        
        if (error.response.data.data.email !== '' || error.response.data.data.email !== 'undefined'){
          this.setState({tipoErro: error.response.data.data.email});
        }else if(error.response.data.data._schema !== '' || error.response.data.data._schema !== 'undefined'){
          this.setState({tipoErro: error.response.data.data._schema});
        }else{
          this.setState({tipoErro: "Erro desconhecido, tente novamente!"});
        }
       
        Swal.fire({html:'<p>'+ error.response.data.message+'<br />'+ this.state.tipoErro +'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    })*/;
  }
  }


  render() {
    const {isLoadingCadastro} = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form  onSubmit={this.handleSubmit}>
                    <img src={logo} width="80%" className="logoFormCadastro" alt="MeuML" />
                    <h2 className="text-center">Cadastro</h2>
                    <p className="alert alert-info text-center">Informe um e-mail válido e em uso, enviaremos um link de confirmação de cadastro para o e-mail informado abaixo.</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                                 name="userName"
                                 id="userName"
                                 placeholder="Usuário"
                                 autoComplete="username"
                                 required
                                 onChange={this.handleInputChange}
                                 value={this.state.userName} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="email"
                                name="email"
                                 id="email"
                                 placeholder="E-mail"
                                 autoComplete="email"
                                 required
                                 onChange={this.handleInputChange}
                                 value={this.state.email} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                                     name="password"
                                     id="password"
                                     placeholder="Senha (min. 6 caracteres)"
                                     autoComplete="new-password"
                                     required
                                     onChange={this.handleInputChange}
                                     value={this.state.password} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                                     name="confirmPassword"
                                     id="confirmPassword"
                                     placeholder="Confirmar Senha"
                                     autoComplete="new-password"
                                     required
                                     onChange={this.handleInputChange}
                                     value={this.state.confirmPassword} />
                    </InputGroup>
                    <Row>
                      <Col xs="12" sm="4">
                      {/*<InputGroup>
                        <AppSwitch className={'mx-1'} variant={'3d'} color={'success'} name="termos" onChange={this.mudaTermos} defaultChecked={this.state.termos} label dataOn={'\u2713'} dataOff={'\u2715'}/> Aceito os termos de uso.
                      </InputGroup>*/}
                      </Col>
                      <Col xs="12" sm="8" className="text-right">
                      {!isLoadingCadastro ? (
                      <div>
                      <Button type="submit" color="primary" disabled={this.state.submitButton}><i className="fa fa-check"></i> Concluir Cadastro</Button>
                      <Link to="./" >
                      <Button className="btn btn-danger" title="Voltar" ><i className="fa fa-arrow-left"></i> Voltar</Button>
                    </Link>
                    </div>
                      ) : (
                        <ReactLoading type={'spinningBubbles'} color={'#054785'} height={50} width={50}  className='spinnerStyle'/>
                      )}
                     
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                {/*<div className="card-footer-actions">
                <b>Termos de Uso</b> <Button className="card-footer-action badge badge-dark badge-pill float-right text-light" data-target="#collapseTermos" onClick={this.toggle}><i className="icon-arrow-down"></i></Button>
                </div>
                <Collapse isOpen={this.state.collapse} id="collapseTermos">
                  <Row>
                    <Col xs="12" sm="12">
                      <em>Termos de Uso</em>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                    laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                    ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                    </Col>
                  </Row>
                    </Collapse>*/}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Cadastro;
