import React, { Component } from 'react';
import {Card, CardBody, CardFooter, CardHeader, Col, Row, Button, ButtonDropdown, ButtonGroup, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';
import axios from 'axios';
import sygnet from '../../../assets/img/brand/sygnet-logo.png';



class ListaContas extends Component {
  
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(2).fill(false),
      constas: [],
      isLoading: true,
      total: 0,
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }
  componentDidMount() {
    this.fetchAccounts();
  }

  sincronizar(account_id){
    axios.get(`https://api.app2.meuml.com/accounts/` + account_id + '/sync',
        { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
      console.log(res);
      if (res.data.status === 'success'){
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'success', showConfirmButton: true});
      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => {
      Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });
  }

  excluir(account_id){
    axios.delete(`https://api.app2.meuml.com/accounts/` + account_id,
        { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
      if (res.data.status === 'success'){
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'success', showConfirmButton: true, onClose: () => {
          window.location.reload();
        }});
      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => {
      Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });
  }

  renomear(account_id){
    const {value: novoNome} =  Swal.fire({
      title: 'Renomear Conta:',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Preencha o novo nome'
    }).then((result) => {
      
      console.log(result.value);

      if (result.value) {
        axios.put(`https://api.app2.meuml.com/accounts/` + account_id,
            {'name' : result.value},
            { headers: {"Authorization" : 'Bearer '+getToken()}},
        ).then(res => {
          console.log(res);
          if (res.data.status === 'success'){
            Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'success', showConfirmButton: true,
              onClose: () => {
                window.location.reload();
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
    });
  }

  fetchAccounts() {


    axios.get(`https://api.app2.meuml.com/accounts`,
        {
          headers:
              {
                "Authorization": 'Bearer ' + getToken()
              }
        })
        .then(res => {
          if (res.data.status === 'success') {
            const message = res.data.message;

            if (res.data.meta.total !== 0) {

              this.setState({
                contas: res.data.data,
                isLoading: false,
              });

            } else {
              Swal.fire({html: '<p>' + message + '</p>', type: 'info', showConfirmButton: true,
              onClose: () => {
                this.setState({
                  contas: res.data.data,
                  isLoading: false,
                });
              }
            });
            }
          } else {
            Swal.fire({html: '<p>' + res.data.message + '</p>', type: 'error', showConfirmButton: true,
            onClose: () => {
              this.setState({
                contas: res.data.data,
                isLoading: false,
              });
            }
            });
          }
        });
  }
  render() {


    const { isLoading, contas, error } = this.state;

    return (
      <div className="animated fadeIn">
        <h1>Contas
          <Link to="/contas/adicionar"> {/* ADICIONAR ROTA PARA O MECADO LIVRE OAUTH */}
          <Button className="btn btn-primary float-right"> <i className="fa fa-plus-circle" ></i> Adicionar Conta </Button>
          </Link>
        </h1>
        <Row>
          {!isLoading ? (
              contas.map(c=> {
                const { username, name, email } = this.state;
                return (
                    <Col xs="12" sm="6" md="3">
                      <Card className="card-accent-primary">
                        <CardHeader>
                          {c.name}
                          <div className="float-right">
                          <ButtonGroup>
                            <ButtonDropdown isOpen={this.state.dropdownOpen[1]} toggle={() => { this.toggle(1); }}>
                              <DropdownToggle caret color="primary" size="sm">
                                Opções
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem onClick={() => this.renomear(c.id)}>Renomear</DropdownItem>
                                <DropdownItem onClick={() => this.sincronizar(c.id)}>Sincronizar</DropdownItem>
                                <DropdownItem onClick={() => this.excluir(c.id)}>Excluir</DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
                          </ButtonGroup>
                          </div>
                        </CardHeader>
                        <CardBody>
                          <img src={!c.external_data.thumbnail.picture_url ? sygnet : c.external_data.thumbnail.picture_url} class="img-full70 align-content-center" alt="Loja Teste"></img>
                          <p class="text-primary h5 text-center nomeDuasLinhas">{c.external_name}</p>
                          <p class="text-left">
                            <i class="fa fa-envelope"></i> E-mail: {c.external_data.email}<br></br>
                            <i class="fa fa-user"></i> Usuário: <b>{c.external_data.nickname}</b>
                          </p>
                          
                        </CardBody>
                        <CardFooter>
                          <div class="float-right text-right">
                            <span class="text-success h5"></span> Anúncios
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                );
              })
          ) : (
              <h3>Loading...</h3>
          )}
        </Row>

      </div>
    );
  }
}

export default ListaContas;
