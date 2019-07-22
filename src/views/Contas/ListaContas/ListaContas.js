import React, { Component } from 'react';
import api from '../../../services/api';

import ReactLoading from 'react-loading';
import fotoPadrao from '../../../assets/img/avatars/user.svg';
import ApiInvoker from './../../../components/buttons/ApiInvoker';
import ButtonGroup from './../../../components/buttons/ButtonGroup';
import {Card, CardBody, CardFooter, CardHeader, Col, Row, Button } from 'reactstrap';
import Swal from 'sweetalert2';

class ListaContas extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fotoConta: fotoPadrao,
      accounts: [],
      account_id: null,
      isLoading: true,
      newName: null,
      total: 0,
    };
    
    this.openAuth = this.openAuth.bind(this);
  }

  componentDidMount() {
    this.fetchAccounts();
  }

  fetchAccounts = async () => {
    try {
      const res = await api.get('/accounts');
      if(res.status === 200) {
        this.setState({
          accounts: res.data.data,
          total: res.data.meta.total,
          isLoading: false
        });
      } else Swal.fire({html: res.data.message, type: 'warning', showCloseButton: true});
    }catch { Swal.fire({html: 'Erro ao carregar contas.', type: "error", showCloseButton: true}); }
  }

  openAuth() {
    window.open(
      "#/contas/adicionar",
      "SomeAuthentication",
      "width=972,height=660,modal=yes,alwaysRaised=yes"
    );
  }

  render() {
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
          {this.state.isLoading === false && this.state.total > 0 ? (
            this.state.accounts.map((acc, index)=> {
                return (
                    <Col xs="12" sm="4" md="3" key={acc.id} className="CardConta">
                      <Card className="card-accent-primary">
                        <CardHeader>
                          <span id={'nomeConta-'+index}>{acc.name}</span>
                          
                          <div className="float-right">
                              <ButtonGroup className="vertical-button-group">
                                <ApiInvoker className="dropdown-item"
                                  http="put"
                                  data={null}
                                  url={`/accounts/${acc.id}`}
                                  question="Informe o nome desajado"
                                  onSuccess="Renomeado com sucesso!"
                                  >Renomear
                                </ApiInvoker>
                                <ApiInvoker className="dropdown-item"
                                  http="get"
                                  data={null}
                                  url={`/accounts/${acc.id}/sync`}
                                  question={null}
                                  onSuccess="Contas sincronizadas."
                                  >Sincronizar
                                </ApiInvoker>
                                <ApiInvoker className="dropdown-item"
                                  http="delete"
                                  data={null}
                                  url={`/accounts/${acc.id}`}
                                  question={`Você tem certeza que deseja deletar a conta "${acc.name}"`}
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
