import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import logo from '../../../assets/img/brand/MeuML-logo2.png'

class ConfirmarCadastro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email ,
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
    
    axios.post(`https://api.app2.meuml.com//auth/confirm`, {
      "hash":this.state.hash,
      "email":this.state.email,
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
        alert(this.state.message);
      }
    })
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
                        <h2 className="tituloLogin">Confrmar Cadastro</h2>
                        <p className="alert alert-primary fadeIn show">Se este é o seu email: <b>{this.state.email}</b> Confirme no botão abaixo!</p>
                        <Button type="submit" color="primary"><i className="fa fa-check"></i> Confirmar</Button>
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

export default ConfirmarCadastro;
