import React, { Component } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    ButtonDropdown,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../../auth";
import { AppSwitch } from "@coreui/react";
import "react-select/dist/react-select.min.css";
import Picky from "react-picky";
import "react-picky/dist/picky.css";
import ReactLoading from "react-loading";

class BloquearComprador extends Component {
    //Adaptar para os valores de motivos de bloqueio
    constructor(props) {
        super(props);

        this.toggleConta = this.toggleConta.bind(this);
        this.toggleMotivo = this.toggleMotivo.bind(this);
        this.toggleFade = this.toggleFade.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
        this.changeBids = this.changeBids.bind(this);
        this.changeQuestions = this.changeQuestions.bind(this);

        this.state = {
            dropdownOpenConta: false,
            dropdownOpenMotivo: false,
            accountId: "",
            accountName: "",
            accountsSelected: "",
            bids: false,
            customer_id: "",
            motivoBloqueio: "",
            motiveDescription: "",
            motiveId: "",
            questions: false,
            accounts: [],
            motivos: [],
            isLoadingAccounts: true,
            isLoadingMotivos: true,
            tipoUser: "",
            valueID: "",
            accountList: [],
            selectedOption: null,
            bloqueios: [],
            value: null,
            arrayValue: [],
            isLoadingCadastro: false
        };
    }

    toggleFade() {
        this.setState(prevState => {
            return { fadeIn: !prevState };
        });
    }

    toggleConta() {
        this.setState(prevState => ({
            dropdownOpenConta: !prevState.dropdownOpenConta
        }));
    }

    toggleMotivo() {
        this.setState(prevState => ({
            dropdownOpenMotivo: !prevState.dropdownOpenMotivo
        }));
    }

    componentDidMount() {
        this.fetchAccounts();
        this.fetchMotivos();
    }

    fetchAccounts() {
        this.url = process.env.REACT_APP_API_URL + `/accounts`;
        axios
            .get(this.url, { headers: { Authorization: "Bearer " + getToken() } })
            .then(res => {
                if (res.status === 200) {
                    const listaContas = [];
                    const resContas = res.data.data;
                    resContas.map(c => {
                        listaContas.push({ value: c.id, label: c.name });
                    });
                    this.setState({
                        accounts: listaContas,
                        isLoadingAccounts: false
                    });
                    if (res.data.meta.total > 0) {
                        if (res.data.meta.total === 1) {
                            this.setState({arrayValue : [
                                    { value: res.data.data[0].id, label: res.data.data[0].name }
                                ]});
                            this.fetchBlacklist(res.data.data[0].id);
                        }
                    } else {
                        Swal.fire({
                            title: "",
                            text: "Você precisa ter ao menos 1 conta!",
                            type: "info",
                            showCancelButton: false,
                            confirmButtonColor: "#366B9D",
                            confirmButtonText: "OK",
                            confirmButtonClass: "btn btn-success",
                            buttonsStyling: true
                        }).then(function() {
                            window.location.href = "#/listacontas?status=lista";
                        });
                    }
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

    selectMultipleOption(value) {
        this.setState({ arrayValue: value });
    }

    fetchMotivos() {
        this.url = process.env.REACT_APP_API_URL + `/blacklist/motives`;
        axios
            .get(this.url, { headers: { Authorization: "Bearer " + getToken() } })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        motivos: res.data.data,
                        isLoadingMotivos: false
                    });
                    if (res.data.data.meta.total > 0) {
                        this.fetchMotivoSelecionado(res.data.data[0].id);
                    } else {
                    }
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
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            isLoadingCadastro: false
        });
    }

    changeBids(status){
        (status=== false)? this.state.bids = true: this.state.bids = false;
    }
    changeQuestions(status){
        (status=== false)? this.state.questions = true: this.state.questions = false;
    }

    handleChange = selectedOption => {
        this.setState({ isLoadingCadastro: false });
        this.setState({ selectedOption });
    };
    fetchBlacklist(accountId, accountName) {
        this.setState({ accountId: accountId, accountName: accountName });
    }
    fetchMotivoSelecionado(motiveId, motiveName, motiveDescription) {
        this.setState({
            motiveId: motiveId,
            motiveName: motiveName,
            motiveDescription: motiveDescription
        });
    }
    fetchTipoUser(tipo) {
        this.setState({ tipoUser: tipo, customer_id: "" });
    }
    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    }
    handleSubmit(event) {
        this.setState({ isLoadingCadastro: true });

        this.setState({ bloqueios: [] });
        event.preventDefault();
        //customer_id
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
            if (this.state.customer_id === "") {
                this.setState({ isLoadingCadastro: false });
                Swal.fire({
                    html: "<p>Preencha o id ou usuário do comprador.</p>",
                    type: "error",
                    showCloseButton: false,
                    showConfirmButton: true,
                    textConfirmButton: "OK"
                });
            } else if (this.state.motiveId === "") {
                this.setState({ isLoadingCadastro: false });
                Swal.fire({
                    html: "<p>Defina o motivo do bloqueio.</p>",
                    type: "error",
                    showCloseButton: false,
                    showConfirmButton: true,
                    textConfirmButton: "OK"
                });
            } else {
                this.state.arrayValue.map(s => {
                    this.state.bloqueios.push({
                        account_id: s.value,
                        bids: this.state.bids,
                        customer_id: this.state.customer_id,
                        motive_description: this.state.motivoBloqueio,
                        motive_id: this.state.motiveId,
                        questions: this.state.questions
                    });
                });

                axios
                    .post(
                        process.env.REACT_APP_API_URL + `/blacklist`,
                        this.state.bloqueios,
                        {
                            headers: {
                                Authorization: "Bearer " + getToken(),
                                "Content-Type": "application/json"
                            }
                        }
                    )
                    .then(res => {
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
                            this.props.history.push("/meusbloqueios");
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
        const { isLoadingCadastro } = this.state;
        const {
            isLoadingAccounts,
            isLoadingMotivos,
            accounts,
            motivos,
        } = this.state;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12" md="12" xl="8">
                        <Card className="card-accent-primary">
                            <Form
                                onSubmit={this.handleSubmit}
                                name="bloquearcomprador"
                                autoComplete="off"
                            >
                                <input type="hidden" value="autoCompleteOff" />
                                <CardBody>
                                    <Row>
                                        <Col xs="12" sm="6" md="6">
                                            <FormGroup>
                                                <Label for="idConta">Selecione as Contas:</Label>
                                                {!isLoadingAccounts ? (
                                                    <Picky
                                                        value={this.state.arrayValue}
                                                        options={accounts}
                                                        className="multiSelBlockUser"
                                                        onChange={this.selectMultipleOption}
                                                        open={false}
                                                        valueKey="value"
                                                        labelKey="label"
                                                        multiple={true}
                                                        required
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
                                            <FormGroup>
                                                <Label for="idUsusario">
                                                    ID ou Apelido do comprador
                                                </Label>
                                                <InputGroup className="idApelido">
                                                    <InputGroupAddon addonType="prepend">
                                                        <ButtonDropdown
                                                            direction="right"
                                                            className="dropTipoComprador"
                                                            isOpen={this.state.first}
                                                            toggle={() => {
                                                                this.setState({ first: !this.state.first });
                                                            }}
                                                        >
                                                            <DropdownToggle caret color="primary" size="md">
                                                                {!this.state.tipoUser
                                                                    ? "Selecione"
                                                                    : this.state.tipoUser}
                                                            </DropdownToggle>
                                                            <DropdownMenu
                                                                className={this.state.first ? "show" : ""}
                                                            >
                                                                <DropdownItem
                                                                    onClick={() => this.fetchTipoUser("ID")}
                                                                >
                                                                    ID
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    onClick={() => this.fetchTipoUser("Apelido")}
                                                                >
                                                                    Apelido
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </ButtonDropdown>
                                                    </InputGroupAddon>
                                                    <Input
                                                        type="text"
                                                        name="customer_id"
                                                        id="idUsuario"
                                                        placeholder={
                                                            this.state.tipoUser === "ID"
                                                                ? "Digite o ID do comprador"
                                                                : "Digite o Apelido do comprador"
                                                        }
                                                        autoComplete="off"
                                                        autoFocus={true}
                                                        color="outline-dark"
                                                        required
                                                        value={this.state.customer_id}
                                                        onChange={event => {
                                                            if (this.state.tipoUser === "ID") {
                                                                if (isNaN(Number(event.target.value))) {
                                                                    return;
                                                                } else {
                                                                    this.setState({
                                                                        customer_id: event.target.value
                                                                    });
                                                                }
                                                            } else {
                                                                this.setState({
                                                                    customer_id: event.target.value
                                                                });
                                                            }
                                                        }}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="idMotivo">
                                                    Selecione o motivo do bloqueio
                                                </Label>
                                                {!isLoadingMotivos ? (
                                                    <Dropdown
                                                        direction="right"
                                                        id="idMotivo"
                                                        className="dropAbaixo2"
                                                        isOpen={this.state.dropdownOpenMotivo}
                                                        toggle={() => {
                                                            this.toggleMotivo();
                                                        }}
                                                    >
                                                        <DropdownToggle caret color="primary" size="md">
                                                            {!this.state.motiveId
                                                                ? "Selecione um motivo!"
                                                                : this.state.motiveId +
                                                                " - " +
                                                                this.state.motiveName}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            {motivos.map((m, key) => {
                                                                return (
                                                                    <DropdownItem
                                                                        key={m.key}
                                                                        onClick={() =>
                                                                            this.fetchMotivoSelecionado(
                                                                                m.key,
                                                                                m.name,
                                                                                m.description
                                                                            )
                                                                        }
                                                                    >
                                                                        {m.key} - {m.name}
                                                                    </DropdownItem>
                                                                );
                                                            })}
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                ) : (
                                                    <h3>Carregando...</h3>
                                                )}
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="6" md="6">
                                            <FormGroup>
                                                <Label for="motivoBloqueio">
                                                    Descreva o motivo do bloqueio <em>(opcional)</em>
                                                </Label>
                                                <Input
                                                    type="textarea"
                                                    name="motivoBloqueio"
                                                    id="motivoBloqueio"
                                                    rows="3"
                                                    color="outline-dark"
                                                    onChange={this.handleInputChange}
                                                    value={this.state.motivoBloqueio}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <AppSwitch
                                                    className={"mx-1"}
                                                    variant={"pill"}
                                                    color={"danger"}
                                                    name="bids"
                                                    checked = {this.state.bids}
                                                    onChange={()=>this.changeBids(this.state.bids)}
                                                />
                                                <span className="textoSwitch">
                          {" "}
                                                    Bloquear para compras
                        </span>
                                            </FormGroup>
                                            <FormGroup>
                                                <AppSwitch
                                                    className={"mx-1"}
                                                    variant={"pill"}
                                                    color={"danger"}
                                                    name="questions"
                                                    checked = {this.state.questions}
                                                    onChange={()=>this.changeQuestions(this.state.questions)}
                                                />
                                                <span className="textoSwitch">
                          Bloquear para perguntas
                        </span>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter className="text-right">
                                    {!isLoadingCadastro ? (
                                        <div>
                                            <Button type="submit" size="md" color="primary">
                                                <i className="fa fa-lock" /> Bloquear
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
export default BloquearComprador;
