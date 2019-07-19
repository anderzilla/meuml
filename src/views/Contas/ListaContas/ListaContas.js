import React, { Component } from 'react';
import api from '../../../services/api';

import {Card, CardBody, CardFooter, CardHeader, Col, Row, Button } from 'reactstrap';
import fotoPadrao from '../../../assets/img/avatars/user.svg';
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2';
import ApiInvoker from './../../../components/buttons/ApiInvoker';
import ButtonGroup from './../../../components/buttons/ButtonGroup';

class ListaContas extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
      total: 0,
      fotoConta: fotoPadrao,
      newName: '',
      account_id: null,
    };
    
    this.openAuth = this.openAuth.bind(this);
  }

  componentDidMount() {
    this.fetchAccounts();
  }

  fetchAccounts() {
    api.get('/accounts')
        .then(res => {
          if (res.data.status === 'success') {
            if (res.data.meta.total !== 0) {
              this.setState({
                contas: res.data.data,
                isLoading: false,
              });
              console.log(this.state)
          } else {
            this.setState({
              noContas: true,
              isLoading: false
            });
          }
        
        } else {
          this.setState({
            noContas: true,
            isLoading: false
          });
        }
      })
      .catch(error => {
        !error.response
          ? this.setState({ tipoErro: error })
          : this.setState({ tipoErro: error.response.data.message });
        Swal.fire({
          html: "<p>" + this.state.tipoErro + "<br /></p>",
          type: "error",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: "Fechar"
        });
      });
    
  }

  openAuth() {
    window.open(
      "#/contas/adicionar",
      "SomeAuthentication",
      "width=972,height=660,modal=yes,alwaysRaised=yes"
    );
  }

  render() {
    const { isLoading, contas } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <a href="#/contas/adicionar" className="botaoAdicionarConta">
            <Button
              className="btn btn-primary float-left">
                <i className="fa fa-plus-circle" /> 
                Adicionar Conta
            </Button>
          </a>
        </Row>

        <Row>
          {!isLoading ? (
            contas.map((acc, index)=> {
                return (
                    <Col xs="12" sm="4" md="3" key={acc.id} className="CardConta">
                      <Card className="card-accent-primary">
                        <CardHeader>
                          <span id={'nomeConta-'+index}>{acc.name}</span>
                          
                          <div className="float-right">
                              <ButtonGroup className="primary">
                                <ApiInvoker
                                  url={'/accounts/' + acc.id}
                                  http="put"
                                  onSuccess="Renomeado com sucesso!"
                                  >Renomear
                                </ApiInvoker>
                                <ApiInvoker
                                  url={'/accounts/' + acc.id + '/sync'}
                                  http="get"
                                  onSuccess="Contas sincronizadas."
                                  >Sincronizar
                                </ApiInvoker>
                                <ApiInvoker
                                  url={'/accounts/' + acc.id}
                                  http="delete"
                                  onSuccess={`Conta ${acc.name} deletada com sucesso!`}
                                  >Excluir
                                </ApiInvoker>
                              </ButtonGroup>
                          </div>
                        </CardHeader>
                        <CardBody>
                          <div className="imgConta">
                          <img src={!acc.external_data.thumbnail ? this.state.fotoConta  : acc.external_data.thumbnail.picture_url } title={acc.external_name} className="img-full70 align-content-center" alt="Loja Teste"></img>
                          </div>
                          <div className="text-primary text-center nomeDuasLinhas" title={acc.external_name}>{acc.external_name}</div>
                          <div className="text-left">
                            <p className="labelCard"><i className="fa fa-envelope"></i> E-mail:</p>
                            {acc.external_data.email}<br/>
                            <p className="labelCard"><i className="fa fa-user"></i> Usuário:</p>
                            {acc.external_data.nickname}<br/>
                          </div>
                          
                        </CardBody>
                        <CardFooter>
                        <Row>
                          <Col md="6" sm="12">
                          <h5 className="tituloVendas">Vendas</h5>
                          <h5 className="text-success valores">{acc.external_data.seller_reputation.metrics.sales.completed}</h5>
                          </Col>
                          <Col md="6" sm="12">
                          <h5 className="tituloAnuncios">Anúncios</h5>
                          <h5 className="text-success valores">{acc.count_advertisings}</h5>
                          </Col>
                        </Row>
                      </CardFooter>
                    </Card>
                  </Col>
                );
              })
          ) : (
            <div className="center">
              <ReactLoading
                type={"spinningBubbles"}
                color={"#054785"}
                height={100}
                width={100}
                className="spinnerStyle"
              />
            </div>
          )}
        </Row>
      </div>
    );
  }
}

export default ListaContas;
