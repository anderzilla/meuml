import React, { Component } from 'react';
import api from '../../../services/api';
import ReactLoading from 'react-loading';
import fotoPadrao from '../../../assets/img/avatars/user.svg';
import { DropDown, Item } from './../../../components/buttons/ButtonGroup';
import Carton from '../../../components/Card';
import { Col, Row, Button } from 'reactstrap';
import Colapse from '../../../components/buttons/Collapse';

class ListaContas extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fotoConta: fotoPadrao,
      accounts: [],
      account_id: null,
      isLoading: true,
      newName: null,
      total: 0,
    };
  }

  componentDidMount() {
    this.fetchAccounts();
  }

  fetchAccounts() {
    api.get('/accounts').then(res => {
      let accounts = res.data.data.map(acc => {return acc});
      const total = res.data.meta.total;
      this.setState({
        accounts: accounts,
        total: total,
        isLoading: false
      });
    });
  }

  render() {
    return (<>
      <div className="animated fadeIn">
        <Row>
          <a href="#/contas/adicionar" className="botaoAdicionarConta">
            <Button
              className="btn btn-primary float-left">
                <i className="fa fa-plus-circle" /> 
                Adicionar Conta
            </Button>
          </a>
        </Row>
        <Row>
          {this.state.isLoading === true && this.state.total <= 0 ? (
            <div className="center">
              <ReactLoading
                type={"spinningBubbles"}
                color={"#054785"}
                height={100}
                width={100}
                className="spinnerStyle"
              />
            </div>) : (
            this.state.accounts.map((acc, index)=> {
              return (
                <Carton className="card-accent-primary" xs="12" sm="4" md="3" key={acc.id}
                  header={<>
                    <span id={'nomeConta-'+index}>{acc.name}</span>
                    <div className="float-right">
                      <DropDown className="vertical-button-group">
                        <Item className="dropdown-item"
                          http="put"
                          url={`/accounts/${acc.id}`}
                          ask="Informe o nome desajado"
                          >Renomear
                        </Item>
                        <Item className="dropdown-item"
                          http="get"
                          url={`/accounts/${acc.id}/sync`}
                          >Sincronizar
                        </Item>
                        <Item className="dropdown-item"
                          http="delete"
                          url={`/accounts/${acc.id}`}
                          ask={`Você tem certeza que deseja deletar a conta "${acc.name}"`}
                          >Excluir
                        </Item>
                      </DropDown>
                    </div>
                  </>}
                  >
                  <div className="imgConta">
                    <img src={!acc.external_data.thumbnail ? this.state.fotoConta  : acc.external_data.thumbnail.picture_url } title={acc.external_name} className="img-full70 align-content-center" alt="Loja Teste"></img>
                  </div>
                  <div className="text-primary text-center nomeDuasLinhas" title={acc.external_name}>{acc.external_name}</div>
                  <div className="text-left">
                    <p className="labelCard"><i className="fa fa-envelope"></i> E-mail: </p>
                    {acc.external_data.email}<br/>
                    <p className="labelCard"><i className="fa fa-user"></i> Usuário: </p>
                    {acc.external_data.nickname}<br/>
                  </div>
                  <Row>
                    <Col md="6" sm="12">
                      <h5 className="tituloVendas">Vendas</h5>
                      <h5 className="text-success valores">{acc.external_data.seller_reputation.metrics.sales.completed}</h5>
                    </Col>
                    <Col md="6" sm="12">
                      <h5 className="tituloAnuncios">Anúncios</h5>
                      <h5 className="text-success valores">{acc.count_advertisings}</h5>
                    </Col>
                  </Row>
                </Carton>
              );
            })
          )}
        </Row>
      </div>
      </>
    );
  }
}

export default ListaContas;
