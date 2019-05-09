import React, { Component } from 'react';
import {Card, CardBody, CardFooter, CardHeader, Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';
import axios from 'axios';
import sygnet from '../../../assets/img/brand/sygnet-logo.png';



class ListaContas extends Component {
  
  state = {
      isLoading: true,
      contas: [],
      total: 0,
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

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
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

                //console.log(c.external_data);
                //let str = c.external_data.replace('\'','"')

                //console.log(str);
                const externaldata = JSON.stringify(c.external_data);
                
                const { username, name, email } = this.state;
                console.log(externaldata)
                return (
                    <Col xs="12" sm="6" md="3">
                      <Card className="card-accent-primary">
                        <CardHeader>
                          {c.name}
                        </CardHeader>
                        <CardBody>
                          <img src={sygnet} class="img-full70 align-content-center" alt="Loja Teste"></img>
                          <p class="text-primary h5 text-center">{c.external_name}</p>
                          <p class="text-left">
                            <i class="fa fa-envelope"></i> E-mail: {c.external_data.email}<br></br>
                            <i class="fa fa-user"></i> Usuário: <b>{c.external_data.nickname}</b>
                          </p>
                          <div className="align-content-center">
                          <Link to={'/renomearconta/'+c.id} className="btn btn-outline-primary btn-sm" title="Renomear">Renomear</Link>
                          <Link to={'/sincronizarConta/'+c.id} className="btn btn-outline-primary btn-sm" title="Sincronizar">Sincronizar</Link>
                          <Link to={'/excluirconta/'+c.id} className="btn btn-outline-primary btn-sm">Excluir</Link>
                          </div>
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
