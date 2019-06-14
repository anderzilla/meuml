import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import {login} from '../../../auth';

import logo from '../../../assets/img/brand/MeuML-logo2.png'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      message: '',
      status: '',
      tipoErro: '',
    };

    this.submitInput = React.createRef();
    this.focusSubmitInput = this.focusSubmitInput.bind(this);

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
    //Constantes para serem utilizadas na montagem dos dados do usuário no sistema
    const USER_ID = "@MeuML-UserId";
    const USER_NAME = "@MeuML-UserName";
    const USER_EMAIL = "@MeuML-UserEmail";
    const USER_SELLER_ID = "@MeuML-UserSellerId";
    //Realiza o login testando os dados do usuário no servidor
      "email":this.state.email,
      "password":this.state.password
    })
    .then(res => {
      const status = res.data.status;
      this.setState({status});
      if (this.state.status === 'success'){
        const message = res.data.message;
        this.setState({message});
        const token = res.data.data.jwt;
        this.setState({token});
        const user_id = res.data.user_id;
        this.setState({user_id});
        login(this.state.token);
        //Pega os dados do usuário baseado na resposta do servidor
        axios.get(process.env.REACT_APP_API_URL + `/user/`+this.state.user_id, {
          "hash":this.state.token,
	        "email" : this.state.email,
	        "password" : this.state.password,
	        "password2" : this.state.password
        }).then(resp =>{
          localStorage.setItem(USER_ID, resp.data.id);
          localStorage.setItem(USER_NAME, resp.data.name);
          localStorage.setItem(USER_EMAIL, resp.data.email);
          localStorage.setItem(USER_SELLER_ID, resp.data.seller_id);
        })
        .catch(error => {
          Swal.fire({html:'<p>Não foi possivel carregar os dados do Usuário! <br/> '+error+'</p>', type: 'error', showConfirmButton: true,});
      });
        //Redireciona para a tela inicial do sistema DASHBOARD
        this.props.history.push("/");
      }else{
        const message = res.data.message;
        this.setState({message});
        Swal.fire({html:'<p>'+this.state.message+'</p>', type: 'error', showConfirmButton: true,
        onClose: () => {
          this.props.history.push('/login');
          window.location.reload();
        }
      });
      }
    }).catch(error => {
        if (error.response.data.errors.email !== '' || error.response.data.errors.email !== 'undefined'){
          this.setState({tipoErro: error.response.data.errors.email});
            
        }else if(error.response.data.errors.password !== '' || error.response.data.errors.password !== 'undefined'){
          this.setState({tipoErro: error.response.data.errors.password});
            
        }else{
          this.setState({tipoErro: "Erro desconhecido, Tente novamente!"});
            
        }
        Swal.fire({html:'<p>'+ error.response.data.message+'<br />'+ this.state.tipoErro +'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
  });
  }

  focusSubmitInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.submitInput.current.focus();
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
                        <Col xs="5" className="text-right ">
                          <Input type="submit" value="Entrar" className="btn btn-square btn-block btn-primary active" />
                        </Col>
                        <Col xs="7" className="text-right ">
                        <Link to="/recuperarsenha">
                        <Button color="outline-light" className="px-4">Recuperar senha</Button>
                        </Link>
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
