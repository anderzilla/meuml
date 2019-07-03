import React, {Component} from 'react';
import {Card, CardHeader, CardBody, Collapse, Button} from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import Moment, { locale } from 'moment';
import ReactLoading from 'react-loading';
import { getToken } from '../../auth';
import data from './_data';
class Processos extends Component {
  constructor(props) {
    super(props);

    this.toggleAccordion = this.toggleAccordion.bind(this); 
    
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
      accordion: [],
      fadeIn: true,
      timeout: 300,
      isLoading: true,
      sublista:'',
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

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  fetchProcess()
  {
    this.url = process.env.REACT_APP_API_URL + `/process?offset=0&limit=50`
    axios.get(this.url,
      { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
    if (res.status === 200){
      const resProcessos = res.data.data;
      resProcessos.map(p => {
        this.showData(p);
        this.state.accordion.push(false);
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

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  showData(data){
    const cria = Moment(data.date_created).format('DD/MM/YYYY HH:MM');
    const res = Moment(cria, 'DD/MM/YYYY HH:MM').startOf().fromNow();
    const resdiaa = res.replace('a day', '1 dia');
    const resmesa = resdiaa.replace('a month', '1 mês');
    const resmeses = resmesa.replace('months', 'meses');
    const resmes = resmeses.replace('month', 'mes');
    const resdia = resmes.replace('day', 'dia');
    const reshora = resdia.replace('hour', 'hora');
    const final = reshora.replace('ago', 'atrás' );
    this.state.listaProcessos.push({
          'andamento': (data.item_finished === null)? 0 : data.item_finished +' processos concluídos de '+ data.item_total, 
          'dataInicio':final,
          'subprocessos': data.process_items,
        });      
  }

  componentDidMount() {
    this.fetchProcess();
  }
  render() {
    const {isLoadingProcessos, processos } = this.state;
    return (
      <div className="animated">
        <Card>
          <CardHeader className="">
            <h5>Processos</h5>
          </CardHeader>
          <CardBody>
          {!isLoadingProcessos ? (
            <div id="accordion">
              {processos.map((p, k)=> {
                return (
                  (!this.isEmpty(p.subprocessos))?
                  (<Card className="mb-0 listaProcessos ">
                    <CardHeader id={'heading'+k} className="divListaProcessos">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(k)} aria-expanded={this.state.accordion[k]} aria-controls={'collapse'+k}>
                        <span>{p.andamento} iniciado em {p.dataInicio}</span>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[k]} data-parent="#accordion" id={'collapse'+k} aria-labelledby={'heading'+k}>
                      <CardBody>
                        <ul>
                          {p.subprocessos.map((d, k)=> {
                            return (<li>{d.tool_name}</li>)
                          })} 
                        </ul>
                      </CardBody>
                    </Collapse>
                  </Card>): ''
                  );
                } )
              }
            </div>
            ) : (<ReactLoading type={'spinningBubbles'} color={'#054785'} height={100} width={100}  className='spinnerStyle'/>)}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Processos;