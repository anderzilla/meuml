import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Form,
  Label,
  FormGroup,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';

class MinhasListasDeBloqueio extends Component {
  constructor(props) {
    super(props);

    this.toggleConta = this.toggleConta.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state={
      accountId : '',
      accountName: '',
      blackListName: '',
      accounts: [],
      backlistList: [],
      isLoadingBlacklistList: true,
      isLoadingAccounts: true,
    }

    this.nbloqueios = "2048";
    this.nlistas = "48";
    // ...

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  toggleConta() {
    this.setState(prevState => ({
      dropdownOpenConta: !prevState.dropdownOpenConta
    }));
  }

  fetchBlacklist(accountId,accountName) {
    this.setState({accountId: accountId, accountName: accountName});
  }

  componentDidMount() {
    this.fetchAccounts();
    this.fetchBlacklistList();
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

  fetchDeletarLista(id)
  {
    this.url = process.env.REACT_APP_API_URL + `/blacklist/list/`+id
    axios.delete(this.url,
      { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
      if (res.status === 200){
        Swal.fire({html:'<p>Lista excluída com sucesso</p>', type: 'error', showConfirmButton: true});
      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => { console.log(error)});
  }

  fetchBlacklistList()
  {
    this.url = process.env.REACT_APP_API_URL + `/blacklist/list`
    axios.get(this.url,
      { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
      if (res.status === 200){
        this.setState({
          backlistList: res.data.data,
          isLoadingBlacklistList: false,
          nlistas: res.data.meta.total,
        });
      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => { console.log(error)});
  }

  handleSubmit(event) {

    event.preventDefault();
    if (this.state.blackListName === ''){
      Swal.fire({html:'<p>Preencha o nome da lista para bloqueá-la</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    }else{
      axios.post(process.env.REACT_APP_API_URL + `/blacklist/list/import`, [{
        "account_id": this.state.accountId,
        "blacklist_name": this.state.blackListName,
      }],
      {headers: {"Authorization": 'Bearer ' + getToken(), "Content-Type": 'application/json'}},)
      .then(res => {
        //console.log(res.data);
        const status = res.data.status;
        this.setState({status});
        if (this.state.status === 'success'){
          const message = res.data.message;
          this.setState({message});
          Swal.fire({html:'<p>'+this.state.message+'</p>', type: this.state.status, showCloseButton: false, showConfirmButton: true, textConfirmButton:"OK"});
        }else{
          const message = res.data.message;
          this.setState({message});
          Swal.fire({html:'<p>'+this.state.message+'</p>', type: 'error', showConfirmButton: true});
        }

      }).catch((error) => {
        console.log(error);
        !error.response ?
        (this.setState({tipoErro: error})) :
        (this.setState({tipoErro: error.response.data.message}))
        Swal.fire({html:'<p>'+ this.state.tipoErro+'<br /></p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });
  }

  }

  render() {
    const { isLoading, isLoadingAccounts, isLoadingBlacklistList, backlistList, error, accounts} = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row>
            <Col md="3" xs="3" sm="12"><h5>Listas - {this.state.nlistas}</h5> </Col>
            <Col md="6" xs="6" sm="12"><Link to="/adicionaritemlista" className="btn btn-primary btn-sm">Criar Lista de Bloqueio</Link></Col>
            </Row>
          </CardHeader>
          <CardBody>
          <Table responsive>
                  <thead>
                  <tr>
                    <th class="text-left">Nome da Lista</th>
                    <th class="text-center">Compras</th>
                    <th class="text-center">Perguntas</th>
                    <th class="text-center">Descrição</th>
                    <th class="text-right"></th>
                  </tr>
                  </thead>
                  <tbody>
                  {console.log(backlistList)}
                  {!isLoadingBlacklistList ? (
                  backlistList.map((l, key) => {
                          const { id, name } = this.state;
                          return (
                            <tr>
                              <td class="text-left">{l.name}</td>
                              <td class="text-center">{!l.bids? <i class="fa fa-unlock text-disabled"></i> : <i class="fa fa-lock text-danger"></i>}</td>
                              <td class="text-center">{!l.questions? <i class="fa fa-unlock text-disabled"></i> : <i class="fa fa-lock text-danger"></i>}</td>
                              <td class="text-center">{l.list_description}</td>
                              <td class="text-right">
                                <Button onClick={()=>this.fetchDeletarLista(l.id)} class="btn btn-danger btn-small"><i class="fa fa-trash"></i></Button>
                              </td>
                            </tr>
                        )})
                      ) : (
                        <h3>Carregando...</h3>
                      )}
                  </tbody>
                </Table>
          </CardBody>
          </Card>
          </div>
    )
  }
}

export default MinhasListasDeBloqueio;
