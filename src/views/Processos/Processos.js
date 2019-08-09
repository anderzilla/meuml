import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Collapse,
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  Row
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Moment from "moment";
import ReactLoading from "react-loading";
import { getToken } from "../../auth";


class Processos extends Component {
  constructor(props) {
    super(props);

    this.toggleAccordion = this.toggleAccordion.bind(this);

    this.state = {
      totalDataSize: 0,
      sizePerPage: 50,
      activePage: 1,
      filter: "",
      paginate: "",
      processos: [],
      isLoadingProcessos: true,
      tempoProcesso: "",
      listaProcessos: [],
      accordion: [],
      fadeIn: true,
      timeout: 300,
      isLoading: true,
      sublista: "",
      fim: "",
      cria: "",
      timeX: "",
      numeros: "",
      tx1: "",
      tx2: "",
      noProcessos: false
    };

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 5,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    };
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state
    });
  }

  fetchProcess() {
    this.url = process.env.REACT_APP_API_URL + `/process?offset=0&limit=50`;
    axios
      .get(this.url, { headers: { Authorization: "Bearer " + getToken() } })
      .then(res => {
        if (res.status === 200) {

          const data = res.data.data;


          for (var i = 0; i < data.length; i++) {
            var tituloProcesso = data[i].tool_name.replace("Blacklist", "Bloqueio");
            var andamento =
                data[i].item_finished === null
                    ? 0
                    : data[i].item_finished + "/" + data[i].item_total;


            if(data[i].process_items.length > 0){
              console.log('this.state.listaProcessos')
              this.state.accordion.push(false);
              this.state.listaProcessos.push({
                titulo: tituloProcesso,
                andamento: andamento,
                criacao: data[i].date_created === null ? null : Moment.utc(data[i].date_created).format("DD/MM/YYYY HH:mm"),
                conclusao:
                    data[i].date_finished === null
                        ? data[i].date_finished
                        : Moment.utc(data[i].date_finished).format("DD/MM/YYYY HH:mm"),
                subprocessos: data[i].process_items
              });
            }else{
              console.log('else')
            }
          }

          this.setState({
            processos: this.state.listaProcessos,
            isLoadingProcessos: false,
            isLoadingAtualiza: false,
          });

        } else {
          Swal.fire({
            html: "<p>" + res.data.message + "</p>",
            type: "error",
            showConfirmButton: true
          });
        }
      })
      .catch(error => {});
  }

  isEmpty(obj) {
    return obj.length > 0;
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  showData(data) {
    const tituloProcesso = data.tool_name.replace("Blacklist", "Bloqueio");
    const andamento =
      data.item_finished === null
        ? 0
        : data.item_finished + "/" + data.item_total;

    if(data.process_items.length > 0){
      this.state.listaProcessos.push({
        titulo: tituloProcesso,
        andamento: andamento,
        criacao: Moment.utc(data.date_created).format("DD/MM/YYYY HH:mm"),
        conclusao:
            data.date_finished === null
                ? data.date_finished
                : Moment.utc(data.date_finished).format("DD/MM/YYYY HH:mm"),
        subprocessos: data.process_items
      })
    }else{
      console.log(data)
    }
  }

  preFormatedext(text) {
    const thenum = text.replace(/^\D+/g, "");
    !thenum
      ? (this.state.numeros = "")
      : (this.state.numeros = "#" + thenum.match(/\d+/)[0]);
    if (this.state.numeros !== "") {
      const explode = text.split(this.state.numeros);
      this.state.tx1 = explode[0];
      this.state.tx2 = explode[1];
    } else {
      this.state.tx1 = text;
      this.state.tx2 = "";
    }

    //console.log(newText);
    //return newText;
  }

  atualizaProcessos() {
    this.setState({
      isLoadingProcessos: true,
      process: [],
      process_items: []
    });
    this.fetchProcess();
  }

  componentDidMount() {
    this.fetchProcess();
  }
  render() {
    const { isLoadingProcessos, processos } = this.state;
    console.log('processos ', processos );
    console.log('processos ', isLoadingProcessos );
    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <Row>
              <Col md="8" />
              <Col md="4" className="text-right">
                  <Button color="primary" className="btn-sm" onClick={() => this.atualizaProcessos()}>
                    <i className="fa fa-refresh"></i> Atualizar
                  </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            {!isLoadingProcessos ? (
              <div id="accordion">
                {processos.length < 1? (
                  <div className="alert alert-info fade show">
                    Nenhum Processo encontrado!
                  </div>
                ) : (
                  processos.map((p, k) => {
                    console.log('pppppp',p);
                    console.log('kkkkkk',k);
                    return !this.isEmpty(p) ? (
                      <Card className="mb-0 listaProcessos " key={k}>
                        <CardHeader
                          id={"heading" + k}
                          className="divListaProcessos"
                        >
                          <Row>
                            <Col sm="6">
                              <Button
                                block
                                color="ghost-link"
                                size="sm"
                                className="text-left m-0 p-0 headerListaProcessos"
                                onClick={() => this.toggleAccordion(k)}
                                aria-expanded={this.state.accordion[k]}
                                aria-controls={"collapse" + k}
                              >
                                <h5 className="tituloProcessos">{p.titulo}</h5>
                                <span>{p.andamento} concluídos</span>
                              </Button>
                            </Col>
                            <Col sm="6" md="6" className="text-right">
                              <span className="m-0 p-0 text-right">
                                <sup>
                                  {p.conclusao === null ||
                                  p.conslusão === "Invalid date"
                                    ? "iniciado em " + p.criacao + " "
                                    : "finalizado em " + p.conclusao + " "}
                                  <i className="fa fa-clock-o" />
                                </sup>
                              </span>
                            </Col>
                          </Row>
                        </CardHeader>
                        <Collapse
                          isOpen={this.state.accordion[k]}
                          data-parent="#accordion"
                          id={"collapse" + k}
                          aria-labelledby={"heading" + k}
                        >
                          <CardBody className="subItensProcessos">
                            <ListGroup className="listaSubItem">
                              {p.subprocessos.map((d, k) => {
                                this.preFormatedext(d.message);
                                const tituloSubItem = d.tool_name.replace(
                                  "Blacklist",
                                  "Bloqueio"
                                );
                                return (
                                  <ListGroupItem key={k}>
                                    {d.status === 0 ? (
                                      <i className="fa fa-circle redBall" />
                                    ) : (
                                      ""
                                    )}
                                    {d.status === 1 ? (
                                      <i className="fa fa-circle greenBall" />
                                    ) : (
                                      ""
                                    )}
                                    {d.status === 2 ? (
                                      <i className="fa fa-circle yellowBall" />
                                    ) : (
                                      ""
                                    )}
                                    {d.status === 3 ? (
                                      <i className="fa fa-circle greyBall" />
                                    ) : (
                                      ""
                                    )}
                                    {d.cause !== null ? (
                                      <span>
                                        {" "}
                                        {this.state.tx1}{" "}
                                        <b>{this.state.numeros}</b>{" "}
                                        {this.state.tx2}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </ListGroupItem>
                                );
                              })}
                            </ListGroup>
                          </CardBody>
                        </Collapse>
                      </Card>
                    ) : (
                      ""
                    );
                  })
                )}
              </div>
            ) : (
              <ReactLoading
                type={"spinningBubbles"}
                color={"#054785"}
                height={100}
                width={100}
                className="spinnerStyle"
              />
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Processos;
