import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import logo from '../../../assets/img/brand/MeuML-logo2.png'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      auth: 'false',
      token: '',
      message: '',
      status: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {

    event.preventDefault();
    
    //alert('Email: ' + this.state.email);
    //alert('Senha: ' + this.state.password);
    this.setState({auth: 'true'});
    
    axios.post(`https://api.app2.meuml.com/auth/login`, {
      "email":this.state.email,
      "password":this.state.password
    })
    .then(res => {
      const status = res.data.status;
      this.setState({status});
      if (this.state.status === 'success'){
        const message = res.data.message;
        this.setState({message});
        Swal.fire({html:'<p>'+this.state.message+'</p>', type: this.state.status, showCloseButton: true, showConfirmButton: false,});
        //TO DO: Inserir redirect
      }else{
        const message = res.data.message;
        this.setState({message});
        Swal.fire({html:'<p>'+this.state.message+'</p>', type: 'error', showCloseButton: true, showConfirmButton: false,});
      }
    }).catch(error => {
      Swal.fire({html:'<p>Indisponibilidade Temporária</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
  });
    
    
    //realizar os testes da API aqui (login)
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="10">
              <CardGroup>
              <Card className="col-md-6 col-xm-12">
                  <CardBody className="text-center">
                    <div>
                      <h2><img src={logo} width="90%" className="espacoLogoCadastro" alt="MeuML" /></h2>
                      <p>Ainda não é cadastrado?</p>
                      <Link to="/cadastro">
                        <Button color="primary" className="px-4" tabIndex={-1}>Cadastre-se!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
                <Card className="col-md-6 col-xm-12">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h2 className="tituloLogin">Acesse sua conta</h2>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-envelope"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="email" value={this.state.email} placeholder="E-mail" onChange={this.handleInputChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" value={this.state.password} placeholder="Senha" onChange={this.handleInputChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="7">
                        <Link to="/recuperarsenha">
                        <Button color="outline-light" className="px-4">Recuperar senha</Button>
                        </Link>
                        </Col>
                        <Col xs="5" className="text-right">
                          <Input type="submit" value="Entrar" className="px-4 btn btn-primary" />
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
