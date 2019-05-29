import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Table, Form, Label, FormGroup, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';

class BloquearEmMassa extends Component {
  constructor(props) {
    super(props);

    this.toggleConta = this.toggleConta.bind(this);

    this.state={
      accountId : '',
      accountName: '',
      accounts: [],
      backlistList: [],
      isLoadingBlacklistList: true,
      isLoadingAccounts: true,
    }
    
    this.nbloqueios = "2048";
    this.nlistas = "48";
    // ...

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

  render() {
    const { isLoading, isLoadingAccounts, isLoadingBlacklistList, backlistList, error, accounts} = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
        <Form name='novaLista'>
          <CardHeader>
            <h5>Criar Lista</h5> 
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
                          return (<DropdownItem onClick={() => this.fetchBlacklist(c.id, c.name)}>{c.name}</DropdownItem>)
                        })}
                      </DropdownMenu>
                      </Dropdown>
                      ) : (
                        <h3>Carregando...</h3>
                      )}
                      <div>{!this.state.accountId ? ('Selecione uma conta!') : ('Conta: '+this.state.accountName)}</div>
                </FormGroup>
                <FormGroup>
                  <Label for="idUsusario">Nome da Lista</Label>
                  <Input type="text" name="nomeLista" id="nomeLista" placeholder="Nome da Lista" />
                </FormGroup>
                <FormGroup>
                  <Label for="idUsusario">Origem</Label>
                  <Input type="text" name="origemLista" id="origemLista" placeholder="Origem da Lista" />
                </FormGroup>
          </CardBody>
          <CardFooter>
          <Button type="submit" size="sm" color="primary"><i className="fa fa-file-text"></i> Criar Lista</Button>
          </CardFooter>
          </Form>
        </Card>
        
        <Card>
          <CardHeader>
            <h2>Listas - {this.state.nlistas}</h2> 
          </CardHeader>
          <CardBody>
          <Table responsive>
                  <thead>
                  <tr>
                    <th class="text-center">Nome da Lista</th>
                    <th class="text-center">Bloqueios</th>
                    <th class="text-center">Origem</th>
                    <th class="text-center">Data</th>
                    <th class="text-center">Ação</th>
                  </tr>
                  </thead>
                  <tbody>
                  {!isLoadingBlacklistList ? (
                  backlistList.map((l, key) => {
                          const { id, name } = this.state;
                          return (
                            <tr>
                              <td>Golpes</td>
                              <td class="text-center"><span class="text-danger">{l.id}</span></td>
                              <td class="text-center">{l.name}</td>
                              <td class="text-center"></td>
                              <td class="text-right">
                              <Link to="/adicionaritemlista" class="btn btn-primary btn-small"><i class="fa fa-user-plus"></i> Adicionar</Link>
                              <Link to="/" class="btn btn-success btn-small"><i class="fa fa-unlock"></i> Desbloquear</Link>
                              <Link to="/" class="btn btn-warning btn-small"><i class="fa fa-refresh"></i> Sincronizar</Link>
                              <Link to="/" class="btn btn-danger btn-small"><i class="fa fa-trash"></i> Excluir</Link>
                              </td>
                            </tr>
                        )})
                      ) : (
                        <h3>Carregando...</h3>
                      )}
                  
                  </tbody>
                </Table>
          </CardBody>
          <CardFooter>

          </CardFooter>

        </Card>

      </div>
    );
  }
}


export default BloquearEmMassa;
