import React from 'react';
import ReactLoading from 'react-loading';
import { Col, Row, Button } from 'reactstrap';
import Carton from '../../../components/Card';
import { Data } from '../../../containers/data';
import fotoPadrao from '../../../assets/img/avatars/user.svg';
import { DropDown, Item } from './../../../components/buttons/ButtonGroup';

const ListaContas = () => {
  return (
    <Data.Consumer>
      {(provider) => {
        return(
          <>
            <div className="animated fadeIn">
              <Row>
                <a href="#/contas/adicionar" className="botaoAdicionarConta">
                  <Button className="btn btn-primary float-left">
                    <i className="fa fa-plus-circle" /> Adicionar Conta
                  </Button>
                </a>
              </Row>
              <Row>
                {provider.state.isLoading === true && provider.state.accountsFound <= 0 ? (
                  <div className="center">
                    <ReactLoading
                      type={"spinningBubbles"}
                      color={"#054785"}
                      height={100}
                      width={100}
                      className="spinnerStyle"
                    />
                  </div>) : (
                  provider.state.accounts.map((acc, index)=> {
                    return (
                      <Carton className="card-accent-primary" xs="12" sm="4" md="3" key={acc.id}
                        header={<>
                          <span id={'nomeConta-'+index}>{acc.name}</span>
                          <div className="float-right">
                            <DropDown className="vertical-button-group">
                              <Item className="dropdown-item"
                                http="put"
                                url={`/accounts/${acc.id}`}
                                ask="Informe o nome desajado"
                                >Renomear
                              </Item>
                              <Item className="dropdown-item"
                                http="get"
                                url={`/accounts/${acc.id}/sync`}
                                >Sincronizar
                              </Item>
                              <Item className="dropdown-item"
                                http="delete"
                                url={`/accounts/${acc.id}`}
                                ask={`Você tem certeza que deseja deletar a conta "${acc.name}"`}
                                >Excluir
                              </Item>
                            </DropDown>
                          </div>
                        </>}
                        >
                        <div className="imgConta">
                          <img src={!acc.external_data.thumbnail ? fotoPadrao : acc.external_data.thumbnail.picture_url } title={acc.external_name} className="img-full70 align-content-center" alt="Avatar"></img>
                        </div>
                        <div className="text-primary text-center nomeDuasLinhas" title={acc.external_name}>{acc.external_name}</div>
                        <div className="text-left">
                          <Row>
                            <p className="labelCard mr-1">
                              <i className="fa fa-envelope"></i>
                              E-mail: {acc.external_data.email}
                            </p>
                          </Row>
                          <Row>
                            <p className="labelCard mr-1">
                              <i className="fa fa-user"></i>
                              Usuário: {acc.external_data.nickname}
                            </p>
                          </Row>
                        </div>
                        <Row>
                          <Col md="6" sm="12">
                            <h5 className="tituloVendas">Vendas</h5>
                            <h5 className="text-success valores">{acc.external_data.seller_reputation.metrics.sales.completed}</h5>
                          </Col>
                          <Col md="6" sm="12">
                            <h5 className="tituloAnuncios">Anúncios</h5>
                            <h5 className="text-success valores">{acc.count_advertisings || '0'}</h5>
                          </Col>
                        </Row>
                      </Carton>
                    );
                  })
                )}
              </Row>
            </div>
          </>
        );
      }}
    </Data.Consumer>
  );
}

export default ListaContas;
