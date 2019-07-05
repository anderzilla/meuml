import React, { Component } from 'react';
import {Card, CardBody, CardFooter, CardHeader, Col, Row, Button, ButtonDropdown, ButtonGroup, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';
import axios from 'axios';
import fotoPadrao from '../../../assets/img/avatars/user.svg';
import ReactLoading from 'react-loading';
import VerticalDropDown from '../../Buttons/VerticalDropDown';
import DropDownItem from '../../Buttons/DropDownItem';

import VerticalBtnGroup from '../../Buttons/VerticalButton';

class ListaContas extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dropdownOpen: new Array(50).fill(false),
      constas: [],
      isLoading: true,
      total: 0,
      fotoConta: fotoPadrao,
      newName: '',
      account_id: null,
    };
    
    this.openAuth = this.openAuth.bind(this);
  }

  componentDidMount() {
    this.fetchAccounts();
  }

  fetchAccounts() {
    axios.get(process.env.REACT_APP_API_URL + `/accounts`,
        { headers: { "Authorization": 'Bearer ' + getToken() } })
        .then(res => {
          if (res.data.status === 'success') {
            const message = res.data.message;
            if (res.data.meta.total !== 0) {
              this.setState({
                contas: res.data.data,
                tk: getToken(),
                isLoading: false,
              });
              console.log(this.state)
            } 
          } else {
            this.setState({
              isLoading: false
            });
          }
        }).catch((error) => {
          !error.response ?
          (this.setState({tipoErro: error})) :
          (this.setState({tipoErro: error.response.data.message}))
          Swal.fire({html:'<p>'+ this.state.tipoErro+'<br /></p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
        });
  }

  openAuth()
  {
    window.open('#/contas/adicionar', 'SomeAuthentication', 'width=972,height=660,modal=yes,alwaysRaised=yes')
  }



    // Rename account
    rename(account_id) {
      Swal.fire({
        title: 'Renomear Conta:',
        input: 'text',
        showCancelButton: true,
        inputPlaceholder: 'Preencha o novo nome'
      }).then(res => {
          this.setState({ newName: res.value });

          if(this.state.name !== null) {

          }
      });
    };



  render() {
    const { isLoading, contas } = this.state;

    return (
      
      <div className="animated fadeIn">
        <Row>
          <a href="#/contas/adicionar" className="botaoAdicionarConta">
          <Button className="btn btn-primary float-left"> <i className="fa fa-plus-circle" ></i> Adicionar Conta </Button>
          </a>
        </Row>
        <Row>
          {!isLoading ? (
            contas.map((c, k)=> {
              const { username, name, email, id } = this.state;
              
                return (
                    <Col xs="12" sm="4" md="3" key={c.id} className="CardConta">
                      <Card className="card-accent-primary">
                        <CardHeader>
                          <span id={'nomeConta-'+k}>{c.name}</span>
                          
                          <div className="float-right">
                              <VerticalDropDown>
                                <DropDownItem
                                  url={process.env.REACT_APP_API_URL + '/accounts/' + 260}
                                  method="put"
                                  headers={ {headers: {"Authorization" : 'Bearer ' + this.state.tk}} }
                                  >Botão1
                                </DropDownItem>
                                <DropDownItem
                                  url="d"
                                  data="e"
                                  method="f"
                                  >Botão2
                                </DropDownItem>
                              </VerticalDropDown>
                          </div>
                        </CardHeader>
                        <CardBody>
                          <div className="imgConta">
                          <img src={!c.external_data.thumbnail ? this.state.fotoConta  : c.external_data.thumbnail.picture_url } title={c.external_name} className="img-full70 align-content-center" alt="Loja Teste"></img>
                          </div>
                          <div className="text-primary text-center nomeDuasLinhas" title={c.external_name}>{c.external_name}</div>
                          <div className="text-left">
                            <p className="labelCard"><i className="fa fa-envelope"></i> E-mail:</p>
                            {c.external_data.email}<br/>
                            <p className="labelCard"><i className="fa fa-user"></i> Usuário:</p>
                            {c.external_data.nickname}<br/>
                          </div>
                          
                        </CardBody>
                        <CardFooter>
                        <Row>
                          <Col md="6" sm="12">
                          <h5 className="tituloVendas">Vendas</h5>
                          <h5 className="text-success valores">{c.external_data.seller_reputation.metrics.sales.completed}</h5>
                          </Col>
                          <Col md="6" sm="12">
                          <h5 className="tituloAnuncios">Anúncios</h5>
                          <h5 className="text-success valores">{c.count_advertisings}</h5>
                          </Col>
                        </Row>
                        </CardFooter>
                      </Card>
                    </Col>
                );
              })
          ) :          
          (
          <div className="center">
                <ReactLoading type={'spinningBubbles'} color={'#054785'} height={100} width={100}  className='spinnerStyle'/>
          </div>
          )}
        
        </Row>
      </div>
    );
  }
}

export default ListaContas;
