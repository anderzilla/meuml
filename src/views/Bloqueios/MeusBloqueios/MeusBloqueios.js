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

    this.state = {
      dropdownOpen: false,
      blacklist: [],
      totalDataSize: 0,
      sizePerPage: 50,
      activePage: 1,
      offset: 1,
      filter: '',
      accounts: [],
      isLoadingAccounts: true,
      isLoading: true,
      value: null,
      arrayValue: '',
      contas: '',
      multiContas: '',
      
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentDidMount() {
    this.fetchAccounts();
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
      if(res.data.data.meta.total > 0){
        this.fetchBlacklist(res.data.data[0].id);
      }

    }else{
      Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
    }
  }).catch(error => {
  });
  }

  selectMultipleOption(selectedAccount) {
    console.count('onChange')
    console.log("Val", selectedAccount);
    const select = selectedAccount;
    this.setState({ arrayValue: select});
    this.state.contas = '';
    !select.value?
    select.map((x, k) => {
        if (this.state.contas === '' || this.state.contas === 'undefined'){
          this.state.contas = x.value;
        }else{
          this.state.contas = this.state.contas+','+x.value;
        }
      }) 
    :
      this.state.contas=[JSON.stringify(select.value)];
      
    ;
    if (this.state.contas !== '') {
      this.fetchBlacklist(this.state.contas);
    }else{
      this.setState({blacklist: ''});
    }
  }


  handlePageChange(pageNumber) {
    
    this.fetchBlacklist(this.state.contas, pageNumber);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  fetchBlacklist(accountId) {
    if (accountId === ''){
      this.setState({blacklist: ''}); 
    }else{
      this.state.rota = '/blacklist?account_id='+accountId;
    axios.get(process.env.REACT_APP_API_URL + this.state.rota,
        { headers: { "Authorization": 'Bearer ' + getToken() } })
        .then(res => {
          //console.log(res.data);
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

  render() {
    //{//console.log(this.state)}
    const { isLoading, isLoadingAccounts, blacklist, error, accounts, selectedOption, contas, arrayValue, contasMarcadas } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row>
            <Col md="8" sm="6" xs="8">
              {this.state.contas}
            {!isLoadingAccounts ? (
            <Picky
            value={this.state.arrayValue}
            options={accounts}
            onChange={this.selectMultipleOption}
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
            <Col md="4" sm="2">
              <h5 className="text-right text-primary">registros encontrados: {!this.state.total? '0' : this.state.total} </h5>
            </Col>
            </Row>
          </CardHeader>
          <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th className="tbcol-5">ID do Usuario</th>
                <th className="tbcol-5 text-center">Compras</th>
                <th className="tbcol-5 text-center">Perguntas</th>
                <th className="tbcol-25">Motivo</th>
                <th className="tbcol-50">Descrição</th>
              </tr>
            </thead>
            <tbody>
            {!isLoading ? (
            !blacklist ? (
              <tr>
                    <td colspan="4" className="mensagemAviso">
                      <div role="alert" className="alert alert-primary fade show ">Escolha uma conta para gerenciar os bloqueios!</div>
                    </td>
              </tr>
            ) : (
            blacklist.map((bl, k)=> {
                return (
                  <tr>
                    <td>{bl.customer_id}</td>
                    <td className="text-center">
                      {bl.bids ? (<i className="fa fa-times text-danger"></i>) : ( <span></span>)}
                    </td>
                    <td className="text-center">
                      {bl.questions ? (<i className="fa fa-times text-danger"></i>) : ( <span></span>)}
                    </td>
                    <td>{bl.motive_id}</td>
                    <td>{bl.motive_description}</td>
                  </tr>
                );
              } )
            )
          ) : (
              <h3>Carregando...</h3>
          )}
                  </tbody>
                </Table>
          </CardBody>
          <CardFooter className=" align-content-center ">
          <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.sizePerPage}
          totalItemsCount={this.state.total}
          pageRangeDisplayed={5}
          onChange={() => this.handlePageChange(this.state.activePage)}
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
