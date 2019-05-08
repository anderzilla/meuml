import React, { Component } from 'react';
import {Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, CardFooter, CardHeader, Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';
import axios from 'axios';
import sygnet from '../../../assets/img/brand/sygnet-logo.png';



class ListaContas extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: new Array(7).fill(false),
    }

    this.setState = {
      token: getToken(),
      status: '',
      message: '',
      total: '',
      page: '',
      totalPages: '',
      limit: '',

    }
    
    axios.get(`https://api.app2.meuml.com/accounts`, { headers: {"Authorization" : 'Bearer '+getToken()}
    })
    .then(res => {
      if (res.data.status === 'success'){
        const message = res.data.message;
        //PAGINAÇÃO
        const total = res.data.meta.total;
        const page = res.data.meta.page;
        const totalPages = res.data.meta.pages;
        const limit = res.data.meta.limit;

        //this.setState({message,total, page, limit, totalPages});
        
        if (total !== 0){
          //DADOS DAS CONTAS
          const contas = res.data.data;
          this.setState({contas, page, totalPages, limit});
        }else{
          Swal.fire({html:'<p>'+message+'</p>', type: 'info', showConfirmButton: true});  
        }
        
        
      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
      
      console.log(res);
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
    /* CARREGALISTAGEM DE CONTAS ML */
    let contas = []
    for(let i=0; i<this.state.total; i++){
      contas.push(
        <Col xs="12" sm="6" md="3">
        <Card className="card-accent-primary">
          <CardHeader>
            {contas.external_data.user_type}
            <div class="float-right">
            <Dropdown isOpen={this.state.dropdownOpen[{i}]} toggle={() => {this.toggle({i});}} size="sm" class="sm-info">
              <DropdownToggle caret color="primary">
                Opções
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem><Link to="/renomearconta/{contas.external_data.id}"><i class="fa fa-edit"></i> Renomear</Link></DropdownItem>
                <DropdownItem><Link to="/sincronizarConta/{contas.external_data.id}"><i class="fa fa-refresh"></i> Sincronizar</Link></DropdownItem>
                <DropdownItem><Link to="/excluirconta/{contas.external_data.id}"><i class="fa fa-remove"></i> Excluir</Link></DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </div>
          </CardHeader>
          <CardBody>
            <img src={sygnet} class="img-full70 align-content-center" alt="Loja Teste"></img>
            <p class="text-primary h5 text-center">{contas.name}</p>
            <p class="text-left">
            <i class="fa fa-envelope"></i> E-mail: {contas.email}<br></br>
            <i class="fa fa-user"></i> Usuário: {contas.nickname}
            </p>
          </CardBody>
          <CardFooter>
          <div class="text-left float-left">
          <span class="text-success h5">{contas.seller_reputation.transactions.completed}</span> Vendas
          </div>
          <div class="float-right text-right">
          <span class="text-success h5"></span> Anúncios
          </div>
          </CardFooter>
        </Card>
      </Col>
      )
    }

    return (
      <div className="animated fadeIn">
        <h1>Contas
          <Link to="/contas/authorize"> {/* ADICIONAR ROTA PARA O MECADO LIVRE OAUTH */}
          <Button className="btn btn-primary float-right"> <i className="fa fa-plus-circle" ></i> Adicionar Conta </Button>
          </Link>
        </h1>
        <Row>
          {contas}
        </Row>

      </div>
    );
  }
}

export default ListaContas;
