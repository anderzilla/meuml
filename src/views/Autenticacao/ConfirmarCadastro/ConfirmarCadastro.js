import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Row } from 'reactstrap';
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({auth: 'true'});
    axios.post(process.env.REACT_APP_API_URL + `/auth/confirm`, {
      "hash":this.state.hash,
      "email":this.state.email,
    })
    .then(res => {
      Swal.fire({
        html:'<p>'+res.data.message+'</p>',
        type: res.data.status,
        showConfirmButton: true,
        onClose: () => {
          this.props.history.push('/login');
          window.location.reload();
        }
      });
    }).catch(error => {
      Swal.fire({
        html:'<p>'+error+'</p>',
        type: 'error',
        showConfirmButton: true,
        onClose: () => {
          this.props.history.push('/login');
          window.location.reload();
        }
      });
    });
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="col-md-12">
                <CardBody className="text-center">
                  <div>
                    <h2><img src={logo} width="60%" className="espacoLogoCadastro" alt="MeuML" /></h2>
                    <Form onSubmit={this.handleSubmit}>
                      <h2 className="tituloLogin">Confirmar Cadastro</h2>
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
