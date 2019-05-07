import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

class AdicionarConta extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      message: '',
      status: '',
    };

    this.submitInput = React.createRef();

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

    axios.post(`https://api.app2.meuml.com/oauth/mercado-livre/authorize`, {
      "code":this.state.email,
    })
    .then(res => {
      const status = res.data.status;
      this.setState({status});
      if (this.state.status === 'success'){
        const message = res.data.message;
        this.setState({message});
        const account = res.data.data.account_id;
        this.setState({account});
        Swal.fire({html:'<p>'+this.state.message+'</p>', type: 'success', showConfirmButton: true,
          onClose: () => {
          this.props.history.push('/listaconstas');
          window.location.reload();
          }
        });
      }else{
        const message = res.data.message;
        this.setState({message});
        Swal.fire({html:'<p>'+this.state.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => {
      if (error.response.data.data.email !== '' || error.response.data.data.email !== 'undefined'){
        this.setState({tipoErro: error.response.data.data.email});
      }else if(error.data.data._schema !== '' || error.data.data._schema !== 'undefined'){
        this.setState({tipoErro: error.response.data.data._schema});
      }else{
        this.setState({tipoErro: "Erro desconhecido, tente novamente!"});
      }
      Swal.fire({html:'<p>'+ error.response.data.message+'<br />'+ this.state.tipoErro +'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });
  }
  render() {
    return (
      <div className="animated fadeIn">
        
        <Card>
          <Form onSubmit={this.handleSubmit}>
          <CardHeader>
          <h1>Adicionar Conta</h1>
          </CardHeader>
          <CardBody>
            <p>Insira  código de sua conta do MercadoLivre.</p>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-id-card"></i>
                </InputGroupText>
              </InputGroupAddon>
            <Input type="text" name="code" value={this.state.code} placeholder="Código da conta no MercadoLivre" onChange={this.handleInputChange} />
            </InputGroup>  
          </CardBody>
          <CardFooter>
            <Row>
              <Col xm="12" sm="6" md="2">
            <Input type="submit" value=" Adicionar Conta " className="btn btn-success"></Input>
            </Col>
            <Col xm="12" sm="6" md="3">
            <Link to='/listacontas'>
              <Button className="btn btn-danger"> <i className="fa fa-arrow-left" ></i> Voltar </Button>
            </Link>
            </Col>
            </Row>
          </CardFooter>
          </Form>
        </Card>
      </div>
    );
  }
}

export default AdicionarConta;
