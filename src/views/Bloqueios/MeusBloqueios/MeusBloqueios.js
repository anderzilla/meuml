import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Table, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getToken } from '../../../auth';
import Pagination from "react-js-pagination";
import 'react-toastify/dist/ReactToastify.css';

import { Redirect } from 'react-router';



class MeusBloqueios extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      dropdownOpen: false,
      blacklist: [],
      totalDataSize: 0,
      sizePerPage: 50,
      offset: 1,
      filter: '',
      accounts: [],
      isLoadingAccounts: true,
      isLoading: true,
      accountId: '',
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

  fetchAccounts() {


    this.url = process.env.REACT_APP_API_URL + `/accounts`
    axios.get(this.url,
      { headers: { "Authorization": 'Bearer ' + getToken() } },
    ).then(res => {
      console.log('contas>>>', res);
      if (res.status === 200) {
        this.setState({
          accounts: res.data.data,
          isLoadingAccounts: false
        });
        if (res.data.meta.total > 0) {
          this.fetchBlacklist(res.data.data[0].id);
        } else {
        
          Swal.fire({
            title: '',
            text: "Você precisa ter ao menos 1 conta!",
            type: 'info',
            showCancelButton: false,
            confirmButtonColor: '#366B9D',
            confirmButtonText: 'OK',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: true
          }).then(function () {
            window.location.href = "#/listacontas";
          })

        }
      } else {
        Swal.fire({ html: '<p>' + res.data.message + '</p>', type: 'error', showConfirmButton: true });
      }
    }).catch(error => {
    });
  }



  handlePageChange(pageNumber) {
    !pageNumber ? this.state = { offset: '1' } : this.state = { offset: pageNumber };
    //this.props.history.push('/meusbloqueios?offset='+this.state.offset+'&limit=50');
  }
  //ALTERA O BLOQUEIO DE COMPRAS
  mudaBloqueioCompras(idBloqueio, bids, questions) {
    !bids ? bids = true : bids = false;
    axios.post(process.env.REACT_APP_API_URL + `/blacklist/unblock`,
      { "block_id": idBloqueio, "bids": bids, "questions": questions },
      { headers: { "Authorization": 'Bearer ' + getToken() } },
    ).then(res => {
      //console.log(res.data);
    });
  }
  //ALTERA O BLOQUEIO DE PERGUNTAS
  mudaBloqueioPerguntas(idBloqueio, bids, questions) {
    !questions ? questions = true : questions = false;
    axios.post(process.env.REACT_APP_API_URL + `/blacklist/unblock`,
      { "block_id": idBloqueio, "bids": bids, "questions": questions },
      { headers: { "Authorization": 'Bearer ' + getToken() } },
    ).then(res => {
      //console.log(res.data);
    });
  }



  fetchBlacklist(accountId, accountName) {
    axios.get(process.env.REACT_APP_API_URL + `/blacklist?account_id=` + accountId,
      { headers: { "Authorization": 'Bearer ' + getToken() } })
      .then(res => {
        //console.log(res.data);
        if (res.data.status === 'success') {
          const message = res.data.message;
          if (res.data.meta.total !== 0) {
            this.setState({
              blacklist: res.data.data,
              paginacao: res.data.meta,
              total: res.data.meta.total,
              totalDataSize: res.data.meta.total,
              sizePerPage: res.data.meta.limit,
              currentPage: res.data.meta.page,
              accountName: accountName,
            });
          } else {
            this.setState({
              blacklist: res.data.data,
              isLoading: false,
            });
            Swal.fire({
              html: '<p>' + message + '</p>', type: 'info', showConfirmButton: true,
            });
          }
        }
      }).catch(error => {

        this.setState({
          backend_error: true
        });
      });
  }

  render() {
    //{//console.log(this.state)}
    const { isLoading, isLoadingAccounts, blacklist, error, accounts } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row>
              <Col md="4" sm="4"><h5>{!this.state.accountName ? (<em>Selecione uma conta!</em>) : this.state.accountName}  {!this.state.total ? '' : ': ' + this.state.total + ' bloqueios'}</h5> </Col>
              <Col md="5" sm="6">
                {!isLoadingAccounts ? (
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={() => { this.toggle(); }}>
                    <DropdownToggle caret color="primary" size="sm">
                      Contas
                </DropdownToggle>
                    <DropdownMenu>
                      {accounts.map((c, k) => {
                        const { id, name } = this.state;
                        return (<DropdownItem onClick={() => this.fetchBlacklist(c.id, c.name)}>{c.name}</DropdownItem>)
                      })}
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                    <h3>Carregando...</h3>
                  )}
              </Col>
              <Col md="3" sm="2">
                <Link to="/bloquearcomprador" className="btn btn-primary float-right"><i className="fa fa-user-times"></i> Bloquear Comprador</Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead>
                <tr>
                  <th className="tab25">ID do Usuario</th>
                  <th className="tab25 text-center">Compras</th>
                  <th className="tab25 text-center">Perguntas</th>
                  <th className="tab25">Motivo</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading ? (
                  !blacklist ? (
                    <tr>
                      <td className="mensagemAviso">
                        <div role="alert" className="alert alert-primary fade show ">Escolha uma conta para gerenciar os bloqueios!</div>
                      </td>
                    </tr>
                  ) : (
                      blacklist.map((bl, k) => {
                        return (
                          <tr>
                            <td>{bl.customer_id}</td>
                            <td className="text-center">
                              {bl.bids ? (<i className="fa fa-times text-danger"></i>) : (<span></span>)}
                            </td>
                            <td className="text-center">
                              {bl.questions ? (<i className="fa fa-times text-danger"></i>) : (<span></span>)}
                            </td>
                            <td>{bl.motive_description}</td>
                          </tr>
                        );
                      })
                    )
                ) : (
                    <h3>Carregando...</h3>
                  )}
              </tbody>
            </Table>
          </CardBody>
          <CardFooter className=" align-content-center ">
            <Pagination
              activePage={this.state.offset}
              itemsCountPerPage={this.state.sizePerPage}
              totalItemsCount={this.state.total}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange(this.state.offset)}
              itemClass="btn btn-md btn-outline-info"
              activeClass="btn btn-md btn-info"
              innerClass="btn-group"
              activeLinkClass="text-white"
            />

          </CardFooter>

        </Card>

      </div>
    )
  }
}

export default MeusBloqueios;
