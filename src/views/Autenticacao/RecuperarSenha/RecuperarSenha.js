import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import logo from '../../../assets/img/brand/MeuML-logo2.png'

class RecuperarSenha extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      token: '',
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
    
    axios.post(process.env.REACT_APP_API_URL + `/auth/resetpassword`, {
      "email":this.state.email
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
    }).catch(error => {
      Swal.fire({html:'<p>Indisponibilidade Temporária<br /> '+ error+'</p>', type: 'error', showConfirmButton: true,
      onClose: () => {
        this.props.history.push('/login');
        window.location.reload();
      }
    });
  });
  }

  toggleShow = show => {
    this.setState({show});
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
            
              <Card className="col-md-12 text-muted py-5 d-md-down-none">
                
                  <CardBody className="text-center">
                    <div>
                      <h2><img src={logo} width="60%" className="espacoLogoCadastro" alt="MeuML" /></h2>
                      <Form onSubmit={this.handleSubmit}>
                      <h2 className="tituloLogin">Recuperar Senha</h2>
                      <p className="alert alert-warning fade show">Será enviado para o <b>e-mail informado abaixo</b> as instruções e informações de recuperação de senha.</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-at"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="email"  value={this.state.email} onChange={this.handleInputChange} id="email" placeholder="E-mail" autoComplete="email" required/>
                      </InputGroup>
                      <Row>
                        <Col xs="12" className="text-center">
                          <Button type="submit" color="primary"><i className="fa fa-check"></i> Enviar</Button>
                          <Link to="./" >
                            <Button className="btn btn-danger" title="Voltar" ><i className="fa fa-arrow-left"></i> Voltar</Button>
                          </Link>
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

export default RecuperarSenha;
