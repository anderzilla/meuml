import React, { Component } from "react";
import Swal from "sweetalert2";
import * as fetch from "./fetch";
import { BtnGroup } from "../buttons/ButtonGroup";
import { Card, CardHeader, CardBody } from "reactstrap";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
const { Provider, Consumer } = React.createContext();

class DataContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      blacklist: [],
      message: "",
      numberOfAcc: 0,
      paginationSize: 0,
      status: null
    };
  }

  componentDidMount() {
    fetch.Accounts().then(res => {
      this.setState({
        accounts: res.accounts,
        numberOfAcc: res.numberOfAcc
      });
    });
  }

  updateBlacklist = async id => {
    try {
      const response = await fetch.BlackList(id);
      if (response !== undefined) {
        const blacklist = response.data;
        const paginationSize = response.meta.total;
        const status = response.status;
        const message = response.message;
        this.setState({ blacklist, paginationSize, status, message });
        localStorage.setItem('blacklist', blacklist[0].account_id);
        localStorage.setItem('paginationSize', paginationSize);
      }
    } catch (error) {
      Swal.fire({
        html: `<p>${error}</p>`,
        type: "error",
        showCloseButton: true
      });
    }
  };

  render() {
    return (
      <Provider
        value={{
          state: this.state,
          updateBlacklist: id => this.updateBlacklist(id),
          handleState: ()=> this.props.handleState
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const ChooseAccBtn = () => {
  return (
    <Consumer>
      {context => {
        if (context.state.numberOfAcc === 1) {
          return (
            <button
              className="btn btn-success btn-sm"
              onClick={() =>
                context.updateBlacklist(context.state.accounts[0].id)
              }
            >
              {context.state.accounts[0].name}
            </button>
          );
        } else if (context.state.numberOfAcc === 0) {
          return <h6>Nenhuma conta do ML encontrada.</h6>;
        } else {
          return (
            <BtnGroup>
              {context.state.accounts.map(acc => {
                return (
                  <button
                    className="dropdown-item"
                    onClick={() => context.updateBlacklist(acc.id)}
                  >
                    {acc.name}
                  </button>
                );
              })}
            </BtnGroup>
          );
        }
      }}
    </Consumer>
  );
};

class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blacklist: this.blacklist,
      paginationSize: this.paginationSize
    };

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    };
  }

  render() {
    return (
      <DataContainer>
        <div className="animated">
          <Card>
            <CardHeader>
              <h5>Escolha uma conta:</h5>
              <ChooseAccBtn />
            </CardHeader>
            <CardBody>
              <Consumer>
                {(provider) => { return(
                <BootstrapTable
                  data={this.table}
                  version="4"
                  striped
                  hover
                  pagination
                  search
                  options={this.options}
                  data={provider.state.blacklist}
                  paginationSize={provider.state.paginationSize}
                >
                  <TableHeaderColumn dataField="account_id" dataSort>
                    Id da Conta
                  </TableHeaderColumn>
                  <TableHeaderColumn isKey dataField="customer_id">
                    Id do Usuário
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="motive_id" dataSort>
                    Tipo do Bloqueio
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="motive_description" dataSort>
                    Descrição do Motivo
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="bids" dataSort>
                    P/ Compras
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="questions" dataSort>
                    P/ Perguntas
                  </TableHeaderColumn>
                </BootstrapTable>
                )}}
              </Consumer>
            </CardBody>
          </Card>
        </div>
      </DataContainer>
    );
  }
}

export default DataTable;
