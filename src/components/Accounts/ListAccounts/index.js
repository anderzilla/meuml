import React from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactLoading from "react-loading";
import { Col, Row, Button } from "reactstrap";
import Carton from "../../../components/Card";
import { Data } from "../../../containers/data";
import { getToken } from '../../../services/auth';
import fotoPadrao from "../../../assets/img/avatars/user.svg";
import { DropDown, Item } from "./../../../components/buttons/ButtonGroup";

function ListaContas() {
  const syncAll = () => {
    axios
    .get(
      process.env.REACT_APP_API_URL + "/accounts/sync/all",
      { headers: { Authorization: "Bearer " + getToken() } }
    )
    .then(res => {
      if(res.data) {
        Swal.fire({
          html: `<p>Constas Sincronizadas!</p>`,
          type: 'success',
          showCloseButton: true
        });
      }
    })
    .catch(error => {
      Swal.fire({
        html: '<p>Contas Sincronizadas!',
        type: 'success',
        showCloseButton: true
      });
    });
  }

  const addAcc = () => {
    Swal.fire({
      type: 'warning',
      title: 'Atenção!',
      html: '<p>O sistema irá adicionar a conta do Mercado Livre que seu dispositivo está logado.</p>',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar'
    }).then(response => {
      if(response.value) this.props.history.push('/contas/adicionar');
    }).catch(error => console.log(error));
  }

  return (
    <Data.Consumer>
      {provider => {
        const fetchAccounts = () => provider.fetchAccounts();
        return (
          <>
            <div className="animated fadeIn">
              <Row>
                <Button
                  style={{ height: "37px" }}
                  onClick={() => addAcc()}
                  className="btn btn-dark float-left mr-1 mb-3"
                >
                  <i className="fa fa-plus-circle" /> Adicionar Conta
                </Button>
                <Button
                  style={{ height: "37px" }}
                  onClick={() => syncAll()}
                  className="btn btn-success"
                >
                  <i className="fa fa-check-circle" /> Sincronizar Tudo
                </Button>
              </Row>

              <Row>
                {provider.state.isLoading === true &&
                provider.state.accountsFound <= 0 ? (
                  <div className="center">
                    <ReactLoading
                      type={"spinningBubbles"}
                      color={"#054785"}
                      height={100}
                      width={100}
                      className="spinnerStyle"
                    />
                  </div>
                ) : (
                  provider.state.accounts.map((acc, index) => {
                    return (
                      <Carton
                        className="card-accent-primary"
                        xs="12"
                        sm="4"
                        md="3"
                        key={acc.id}
                        header={
                          <>
                            <span id={acc.name + index}>{acc.name}</span>
                            <div className="float-right">
                              <DropDown className="vertical-button-group">
                                <Item
                                  className="dropdown-item"
                                  http="put"
                                  url={`/accounts/${acc.id}`}
                                  ask="Informe o nome desajado"
                                  callback={() => fetchAccounts()}
                                >
                                  Renomear
                                </Item>
                                <Item
                                  className="dropdown-item"
                                  http="get"
                                  url={`/accounts/${acc.id}/sync`}
                                >
                                  Sincronizar
                                </Item>
                                <Item
                                  className="dropdown-item"
                                  callback={() => this.fetchAccounts()}
                                  http="delete"
                                  url={`/accounts/${acc.id}`}
                                  ask={`Você tem certeza que deseja deletar a conta "${
                                    acc.name
                                  }"`}
                                >
                                  Excluir
                                </Item>
                              </DropDown>
                            </div>
                          </>
                        }
                      >
                        <div className="imgConta">
                          <img
                            src={
                              !acc.external_data.thumbnail
                                ? fotoPadrao
                                : acc.external_data.thumbnail.picture_url
                            }
                            title={acc.external_name}
                            className="img-full70 align-content-center"
                            alt="Avatar"
                          />
                        </div>
                        <div
                          className="text-primary text-center nomeDuasLinhas"
                          title={acc.external_name}
                        >
                          {acc.external_name}
                        </div>
                        <div className="text-left">
                          <Row>
                            <p className="labelCard mr-1">
                              <i className="fa fa-envelope" />
                              E-mail: {acc.external_data.email}
                            </p>
                          </Row>
                          <Row>
                            <p className="labelCard mr-1">
                              <i className="fa fa-user" />
                              Usuário: {acc.external_data.nickname}
                            </p>
                          </Row>
                        </div>
                        <Row>
                          <Col md="6" sm="12">
                            <h5 className="tituloVendas">Vendas</h5>
                            <h5 className="text-success valores">
                              {
                                acc.external_data.seller_reputation.metrics
                                  .sales.completed
                              }
                            </h5>
                          </Col>
                          <Col md="6" sm="12">
                            <h5 className="tituloAnuncios">Anúncios</h5>
                            <h5 className="text-success valores">
                              {acc.total_advertisings}
                            </h5>
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
};

export default ListaContas;
