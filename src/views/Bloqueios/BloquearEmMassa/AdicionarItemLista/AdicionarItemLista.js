import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Table, Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//import BootstrapTable from 'react-bootstrap-table-next';
//import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { FancyGridReact, Grid } from 'fancygrid-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {getToken} from '../../../../auth';

import 'fancygrid/client/modules/sort.min';
import 'fancygrid/client/modules/dom.min';
import 'fancygrid/client/modules/edit.min';
import 'fancygrid/client/modules/grid.min';
import 'fancygrid/client/modules/selection.min';
import 'fancygrid/client/modules/menu.min';
import 'fancygrid/client/modules/exporter';
import 'fancygrid/client/modules/excel.min';

class AdicionarItemLista extends Component {

  constructor(props) {
    super(props);

    this.toggleConta = this.toggleConta.bind(this);
    this.toggleFade = this.toggleFade.bind(this);

    this.state = {
      dropdownOpenConta: false,
      account_id : '',
      account_name : '',
      accounts: [],
      isLoadingAccounts: true,
      bigLista : '',
    }



  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  toggleConta() {
    this.setState(prevState => ({
      dropdownOpenConta: !prevState.dropdownOpenConta
    }));
  }
  componentDidMount() {
    this.fetchAccounts();

  }

  // FANCY GRID
  getColumns() {
	  return [{
		  type: 'select'
	    },{
		  index: 'company',
		  title: 'Company',
		  type: 'string',
		  width: 100
		}, {
		  index: 'name',
		  title: 'Name',
		  type: 'string',
		  width: 100
		}, {
		  index: 'surname',
		  title: 'Sur Name',
		  type: 'string',
		  width: 100
		}, {
		  index: 'age',
		  title: 'Age',
		  type: 'number',
		  width: 100
		}];
	}

  getData() {
	  return [
		  {name: 'Ted', surname: 'Smith', company: 'Electrical Systems', age: 30},
		  {name: 'Ed', surname: 'Johnson', company: 'Energy and Oil', age: 35},
		  {name: 'Sam', surname: 'Williams',  company: 'Airbus', age: 38},
		  {name: 'Alexander', surname: 'Brown', company: 'Renault', age: 24},
		  {name: 'Nicholas', surname: 'Miller', company: 'Adobe', age: 33}
		];
	}

  getEvents() {
  return [{
    init: this.onGridInit
  }];
}

onGridInit = (grid) => {
  setTimeout(function(){
    grid.setTitle('New Title');
  }, 1000);
}





  fetchAccounts(){
    this.url = process.env.REACT_APP_API_URL + `/accounts`
    axios.get(this.url,
      { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
    //console.log(res);
    if (res.status === 200){
      this.setState({
        accounts: res.data.data,
        isLoadingAccounts: false
      });
      if(res.data.data.meta.total > 0){
        this.fetchBlacklist(res.data.data[0].id);
      }else{
      }
    }else{
      Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
    }
  }).catch(error => {
  });
  }


    fetchAccountSelected(account_id,account_name) {
      this.setState({accountId: account_id, accountName: account_name});
    }

  render() {

    const { isLoadingAccounts, error, accounts } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
        <CardHeader>
        <h5>Bloqueio em Massa</h5>
        </CardHeader>
        <CardBody>
        <FormGroup>
        <Label for="idConta">Conta do Mercado Livre</Label>
          {!isLoadingAccounts ? (
            <Dropdown id="idConta"  isOpen={this.state.dropdownOpenConta} toggle={() => {this.toggleConta();}}>
              <DropdownToggle caret color="outline-secondary" size="sm">
                Selecione uma Conta
              </DropdownToggle>
              <DropdownMenu>
                {accounts.map((c, k) => {
                  const { id, name } = this.state;
                  return (<DropdownItem onClick={() => this.fetchAccountSelected(c.id, c.name)}>{c.name}</DropdownItem>)
                })}
              </DropdownMenu>
              </Dropdown>
              ) : (
                <h3>Carregando...</h3>
              )}
              <div>{!this.state.accountId ? ('Selecione uma conta!') : ('Conta: '+this.state.accountName)}</div>
        </FormGroup>
        <Grid
        selModel='rows'
        theme='gray'
        height={400}
        width={500}
        defaults={{sortable: true}}
        trackOver={true}
        events={this.getEvents()}
			  columns={this.getColumns()}
			  data={this.getData()}>
        </Grid>



        <Table responsive>
          <thead>
            <tr>
              <th class="text-center">ID</th>
              <th class="text-center">Conta</th>
              <th class="text-center">Perguntas</th>
              <th class="text-center">Compras</th>
              <th class="text-center">Motivo</th>
              <th class="text-center">Descrição</th>
            </tr>
          </thead>
          <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tbody>
        </Table>
        </CardBody>
        <CardFooter></CardFooter>
        </Card>
      </div>
    );
  }
}

export default AdicionarItemLista;
