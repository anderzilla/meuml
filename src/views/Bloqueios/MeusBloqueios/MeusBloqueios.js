import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Table, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getToken } from '../../../auth';
import Pagination from "react-js-pagination";
import 'react-toastify/dist/ReactToastify.css';
import Picky, {components} from "react-picky";
import "react-picky/dist/picky.css";

import { Redirect } from 'react-router';



class MeusBloqueios extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      dropdownOpen: false,
      
      totalDataSize: 0,
      sizePerPage: 50,
      activePage: 1,
      filter: '',
      paginate:'',
      accounts: [],
      isLoadingAccounts: true,
      isLoading: true,
      value: null,
      arrayValue: [],
      contas: [],
      total: '',
      multiContas: '',
      motivos: [],
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentDidMount() {
    this.fetchAccounts();
    this.fetchMotivos();
  }

  fetchAccounts()
  {
    this.url = process.env.REACT_APP_API_URL + `/accounts`
    axios.get(this.url,
      { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
    if (res.status === 200){
      const listaContas = [];
      const resContas = res.data.data;
      resContas.map((c, k) => {
        const { id, name } = this.state;
        listaContas.push({'value':c.id, 'label':c.name });
      })
      this.setState({
        accounts: listaContas,
        isLoadingAccounts: false
      });

      if(res.data.data.length > 0){
        this.fetchBlacklist(res.data.data[0].id);

        if(listaContas.length === 1) {
          this.setState({ arrayValue: [{'value':res.data.data[0].id, 'label':res.data.data[0].name }] });
        }
      }

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

  selectMultipleOption(selectedAccount) {
    const select = selectedAccount;
    this.setState({ arrayValue: select});
    this.state.contas = []; 
    select.map((x, k) => {  
      this.state.contas.push(x.value);
      }) 
    if (this.isEmpty(select)) {
      this.setState({
        blacklist: [],
        paginacao: '',
        total: '',
        totalDataSize: '',
        sizePerPage: '',
        currentPage: '',
        nPagina: '',
      });
    }else{
      this.fetchBlacklist(this.state.contas);
    }
  }


  handlePageChange(pageNumber) {
    !pageNumber ? this.setState({activePage:'1'}) : this.setState({activePage: pageNumber});
    this.fetchBlacklist(this.state.contas, pageNumber);
    //this.props.history.push('/meusbloqueios?offset='+this.state.offset+'&limit=50');
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  fetchMotivos()
  {
    this.url = process.env.REACT_APP_API_URL + `/blacklist/motives`
    axios.get(this.url,
      { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
    console.log('motivos:'+res);
    if (res.status === 200){
      const listaMotivos = [];
      const resMotivos = res.data.data;
      resMotivos.map((m, k) => {
        const { id, name } = this.state;
        listaMotivos.push({'id':m.id, 'name':m.name });
      })

      this.setState({
        motivos: listaMotivos,
      });
    }else{ Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true}); }
  });
  }

  fetchBlacklist(accountId, pageNumber) {
    if (accountId === []){
      this.setState({blacklist: []}); 
    }else{ 
      if (pageNumber === '' || !pageNumber){
        this.state.paginate = 0;
      }else{
        this.state.paginate = ((pageNumber * this.state.sizePerPage) - this.state.sizePerPage);
      }
      this.state.rota = '/blacklist?account_id='+accountId+'&offset='+this.state.paginate+'&limit=50';
    axios.get(process.env.REACT_APP_API_URL + this.state.rota,
        { headers: { "Authorization": 'Bearer ' + getToken() } })
        .then(res => {
          if (res.data.status === 'success') {
            const message = res.data.message;
            if (res.data.meta.total !== 0) {
              this.setState({
                blacklist: res.data.data,
                paginacao: res.data.meta,
                total: !res.data.meta.total? '0' : res.data.meta.total,
                totalDataSize: res.data.meta.total,
                sizePerPage: res.data.meta.limit,
                currentPage: res.data.meta.page,
                nPagina: res.data.meta.pages,
                isLoading: false,
              });
            }else{
              this.setState({
                blacklist: res.data.data,
                isLoading: false,
                total: 0,
              });
              Swal.fire({html: '<p>' + message + '</p>', type: 'info', showConfirmButton: true,
            });
          }
        }
      }).catch(error => {

        this.setState({
          backend_error: true
        });
      });
    }
    
  }

  pagaNomeConta(contaId){
    const ct = this.state.accounts.find(x => x.value === contaId).label;
    return ct;
    }

  pagaMotivo(motivoId){
    const mt = this.state.motivos.find(z => z.id === motivoId).name;
    return mt;
  }

  render() {

    const { isLoading, isLoadingAccounts, blacklist, error, accounts, selectedOption, contas, arrayValue, contasMarcadas, offset } = this.state;
    console.log(blacklist)  
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row>
            <Col md="8" sm="6" xs="8">
            {!isLoadingAccounts ? (
            <Picky
            value={this.state.arrayValue}
            options={accounts}
            onChange={this.selectMultipleOption}
            className="multiSelMeusBloqueios"
            open={false}
            valueKey="value"
            labelKey="label"
            multiple={true}
            name="multiContas"
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
            </Col>
            {/* <Col md="4" sm="6" xs="4">
              {(this.state.total > 0)? <div className="alert alert-primary fade show">Registros Encontrados:<b> {(this.state.total -1)} </b></div> : <span></span>}
            </Col> */}
            </Row>
          </CardHeader>
          <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th className="tbcol-5">ID do Usuario</th>
                <th className="tbcol-5 text-center">Compras</th>
                <th className="tbcol-5 text-center">Perguntas</th>
                <th className="tbcol-10 text-center">Conta</th>
                <th className="tbcol-20">Motivo</th>
                <th className="tbcol-50">Descrição</th>
              </tr>
            </thead>
            <tbody>
            {
            
            (this.state.total ==='') ? (
              <tr>
                    <td colSpan="4" className="mensagemAviso">
                      <div role="alert" className="alert alert-primary fade show ">Escolha uma conta para gerenciar os bloqueios!</div>
                    </td>
              </tr>
            ) : (
            !isLoading ? (
            blacklist.map((bl)=> {
                return (
                  <tr key={bl.customer_id}>
                    <td>{bl.customer_id}</td>
                    <td className="text-center">
                      {bl.bids ? (<i className="fa fa-times text-danger"></i>) : ( <span></span>)}
                    </td>
                    <td className="text-center">
                      {bl.questions ? (<i className="fa fa-times text-danger"></i>) : ( <span></span>)}
                    </td>
                    <td className="text-center">
                      {this.pagaNomeConta(bl.account_id)}
                    </td>
                    <td>{bl.motive_id? (this.pagaMotivo(bl.motive_id)) : '-' }</td>
                    <td>{bl.motive_description}</td>
                  </tr>
                );
              } )
              ) : (
                <tr><td>Carregando...</td></tr>
            )
            )
          }
                  </tbody>
                </Table>
          </CardBody>
          <CardFooter className=" align-content-center ">
          <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.sizePerPage}
          totalItemsCount={(this.state.total -1)}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          itemClass= "btn btn-md btn-outline-info"
          activeClass = "btn btn-md btn-info"
          innerClass = "btn-group"
          activeLinkClass = "text-white" 
        />
          </CardFooter>

        </Card>

      </div>
    )
  }
}

export default MeusBloqueios;
