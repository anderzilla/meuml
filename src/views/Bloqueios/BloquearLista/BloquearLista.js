import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Form,
  Label,
  FormGroup,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Row
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../../auth";

import Picky, { components } from "react-picky";
import "react-picky/dist/picky.css";

import ReactLoading from "react-loading";
class BloquearLista extends Component {
  constructor(props) {
    super(props);

    this.toggleConta = this.toggleConta.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectMultipleOption = this.selectMultipleOption.bind(this);

    this.state = {
      accountName: "",
      blackListName: "",
      accounts: [],
      bids: "",
      questions: "",
      backlistList: [],
      isLoadingBlacklistList: true,
      isLoadingAccounts: true,
      accountId: null,
      value: null,
      arrayValue: [],
      isLoadingCadastro: false
    };

    this.nbloqueios = "2048";
    this.nlistas = "48";
    // ...
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  toggleConta() {
    this.setState(prevState => ({
      dropdownOpenConta: !prevState.dropdownOpenConta
    }));
  }

  componentDidMount() {
    this.fetchAccounts();
  }

  fetchAccounts() {
    this.url = process.env.REACT_APP_API_URL + `/accounts`;
    axios
      .get(this.url, { headers: { Authorization: "Bearer " + getToken() } })
      .then(res => {
        //console.log(res);
        if (res.status === 200) {
          const listaContas = [];
          const resContas = res.data.data;
          resContas.map((c, k) => {
            const { id, name } = this.state;
            listaContas.push({ value: c.id, label: c.name });
          });
          this.setState({
            accounts: listaContas,
            isLoadingAccounts: false
          });
          if (res.data.meta.total > 0) {
            if (res.data.meta.total === 1) {
              console.log(this.state.arrayValue);
              this.setState({
                arrayValue: [
                  { value: res.data.data[0].id, label: res.data.data[0].name }
                ],
                accountId: res.data.data[0].id
              });
              console.log(this.state.arrayValue);
            }
          } else {
            Swal.fire({
              html: "<p>" + res.data.message + "</p>",
              type: "error",
              showConfirmButton: true
            });
          }
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

  selectMultipleOption(value) {
    console.count("onChange");
    console.log("Val", value);
    this.setState({ arrayValue: value });
    //Prepara o array para ser manipulado
    const values = this.state;
    this.state.values = value;
    this.state.accountId = [];

    const valuesToRender = this.state.values.filter(val => val.value);
    const numRows = valuesToRender.length;

    const { accountId, accountName } = this.state;
    for (var i = 0; i < numRows; i++) {
      this.state.accountId.push(value[i].value);
    }
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  handleSubmit(event) {
    this.setState({ isLoadingCadastro: true });
    event.preventDefault();
    if (this.isEmpty(this.state.arrayValue)) {
      this.setState({ isLoadingCadastro: false });
      Swal.fire({
        html: "<p>Selecione uma conta para realizar o bloqueio!</p>",
        type: "error",
        showCloseButton: false,
        showConfirmButton: true,
        textConfirmButton: "OK"
      });
    } else {
      if (this.state.blackListName === "") {
        Swal.fire({
          html: "<p>Preencha o nome da lista para bloqueá-la</p>",
          type: "error",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: "Fechar"
        });
      } else {
        axios
          .post(
            process.env.REACT_APP_API_URL + `/blacklist/list/import`,
            {
              blacklist_name: this.state.blackListName,
              accounts: this.state.accountId,
              bids: !this.state.bids ? false : true,
              questions: !this.state.questions ? false : true
            },
            {
              headers: {
                Authorization: "Bearer " + getToken(),
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => {
            //console.log(res.data);
            const status = res.data.status;
            this.setState({ status });
            if (this.state.status === "success") {
              const message = res.data.message;
              this.setState({ message });
              Swal.fire({
                html: "<p>" + this.state.message + "</p>",
                type: this.state.status,
                showCloseButton: false,
                showConfirmButton: true,
                textConfirmButton: "OK"
              });
              this.setState({ isLoadingCadastro: false });
              window.location.href = "#/minhaslistasdebloqueios";
            } else {
              const message = res.data.message;
              this.setState({ message });
              Swal.fire({
                html: "<p>" + this.state.message + "</p>",
                type: "error",
                showConfirmButton: true
              });
            }
          })
          .catch(error => {
            this.setState({ isLoadingCadastro: false });
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
    }
  }

  render() {
    const {
      isLoading,
      isLoadingAccounts,
      isLoadingBlacklistList,
      backlistList,
      error,
      accounts
    } = this.state;
    const { isLoadingCadastro } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="10" xl="8">
            <Card className="card-accent-primary">
              <Form
                name="novaLista"
                onSubmit={this.handleSubmit}
                autoComplete="off"
              >
                <input type="hidden" value="autoCompleteOff" />
                <CardBody>
                  <Row>
                    <Col md="4" xs="12">
                      <FormGroup>
                        <Label for="idConta">Conta do Mercado Livre</Label>
                        {!isLoadingAccounts ? (
                          <Picky
                            value={this.state.arrayValue}
                            options={accounts}
                            onChange={this.selectMultipleOption}
                            className="multiSelBlockListOutros"
                            open={false}
                            valueKey="value"
                            labelKey="label"
                            multiple={true}
                            includeSelectAll={true}
                            includeFilter={true}
                            dropdownHeight={600}
                            placeholder="Selecione..."
                            manySelectedPlaceholder="%s Selecionados"
                            allSelectedPlaceholder="%s Selecionados"
                            selectAllText="Selecionar Todos"
                            filterPlaceholder="Filtrar por..."
                          />
                        ) : (
                          <h3>Carregando...</h3>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="8" xs="12">
                      <FormGroup>
                        <Label for="idUsusario">
                          Digite o Nome de uma lista abaixo para bloqueá-la{" "}
                        </Label>
                        <Input
                          type="text"
                          name="blackListName"
                          id="blackListName"
                          placeholder="Nome da lista"
                          autoComplete="off"
                          autoFocus={true}
                          required
                          onChange={this.handleInputChange}
                          value={this.state.blackListName}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12" xs="12">
                      <Row>
                        <Col md="4" xs="12">
                          <FormGroup>
                            <AppSwitch
                              className={"mx-1"}
                              variant={"pill"}
                              color={"danger"}
                              name="bids"
                              value="1"
                              onChange={this.handleInputChange}
                            />
                            <span className="textoSwitch">
                              {" "}
                              Bloquear para compras
                            </span>
                          </FormGroup>
                        </Col>
                        <Col md="8" xs="12">
                          <FormGroup>
                            <AppSwitch
                              className={"mx-1"}
                              variant={"pill"}
                              color={"danger"}
                              name="questions"
                              value="1"
                              onChange={this.handleInputChange}
                            />
                            <span className="textoSwitch">
                              Bloquear para perguntas
                            </span>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="text-right">
                  {!isLoadingCadastro ? (
                    <div>
                      <Button type="submit" size="sm" color="primary">
                        <i className="fa fa-file-text" /> Bloquear Lista
                      </Button>
                    </div>
                  ) : (
                    <ReactLoading
                      type={"spinningBubbles"}
                      color={"#054785"}
                      height={30}
                      width={30}
                      className="spinnerStyleMini"
                    />
                  )}
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BloquearLista;
