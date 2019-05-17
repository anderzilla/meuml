import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import motivos from './data/motivos';
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AppSwitch } from '@coreui/react'
import 'react-select/dist/react-select.min.css';
import './ValidationForms.css'

const options = motivos.BLOCK; //temporário para aparecer motivs no dropdown


class BloquearComprador extends Component {
  //Adaptar para os valores de motivos de bloqueio
  constructor(props) {
    super(props);
    //this.saveChanges = this.saveChanges.bind(this);
    //this.updateDimensions = this.updateDimensions.bind(this);

    this.motivos = {
      value: ['Não Pagou','Cancela compras'],
      windowWidth: window.innerWidth,
      orientation: 'vertical',
      openDirection: 'down'
    }
    this.state = {
      accountId : '',
	    bids : '',
	    customer_id : '', //ID DO USUÁRIO LOGADO
	    motive_description : '', 
	    motive_id : '',
      questions : '',
    }
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
    
    if (this.state.accountId === ''){
      alert('Preencha o ID da conta a ser bloqueada! Nã deixe campos em branco');
    }else if(this.state.motiveId === '' ){
      alert('Defina o motivo do bloqueio.');
    }else if (this.state.motiveDescription === '' ){
      alert('Descreva o motivo do bloqueio.');
    }else{
      axios.post(process.env.REACT_APP_API_URL + `/blacklist`, {
        "account_id": this.state.accountId,
	      "bids": this.state.bids,
	      "customer_id": "{{user_block_id}}",
	      "motive_description": this.state.motiveDescription, 
	      "motive_id": this.state.motiveId,
        "questions": this.state.questions,
      })
      .then(res => {
        //console.log(res.data);
        const status = res.data.status;
        this.setState({status});
        if (this.state.status === 'success'){
          const message = res.data.message;
          this.setState({message});
          Swal.fire({html:'<p>'+this.state.message+'</p>', type: this.state.status, showCloseButton: false, showConfirmButton: true, textConfirmButton:"OK"});
          this.props.history.push("/meusbloqueios");
        }else{
          const message = res.data.message;
          this.setState({message});
          Swal.fire({html:'<p>'+this.state.message+'</p>', type: 'error', showConfirmButton: true});
        }
      }).catch((error) => {  
        this.setState({tipoErro: "Erro desconhecido, tente novamente!"});
        Swal.fire({html:'<p>'+ error.response.data.message+'<br />'+ this.state.tipoErro +'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });
  }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="12">
            <Card className="card-accent-primary">
              <CardHeader>
                Bloquear
              </CardHeader>
              <CardBody>
              <Form onSubmit={this.handleSubmit} name='bloquearcomprador'>
              <Row>
              <Col xs="12" sm="6" md="3">
                <FormGroup>
                  <Label for="idUsusario">ID do Usuário</Label>
                  <Input type="text"
                    name="isUsuario"
                    id="isUsuario"
                    placeholder="ID do Usuário"
                    autoComplete="given-name"
                    autoFocus={true}
                    required
                    onChange={this.handleInputChange}
                    value={this.state.idusuario} />
                </FormGroup>
                <FormGroup>
                  <Select
                    name="motivosbloqueio"
                    value={this.motivos.value}
                    options={options}
                    onChange={this.saveChanges}
                    multi
                    placeholder="Selecione o motivo"
                  />
                </FormGroup>
                <FormGroup>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} name="compras" value="1"  /><span class="align-middle"> Bloquear para compras</span>
                </FormGroup>
                <FormGroup>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} name="perguntas" value="1" /> <span class="align-middle">Bloquear para perguntas</span>
                </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="9">
                <FormGroup row>
                  <Label htmlFor="textarea-input">Descrição do motivo</Label>
                  <Input type="textarea" name="descricaomotivo" id="descricaomotivo" rows="9"
                    placeholder="Descreva o motivo do Bloqueio..." />
                  </FormGroup>
                </Col>
                </Row>

                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-lock"></i> Bloquear</Button>
              </CardFooter>
            </Card>
          </Col>
          </Row>
         
      </div>
    )
  }
}

export default BloquearComprador;
