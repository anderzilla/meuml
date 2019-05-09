import React, { Component } from 'react';
import axios from "axios";
import {getToken, login} from "../../../auth";
import Swal from "sweetalert2";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form, Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import logo from "../../../assets/img/brand/MeuML-logo2.png";
import {Link} from "react-router-dom";

class RenomearConta extends Component {
  constructor(props) {

    super(props);


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


    const { handle } = this.props
    let account_id = this.props.match.params.id
    axios.put(`https://api.app2.meuml.com/accounts/` + account_id,
        {'name' : this.state.name},
        { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
      console.log(res);
      if (res.data.status === 'success'){
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'success', showConfirmButton: true,
          onClose: () => {
            this.props.history.push('/listacontas');
            //window.location.reload();
          }});
      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true,
          onClose: () => {
            this.props.history.push('/listacontas');
            //window.location.reload();
          }});
      }
    }).catch(error => {
      Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar',
        onClose: () => {
          this.props.history.push('/listacontas');
          //window.location.reload();
        }});
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
                    <CardBody>
                      <Form onSubmit={this.handleSubmit}>
                        <h2 className="tituloLogin">Alterar o nome da conta </h2>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="name" value={this.state.name} placeholder="Nome da conta" onChange={this.handleInputChange} />
                        </InputGroup>
                        <Row>

                          <Col xs="7" className="text-right">
                          </Col>
                          <Col xs="5" className="text-center">
                            <Input type="submit" value="Salvar alteração" className="px-4 btn btn-primary" />
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

export default RenomearConta;
