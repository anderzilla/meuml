import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import logo from '../../../assets/img/brand/MeuML-logo2.png'

class AlterarSenha extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email ,
      password: '',
      password2: '',
      hash: this.props.match.params.hash,
      message: '',
      status: '',
      show: false,
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
    
    this.setState({auth: 'true'});
    
    axios.put(process.env.REACT_APP_API_URL + `/user/updatepassword`, {
      "hash":this.state.hash,
      "email":this.state.email,
      "password":this.state.password,
      "password2":this.state.password2
    })
    .then(res => {
      const status = res.data.status;
      this.setState({status});
      if (this.state.status === 'success'){
        const message = res.data.message;
        this.setState({message});
        Swal.fire({html:'<p>'+this.state.message+'</p>', type: this.state.status, showConfirmButton: true,
        onClose: () => {
          this.props.history.push('/login');
          window.location.reload();
        }
      });
        //TO DO: Inserir redirect
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
    })
    .catch(error => {
      Swal.fire({html:'<p>Indisponibilidade Temporária</p>', type: 'error', showConfirmButton: true,
      onClose: () => {
        this.props.history.push('/login');
        window.location.reload();
      }
    });
  });
  }

  render() {
    return (
      <div className=" align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6" sm="12" xs="12">
            
              <Card className="col-md-12">
                
                  <CardBody className="text-center">
                    <div>
                      <h2><img src={logo} width="60%" className="espacoLogoCadastro" alt="MeuML" /></h2>
                      <Form onSubmit={this.handleSubmit}>
                      <h2 className="tituloLogin">Alterar Senha</h2>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-at"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="email"  value={this.state.email} onChange={this.handleInputChange} id="email" placeholder="E-mail" autoComplete="email" required/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password"  value={this.state.password} onChange={this.handleInputChange} id="password" placeholder="Senha" autoComplete="password" required/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password2"  value={this.state.password2} onChange={this.handleInputChange} id="password2" placeholder="Repita a Senha" autoComplete="password2" required/>
                      </InputGroup>
                      <Row>
                        <Col xs="12" className="text-center">
                          <Button type="submit" color="primary"><i className="fa fa-check"></i> Confirmar</Button>
                        </Col>
                      </Row>
                    </Form>
                    </div>
                  </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AlterarSenha;
