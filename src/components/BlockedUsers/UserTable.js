import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import data from './_data';

import api from '../../services/api';
import {Item, BtnGroup, DropDown} from '../buttons/ButtonGroup';
import { fetchAccounts, fetchBlackList } from './fetch';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.table = data.rows;
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    this.state = {
      accounts: [],
      numberOfAcc: 0,
      account_id: null,
    }
  }

  componentDidMount() {
    fetchAccounts().then(res => {
      this.setState({
        accounts: res.accounts,
        numberOfAcc: res.numberOfAcc
      });
    fetchBlackList(this.state.accounts[0]);
    });
  }

  defineAccount = e => {
    if(e !== undefined && e !== null) {
      console.log(e.target)
      const id = e.target.id;
      this.setState({ account_id: id });
      fetchBlackList();
    }
  }

  accountBtnGroup () {
    if(this.state.accounts.length <= 3) {
      this.state.accounts.map(acc => {
        return(
          <button className="btn btn-secondary btn-sm"
            id={acc.id}
            >{acc.name}
          </button>
        );
      });
    } else {
      this.state.accounts.map(acc => {
        return(
          <button className="dropdown-item"
            id={acc.id}
            >{acc.name}
          </button>
        );
      });
    }
  }

  render() {
    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <BtnGroup>
            {this.accountBtnGroup()}
            <button onClick={() => console.log(this.state)}>Console Log State</button>
            </BtnGroup>
          </CardHeader>
          <CardBody>
            <BootstrapTable data={this.table} version="4" striped hover pagination search options={this.options}>
              <TableHeaderColumn dataField="idusuario" dataSort>id</TableHeaderColumn>
              <TableHeaderColumn isKey dataField="conta">Conta</TableHeaderColumn>
              <TableHeaderColumn dataField="tipo" dataSort>Tipo</TableHeaderColumn>
              <TableHeaderColumn dataField="motivo" dataSort>Motivo</TableHeaderColumn>
              <TableHeaderColumn dataField="descricao" dataSort>Descrição</TableHeaderColumn>
              <TableHeaderColumn dataField="removeFromBlackList" dataSort>Desbloquear</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default DataTable;
