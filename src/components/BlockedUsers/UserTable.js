import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import data from './_data';
import * as fetch from './fetch';
import { BtnGroup } from '../buttons/ButtonGroup';

const { Provider, Consumer } = React.createContext();

class DataContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      numberOfAcc: 0,
    }
  }
  
  componentDidMount() {
    fetch.Accounts().then(res => {
      this.setState({
        accounts: res.accounts,
        numberOfAcc: res.numberOfAcc
      });
    });
  }

  updateBlacklist = id => {
    console.log(id)
    // fetch.BlackList(id)
    //   .then(res => this.setState({ blacklist: res }));
  }
  
  render(){
    return(
      <Provider 
        value={
          {
            state: this.state,
            updateBlacklist: () => this.updateBlacklist
          }
        }
        >{this.props.children}
      </Provider>
    );
  }
}

const ChooseAccBtn = () => {
  return(
    <Consumer>
      {context => {
        if(context.state.numberOfAcc === 1) {
          return(
            <button className="btn btn-success btn-sm"
              onClick={()=>context.updateBlacklist(context.state.accounts[0].id)}
              >{context.state.accounts[0].name}
            </button>
          );
        }
        else if(context.state.numberOfAcc === 0) {
          return <h6>Nenhuma conta do ML encontrada.</h6>
        } else {
          return(
            <BtnGroup>
              {context.state.accounts.map(acc => {
                return(
                  <button className="dropdown-item"
                    onClick={()=>context.updateBlacklist(acc.id)}
                    >{acc.name}
                  </button>
                );
              })}
            </BtnGroup>
          );
        }
      }}
    </Consumer>
  );
}

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.table = [] || Consumer.state.blacklist.data;
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
  }

  render() {
    return (
      <DataContainer>
        <div className="animated">
          <Card>
            <CardHeader>
              <h5>Escolha qual conta deseja carregar</h5>
              <ChooseAccBtn />
            </CardHeader>
            <CardBody>
              <BootstrapTable data={this.table} version="4" striped hover pagination search options={this.options}>
                <TableHeaderColumn dataField="idusuario" dataSort>id</TableHeaderColumn>
                <TableHeaderColumn isKey dataField="conta">Conta</TableHeaderColumn>
                <TableHeaderColumn dataField="tipo" dataSort>Tipo</TableHeaderColumn>
                <TableHeaderColumn dataField="motivo" dataSort>Motivo</TableHeaderColumn>
                <TableHeaderColumn dataField="descricao" dataSort>Descrição</TableHeaderColumn>
              </BootstrapTable>
            </CardBody>
          </Card>
        </div>
      </DataContainer>
    );
  }
}

export default DataTable;
