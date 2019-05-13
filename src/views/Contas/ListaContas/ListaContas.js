import React, { Component } from 'react';
import {Card, CardBody, CardFooter, CardHeader, Col, Row, Button, ButtonDropdown, ButtonGroup, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';
import axios from 'axios';
import sygnet from '../../../assets/img/brand/sygnet-logo.png';
import fotoPadrao from '../../../assets/img/avatars/user.svg';



class ListaContas extends Component {
  
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(2).fill(false),
      constas: [],
      isLoading: true,
      total: 0,
      fotoConta: fotoPadrao,
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

  renomear(account_id,index){
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
            document.getElementById('nomeConta-'+index).innerHTML = result.value;
          }else{
            Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true,})
          }
        }).catch(error => {
          Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', confirmButtonText: 'Fechar'});
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
    let j = 0;
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
              contas.map((c, index)=> {
                const { username, name, email, id } = this.state;

console.log(contas)

                return (
                    <Col sm="12" md="3" key={c.id}>
                      <Card className="card-accent-primary">
                        <CardHeader>
                          <span id={'nomeConta-'+index}>{c.name}</span>
                          <div className="float-right">
                          <ButtonGroup>
                            <ButtonDropdown isOpen={this.state.dropdownOpen[index]} toggle={() => { this.toggle(index); }}>
                              <DropdownToggle caret color="primary" size="sm">
                                Opções
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem onClick={() => this.renomear(c.id,index)}>Renomear</DropdownItem>
                                <DropdownItem onClick={() => this.sincronizar(c.id)}>Sincronizar</DropdownItem>
                                <DropdownItem onClick={() => this.excluir(c.id)}>Excluir</DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
                          </ButtonGroup>
                          </div>
                        </CardHeader>
                        <CardBody>
                          <div className="imgConta">
                          <img src={!c.external_data.thumbnail ? this.state.fotoConta  : c.external_data.thumbnail.picture_url } title={c.external_name} className="img-full70 align-content-center" alt="Loja Teste"></img>
                          </div>
                          <p className="text-primary text-center nomeDuasLinhas" title={c.external_name}>{c.external_name}</p>
                          <p className="text-left">
                            <div className="labelCard"><i className="fa fa-envelope"></i> E-mail:</div>
                            {c.external_data.email}<br/>
                            <div className="labelCard"><i className="fa fa-user"></i> Usuário:</div>
                            {c.external_data.nickname}<br/>
                          </p>
                          
                        </CardBody>
                        <CardFooter>
                        <Row>
                          <Col md="6" sm="12">
                          <h5 className="tituloVendas">Vendas</h5>
                          <h5 className="text-success valores">{c.external_data.seller_reputation.metrics.sales.completed}</h5>
                          </Col>
                          <Col md="6" sm="12">
                          <h5 className="tituloAnuncios">Anúncios</h5>
                          <h5 className="text-success valores">{c.count_advertisings}</h5>
                          </Col>
                        </Row>
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
