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

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  
  handleSubmit(event) {

    event.preventDefault();
    this.setState({isLoadingCadastro: true});
    
    if (this.state.userName === ''){
      Swal.fire({html:'<p>Preencha o seu Usuário!<br/> Não deixe campos em branco</p>', type: 'error', showConfirmButton: true});
    }else if(this.state.email === ''){
      Swal.fire({html:'<p>Preencha o seu E-mail!<br/>Não deixe campos em branco</p>', type: 'error', showConfirmButton: true});
    }else if(!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
      Swal.fire({html:'<p>Preencha o seu E-mail corretamente!<br/>Formato de email Inválido!</p>', type: 'error', showConfirmButton: true});
    }else if(this.state.password === '' || this.state.confirmPassword === ''){
      Swal.fire({html:'<p>Preencha a sua Senha!<br/>Não deixe campos em branco</p>', type: 'error', showConfirmButton: true});
    }else if(this.state.password.length < 6 || this.state.confirmPassword < 6){
      Swal.fire({html:'<p>A senha deve ter um mínimo de 6 caracteres!</p>', type: 'error', showConfirmButton: true});
    }else if(this.state.password !== this.state.confirmPassword ){
      Swal.fire({html:'<p>As senhas não conferem!</p>', type: 'error', showConfirmButton: true});
    /*}else if (this.state.termos === '' ){
      alert('Aceite os termos de uso!' + this.state.termos);*/
    }else{
      const data = {
        "email":this.state.email,
        "name":this.state.userName,
        "password":this.state.password
      }
      api.post(`/user`, data)
        .then(res => {
          Swal.fire({
            html:`<p>${res.data.message}</p>`,
            type: res.data.status,
            showCloseButton: true
          });
          this.setState({ isLoadingCadastro: false });
          this.props.history.push("/");
          window.location.reload();
        }).catch((error) => {
          this.setState({isLoadingCadastro: false});
          Swal.fire({
            html:`<p>${error}</p>`,
            type: 'error',
            showConfirmButton: true
          });
        });
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
                                 placeholder="Nome"
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
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Cadastro;
