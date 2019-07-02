import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Moment, { locale } from 'moment';

import { getToken } from '../../auth';
import data from './_data';


class Processos extends Component {
  constructor(props) {
    super(props);

    Moment().locale('pt-br');

    this.agora = new Date();
    this.diaH = this.agora.getDate();
    this.mesH = this.agora.getMonth();
    this.anoH = this.agora.getFullYear();
    this.horaH = this.agora.getHours();
    

    this.state = {
      totalDataSize: 0,
      sizePerPage: 50,
      activePage: 1,
      filter: '',
      paginate:'',
      processos: [],
      isLoadingProcessos: true,
      tempoProcesso: '',
      listaProcessos: [],
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
      const resProcessos = res.data.data;
      resProcessos.map(p => {
        this.showData(p);
      })
      this.setState({
        processos: this.state.listaProcessos,
        isLoadingProcessos: false,

      });

    }else{
      Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
    }
  }).catch(error => {
  });
  }

  showData(data){
    const cria = Moment(data.date_created).format('DD/MM/YYYY HH:MM');
    const res = Moment(cria, 'DD/MM/YYYY HH:MM').startOf().fromNow();
    const resdiaa = res.replace('a day', '1 dia');
    const resdia = resdiaa.replace('day', 'dia');
    const reshora = resdia.replace('hour', 'hora');
    const final = reshora.replace('ago', 'atrás' );
    this.state.listaProcessos.push({
          'andamento': (data.item_finished === null)? 0 : data.item_finished +' processos concluídos de '+ data.item_total, 
          'dataInicio':final, });      
  }

  componentDidMount() {
    this.fetchProcess();
  }

  isExpandableRow(row) {
    if (row.id < 2) return true;
    else return false;
  }

  expandComponent(row) {
    return (
      // <BSTable data={ row.expand } />
      <div>{ row.expand } </div>
    );
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
            <BootstrapTable data={this.state.listaProcessos} 
                    options={this.options}
                    expandableRow={ this.isExpandableRow }
                    expandComponent={ this.expandComponent }>
              <TableHeaderColumn isKey dataField="andamento" dataSort>Andamento</TableHeaderColumn>
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
