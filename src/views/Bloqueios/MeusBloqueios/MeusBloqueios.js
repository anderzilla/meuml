import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Table, Button, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';
import Pagination from "react-js-pagination";
import 'react-toastify/dist/ReactToastify.css';



class MeusBloqueios extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      dropdownOpen: new Array(6).fill(false),
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

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
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

  

  handlePageChange(pageNumber) {
    !pageNumber ? this.state = {offset : '1'} : this.state = {offset : pageNumber};
    //this.props.history.push('/meusbloqueios?offset='+this.state.offset+'&limit=50');
  }
  //ALTERA O BLOQUEIO DE COMPRAS
  mudaBloqueioCompras(idBloqueio,bids,questions){
    !bids ? bids = true : bids = false ;
    axios.post(process.env.REACT_APP_API_URL + `/blacklist/unblock`,
    {"block_id": idBloqueio,"bids":bids,"questions": questions},
    {headers:{"Authorization": 'Bearer ' + getToken()}},
    ).then(res => {
      //console.log(res.data);
    });
  }
  //ALTERA O BLOQUEIO DE PERGUNTAS
  mudaBloqueioPerguntas(idBloqueio,bids,questions){
    !questions ? questions = true : questions = false ;
    axios.post(process.env.REACT_APP_API_URL + `/blacklist/unblock`,
    {"block_id": idBloqueio,"bids":bids,"questions": questions},
    {headers:{"Authorization": 'Bearer ' + getToken() }},  
    ).then(res => {
      //console.log(res.data);
    });
  }



  fetchBlacklist(accountId) {
    axios.get(process.env.REACT_APP_API_URL + `/blacklist?account_id=`+accountId,
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
              });
            }else{
              this.setState({
                blacklist: res.data.data,
                isLoading: false,
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

  render() {
    //{//console.log(this.state)}
    const { isLoading, isLoadingAccounts, blacklist, error, accounts } = this.state;
    
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Col md="3" sm="4"><h5>Bloqueios - {this.state.total}</h5> </Col>
            <Col md="9" sm="8">
            {!isLoadingAccounts ? (
              <Dropdown  isOpen={this.state.dropdownOpen[1]} toggle={() => {this.toggle(1);}}>
                <DropdownToggle caret color="primary" size="sm">
                  Contas
                </DropdownToggle>
                <DropdownMenu>
                  {accounts.map((c, k) => {
                    const { id, name } = this.state;
                    return (<DropdownItem onClick={() => this.fetchBlacklist(c.id)}>{c.name}</DropdownItem>)
                  })}
                <DropdownItem >teste</DropdownItem>
                </DropdownMenu>
                </Dropdown>
                ) : (
                  <h3>Carregando...</h3>
                )}
            </Col>
          </CardHeader>
          <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>ID do Usuario</th>
                <th className="text-center">Compras</th>
                <th className="text-center">Perguntas</th>
                <th>Motivo</th>
                <th className="text-center">Ação</th>
              </tr>
            </thead>
            <tbody>
            {!isLoading ? (
            blacklist.map((bl, k)=> {
              //console.log(blacklist)
                return (      
                  <tr>
                    <td>{bl.customer_id}</td>
                    <td className="text-center">
                      <Button onClick={() => this.mudaBloqueioCompras(bl.customer_id,bl.bids,bl.questions)}>
                      {bl.bids ? <i className="fa fa-ban text-danger"></i> : <i className="fa fa-check text-success"></i>}
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button onClick={() => this.mudaBloqueioPerguntas(bl.customer_id,bl.bids,bl.questions)}>
                      {bl.questions ? <i className="fa fa-ban text-danger"></i> : <i className="fa fa-check text-success"></i>}
                      </Button>
                    </td>
                    <td>{bl.motive_description}</td>
                    <td>
                    <Button className="btn btn-danger btn-small "><i className="fa fa-unlock"></i> Desbloquear</Button>
                    </td>
                  </tr>
                );
              })
          ) : (
              <h3>Loading...</h3>
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
