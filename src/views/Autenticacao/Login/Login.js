import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import logo from '../../../assets/img/brand/MeuML-logo2.png'



class Login extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
              <Card class="col-md-6 text-muted py-5 d-md-down-none" style={{ width: '50%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2><img src={logo} width="90%" class="espacoLogoCadastro" alt="MeuML" /></h2>
                      <p>Ainda não é cadastrado?</p>
                      <Link to="/register">
                        <Button color="primary" className="px-4" tabIndex={-1}>Cadastre-se!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
                <Card class="col-md-6" style={{ width: '50%' }}>
                  <CardBody>
                    <Form>
                      <h2 class="tituloLogin">Acesse sua conta</h2>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Usuário" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Senha" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="7">
                        <Button color="outline-light" className="px-4">Recuperar senha</Button>
                        </Col>
                        <Col xs="5" className="text-right">
                        <Link to="/dashboard">
                          <Button color="primary" className="px-4">Entrar</Button>
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
