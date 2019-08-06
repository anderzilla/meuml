import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Button,
  ButtonDropdown,
  ButtonGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Swal from "sweetalert2";
import { getToken } from "../../../auth";
import axios from "axios";
import fotoPadrao from "../../../assets/img/avatars/user.svg";
import ReactLoading from "react-loading";

class ListaContas extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(50).fill(false),
      constas: [],
      isLoading: true,
      total: 0,
      fotoConta: fotoPadrao,
      noContas: true,
      statusMsg: !window.location.href.split('?')[1].split('=')[1]? 'success' : window.location.href.split('?')[1].split('=')[1], 
    };
    this.openAuth = this.openAuth.bind(this);

    
  }
  //motor do dropdown
  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray
    });
  }
  componentDidMount() {
    this.fetchAccounts();
  }
  //Sincronizar Conta
  sincronizar(account_id) {
    axios
      .get(
        process.env.REACT_APP_API_URL + `/accounts/` + account_id + "/sync",
        { headers: { Authorization: "Bearer " + getToken() } }
      )
      .then(res => {
        if (res.data.status === "success") {
          this.setState({statusMsg : 'ok'});
          Swal.fire({
            html: "<p>" + res.data.message + "</p>",
            type: "success",
            showConfirmButton: true
          });
        } else {
          Swal.fire({
            html: "<p>" + res.data.message + "</p>",
            type: "error",
            showConfirmButton: true
          });
        }
      })
      .catch(error => {
        Swal.fire({
          html: "<p>" + error.response.data.message + "</p>",
          type: "error",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: "Fechar"
        });
      });
  }
  //Excluir conta
  excluir(account_id) {
    axios
      .delete(process.env.REACT_APP_API_URL + `/accounts/` + account_id, {
        headers: { Authorization: "Bearer " + getToken() }
      })
      .then(res => {
        if (res.data.status === "success") {
          this.setState({statusMsg : 'ok'});
          Swal.fire({
            html: "<p>" + res.data.message + "</p>",
            type: "success",
            showConfirmButton: true,
            onClose: () => {
              this.fetchAccounts();
            }
          });
        } else {
          this.setState({statusMsg : 'ok'});
          Swal.fire({
            html: "<p>" + res.data.message + "</p>",
            type: "error",
            showConfirmButton: true
          });
          this.fetchAccounts();
        }
      })
      .catch(error => {
        Swal.fire({
          html: "<p>" + error.response.data.message + "</p>",
          type: "error",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: "Fechar"
        });
      });
  }
  //Renomear conta * somente para o sistema
  renomear(account_id, index) {
    const { value: novoNome } = Swal.fire({
      title: "Renomear Conta:",
      input: "text",
      showCancelButton: true,
      inputPlaceholder: "Preencha o novo nome"
    }).then(result => {
      if (result.value) {
        axios
          .put(
            process.env.REACT_APP_API_URL + `/accounts/` + account_id,
            { name: result.value },
            { headers: { Authorization: "Bearer " + getToken() } }
          )
          .then(res => {
            if (res.data.status === "success") {
              this.setState({statusMsg : 'ok'});
              document.getElementById("nomeConta-" + index).innerHTML = result.value;
            } else {
              Swal.fire({
                html: "<p>" + res.data.message + "</p>",
                type: "error",
                showConfirmButton: true
              });
            }
          })
          .catch(error => {
            Swal.fire({
              html: "<p>" + error.response.data.message + "</p>",
              type: "error",
              confirmButtonText: "Fechar"
            });
          });
      }
    });
  }

  fetchAccounts() {
    if (this.state.statusMsg === '400'){
      Swal.fire({
      html: "<p>Conta do Mercado Livre pertence a outro usuário<br /></p>",
      type: "error",
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "Fechar"
      });
    }else if(this.state.statusMsg === '409'){
      Swal.fire({
      html: "<p>Conta do Mercado Livre já cadastrada<br /></p>",
      type: "info",
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "Fechar"
      });
    }else if(this.state.statusMsg === 'addsuccess'){
      Swal.fire({
        html: "<p>Conta do Mercado Livre Adicionada com sucesso!<br /></p>",
        type: "success",
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: "OK"
        });
    }else if(this.state.statusMsg === 'lista' || this.state.statusMsg === 'ok'){
      this.setState({statusMsg : 'ok'});
    }else{
      this.setState({statusMsg : 'ok'});
    }

    axios
      .get(process.env.REACT_APP_API_URL + `/accounts`, {
        headers: { Authorization: "Bearer " + getToken() }
      })
      .then(res => {
        if (res.data.status === "success") {
          if (res.data.meta.total !== 0) {
            this.setState({
              noContas: false,
              contas: res.data.data,
              isLoading: false
            });
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
    const { isLoading, contas} = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <a href="#/contas/adicionar" className="botaoAdicionarConta">
            <Button className="btn btn-primary float-left">
              {" "}
              <i className="fa fa-plus-circle" /> Adicionar Conta{" "}
            </Button>
          </a>
        </Row>
        <Row>
          {!isLoading ? (
            this.state.noContas ? (
              <div className="alert alert-info fade show">
                Nenhuma conta cadastrada!
              </div>
            ) : (
              contas.map((c, k) => {
                return (
                  <Col xs="12" sm="4" md="3" key={c.id} className="CardConta">
                    <Card className="card-accent-primary">
                      <CardHeader>
                        <span id={"nomeConta-" + k}>{c.name}</span>
                        <div className="float-right">
                          <ButtonGroup>
                            <ButtonDropdown
                              isOpen={this.state.dropdownOpen[k]}
                              toggle={() => {
                                this.toggle(k);
                              }}
                            >
                              <DropdownToggle caret color="primary" size="sm">
                                Opções
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem
                                  onClick={() => this.renomear(c.id, k)}
                                >
                                  Renomear
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => this.sincronizar(c.id)}
                                >
                                  Sincronizar
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => this.excluir(c.id)}
                                >
                                  Excluir
                                </DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
                          </ButtonGroup>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <div className="imgConta">
                          <img
                            src={
                              !c.external_data.thumbnail
                                ? this.state.fotoConta
                                : c.external_data.thumbnail.picture_url
                            }
                            title={c.external_name}
                            className="img-full70 align-content-center"
                            alt="Loja Teste"
                          />
                        </div>
                        <div
                          className="text-primary text-center nomeDuasLinhas"
                          title={c.external_name}
                        >
                          {c.external_name}
                        </div>
                        <div className="text-left">
                          <p className="labelCard">
                            <i className="fa fa-envelope" /> E-mail:
                          </p>
                          {c.external_data.email}
                          <br />
                          <p className="labelCard">
                            <i className="fa fa-user" /> Usuário:
                          </p>
                          {c.external_data.nickname}
                          <br />
                        </div>
                      </CardBody>
                      <CardFooter>
                        <Row>
                          <Col md="6" sm="12">
                            <h5 className="tituloVendas">Vendas</h5>
                            <h5 className="text-success valores">
                              {
                                c.total_orders
                              }
                            </h5>
                          </Col>
                          <Col md="6" sm="12">
                            <h5 className="tituloAnuncios">Anúncios</h5>
                            <h5 className="text-success valores">
                              {c.total_advertisings}
                            </h5>
                          </Col>
                        </Row>
                      </CardFooter>
                    </Card>
                  </Col>
                );
              })
            )
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
