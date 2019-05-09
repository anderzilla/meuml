import React, { Component } from 'react';
import {Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, CardFooter, CardHeader, Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';
import axios from 'axios';
import sygnet from '../../../assets/img/brand/sygnet-logo.png';



class ListaContas extends Component {

  state = {
    isLoading: true,
    contas: [],
    total: 0
  }

  componentDidMount() {
    this.fetchAccounts();
  }

  fetchAccounts() {


    axios.get(`https://api.app2.meuml.com/accounts`,
        {
          headers:
              {
                "Authorization": 'Bearer ' + getToken()
              }
        })
        .then(res => {
          if (res.data.status === 'success') {
            const message = res.data.message;

            if (res.data.meta.total !== 0) {

              this.setState({
                contas: res.data.data,
                isLoading: false,
              });

            } else {
              Swal.fire({html: '<p>' + message + '</p>', type: 'info', showConfirmButton: true});
            }
          } else {
            Swal.fire({html: '<p>' + res.data.message + '</p>', type: 'error', showConfirmButton: true});
          }
        });
  }
  render() {


    const { isLoading, contas, error } = this.state;

    return (
      <div className="animated fadeIn">
        <h1>Contas
          <Link to="/contas/adicionar"> {/* ADICIONAR ROTA PARA O MECADO LIVRE OAUTH */}
          <Button className="btn btn-primary float-right"> <i className="fa fa-plus-circle" ></i> Adicionar Conta </Button>
          </Link>
        </h1>
        <Row>
          {!isLoading ? (
              contas.map(c=> {
                const { username, name, email } = this.state;
                console.log(c)
                return (
                    <Col xs="12" sm="6" md="3">
                      <Card className="card-accent-primary">
                        <CardHeader>
                          {c.external_data.user_type}
                          <div class="float-right">
                            <Dropdown /*isOpen={objs.dropdownOpen[{j}]} toggle={() => {
                              this.toggle({j});
                            }}*/ size="sm" class="sm-info">
                              <DropdownToggle caret color="primary">
                                Opções
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem><Link to="/renomearconta/{contas.external_data.id}"><i
                                    class="fa fa-edit"></i> Renomear</Link></DropdownItem>
                                <DropdownItem><Link to="/sincronizarConta/{contas.external_data.id}"><i
                                    class="fa fa-refresh"></i> Sincronizar</Link></DropdownItem>
                                <DropdownItem><Link to="/excluirconta/{contas.external_data.id}"><i
                                    class="fa fa-remove"></i> Excluir</Link></DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </CardHeader>
                        <CardBody>
                          <img src={sygnet} class="img-full70 align-content-center" alt="Loja Teste"></img>
                          <p class="text-primary h5 text-center">{c.name}</p>
                          <p class="text-left">
                            <i class="fa fa-envelope"></i> E-mail: {c.external_data.email}<br></br>
                            <i class="fa fa-user"></i> Usuário: {c.external_data.nickname}
                          </p>
                        </CardBody>
                        <CardFooter>
                          <div class="float-right text-right">
                            <span class="text-success h5"></span> Anúncios
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                );
              })
          ) : (
              <h3>Loading...</h3>
          )}
        </Row>

      </div>
    );
  }
}

export default ListaContas;
