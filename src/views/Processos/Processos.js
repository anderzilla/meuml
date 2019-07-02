import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Moment from 'react-moment';
import { getToken } from '../../auth';
import data from './_data';


class Processos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalDataSize: 0,
      sizePerPage: 50,
      activePage: 1,
      filter: '',
      paginate:'',
      processos: [],
      isLoadingProcessos: true,
    };
    
    this.table = data.rows;
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 5,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }

  }

  fetchProcess()
  {
    this.url = process.env.REACT_APP_API_URL + `/process?offset=50&limit=50`
    axios.get(this.url,
      { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
    if (res.status === 200){
      const listaProcessos = [];
      const resProcessos = res.data.data;
      console.log(resProcessos);
      resProcessos.map(p => {
        listaProcessos.push({
          'andamento': (p.item_finished === null)? 0 : p.item_finished +' de '+ p.item_total, 
          'dataInicio': p.date_created, 
          'process_items': p.process_items,
          });
          console.log(p.date_created);
      })
      console.log(listaProcessos);
      this.setState({
        processos: listaProcessos,
        isLoadingProcessos: false,

      });

    }else{
      Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
    }
  }).catch(error => {
  });
  }


  componentDidMount() {
    this.fetchProcess();
  }

  

  render() {

    const {isLoadingProcessos, processos, error, offset } = this.state;

    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <h5>Processos</h5>
          </CardHeader>
          <CardBody>
          {!isLoadingProcessos ? (
            <BootstrapTable data={processos} version="4" striped hover pagination search options={this.options}>
              <TableHeaderColumn dataField="andamento" dataSort>Andamento</TableHeaderColumn>
              <TableHeaderColumn isKey dataField="tipo">Tipo</TableHeaderColumn>
              <TableHeaderColumn dataField="dataInicio" dataSort>Iniciado em...</TableHeaderColumn>
            </BootstrapTable>
            ) : (
              <h3>Carregando...</h3>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Processos;
