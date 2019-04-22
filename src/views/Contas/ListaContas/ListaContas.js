import React, { Component } from 'react';
import {Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import sygnet from '../../../assets/img/brand/sygnet-logo.png'


class ListaContas extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: new Array(7).fill(false),
    }
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
    return (
      <div className="animated fadeIn">
        <h1>Contas</h1>
        <Row>
          <Col xs="12" sm="6" md="3">
            <Card className="card-accent-primary">
              <CardHeader>
                Conta PJ
                <div class="float-right">
                <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggle(0);}} size="sm" class="sm-info">
                  <DropdownToggle caret color="primary">
                    Opções
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><i class="fa fa-edit"></i> Renomear</DropdownItem>
                    <DropdownItem><i class="fa fa-refresh"></i> Sincronizar</DropdownItem>
                    <DropdownItem><i class="fa fa-remove"></i> Excluir</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </div>
              </CardHeader>
              <CardBody>
                <img src={sygnet} class="img-full70 align-content-center" alt="Loja Teste"></img>
                <p class="text-primary h5 text-center">Loja Teste LTDA</p>
                <p class="text-left">
                <i class="fa fa-envelope"></i> E-mail: teste@teste.com<br></br>
                <i class="fa fa-user"></i> Usuário: LojaFulano
                </p>
              </CardBody>
              <CardFooter>
              <div class="text-left float-left">
              <span class="text-success h5">398</span> Vendas
              </div>
              <div class="float-right text-right">
              <span class="text-success h5">254</span> Anúncios
              </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Card className="card-accent-primary">
              <CardHeader>
                Conta PJ
                <div class="float-right">
                <Dropdown isOpen={this.state.dropdownOpen[1]} toggle={() => {this.toggle(1);}} size="sm" class="sm-info">
                  <DropdownToggle caret color="primary">
                    Opções
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><i class="fa fa-edit"></i> Renomear</DropdownItem>
                    <DropdownItem><i class="fa fa-refresh"></i> Sincronizar</DropdownItem>
                    <DropdownItem><i class="fa fa-remove"></i> Excluir</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </div>
              </CardHeader>
              <CardBody>
                <img src={sygnet} class="img-full70 align-content-center" alt="Loja Teste"></img>
                <p class="text-primary h5 text-center">Loja Teste LTDA</p>
                <p class="text-left">
                <i class="fa fa-envelope"></i> E-mail: teste@teste.com<br></br>
                <i class="fa fa-user"></i> Usuário: LojaFulano
                </p>
              </CardBody>
              <CardFooter>
              <div class="text-left float-left">
              <span class="text-success h5">398</span> Vendas
              </div>
              <div class="float-right text-right">
              <span class="text-success h5">254</span> Anúncios
              </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Card className="card-accent-primary">
              <CardHeader>
                Conta PJ
                <div class="float-right">
                <Dropdown isOpen={this.state.dropdownOpen[2]} toggle={() => {this.toggle(2);}} size="sm" class="sm-info">
                  <DropdownToggle caret color="primary">
                    Opções
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><i class="fa fa-edit"></i> Renomear</DropdownItem>
                    <DropdownItem><i class="fa fa-refresh"></i> Sincronizar</DropdownItem>
                    <DropdownItem><i class="fa fa-remove"></i> Excluir</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </div>
              </CardHeader>
              <CardBody>
                <img src={sygnet} class="img-full70 align-content-center" alt="Loja Teste"></img>
                <p class="text-primary h5 text-center">Loja Teste LTDA</p>
                <p class="text-left">
                <i class="fa fa-envelope"></i> E-mail: teste@teste.com<br></br>
                <i class="fa fa-user"></i> Usuário: LojaFulano
                </p>
              </CardBody>
              <CardFooter>
              <div class="text-left float-left">
              <span class="text-success h5">398</span> Vendas
              </div>
              <div class="float-right text-right">
              <span class="text-success h5">254</span> Anúncios
              </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Card className="card-accent-primary">
              <CardHeader>
                Conta PJ
                <div class="float-right">
                <Dropdown isOpen={this.state.dropdownOpen[3]} toggle={() => {this.toggle(3);}} size="sm" class="sm-info">
                  <DropdownToggle caret color="primary">
                    Opções
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><i class="fa fa-edit"></i> Renomear</DropdownItem>
                    <DropdownItem><i class="fa fa-refresh"></i> Sincronizar</DropdownItem>
                    <DropdownItem><i class="fa fa-remove"></i> Excluir</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </div>
              </CardHeader>
              <CardBody>
                <img src={sygnet} class="img-full70 align-content-center" alt="Loja Teste"></img>
                <p class="text-primary h5 text-center">Loja Teste LTDA</p>
                <p class="text-left">
                <i class="fa fa-envelope"></i> E-mail: teste@teste.com<br></br>
                <i class="fa fa-user"></i> Usuário: LojaFulano
                </p>
              </CardBody>
              <CardFooter>
              <div class="text-left float-left">
              <span class="text-success h5">398</span> Vendas
              </div>
              <div class="float-right text-right">
              <span class="text-success h5">254</span> Anúncios
              </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Card className="card-accent-primary">
              <CardHeader>
                Conta PJ
                <div class="float-right">
                <Dropdown isOpen={this.state.dropdownOpen[4]} toggle={() => {this.toggle(4);}} size="sm" class="sm-info">
                  <DropdownToggle caret color="primary">
                    Opções
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><i class="fa fa-edit"></i> Renomear</DropdownItem>
                    <DropdownItem><i class="fa fa-refresh"></i> Sincronizar</DropdownItem>
                    <DropdownItem><i class="fa fa-remove"></i> Excluir</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </div>
              </CardHeader>
              <CardBody>
                <img src={sygnet} class="img-full70 align-content-center" alt="Loja Teste"></img>
                <p class="text-primary h5 text-center">Loja Teste LTDA</p>
                <p class="text-left">
                <i class="fa fa-envelope"></i> E-mail: teste@teste.com<br></br>
                <i class="fa fa-user"></i> Usuário: LojaFulano
                </p>
              </CardBody>
              <CardFooter>
              <div class="text-left float-left">
              <span class="text-success h5">398</span> Vendas
              </div>
              <div class="float-right text-right">
              <span class="text-success h5">254</span> Anúncios
              </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Card className="card-accent-primary">
              <CardHeader>
                Conta PJ
                <div class="float-right">
                <Dropdown isOpen={this.state.dropdownOpen[5]} toggle={() => {this.toggle(5);}} size="sm" class="sm-info">
                  <DropdownToggle caret color="primary">
                    Opções
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><i class="fa fa-edit"></i> Renomear</DropdownItem>
                    <DropdownItem><i class="fa fa-refresh"></i> Sincronizar</DropdownItem>
                    <DropdownItem><i class="fa fa-remove"></i> Excluir</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </div>
              </CardHeader>
              <CardBody>
                <img src={sygnet} class="img-full70 align-content-center" alt="Loja Teste"></img>
                <p class="text-primary h5 text-center">Loja Teste LTDA</p>
                <p class="text-left">
                <i class="fa fa-envelope"></i> E-mail: teste@teste.com<br></br>
                <i class="fa fa-user"></i> Usuário: LojaFulano
                </p>
              </CardBody>
              <CardFooter>
              <div class="text-left float-left">
              <span class="text-success h5">398</span> Vendas
              </div>
              <div class="float-right text-right">
              <span class="text-success h5">254</span> Anúncios
              </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Card className="card-accent-primary">
              <CardHeader>
                Conta PJ
                <div class="float-right">
                <Dropdown isOpen={this.state.dropdownOpen[6]} toggle={() => {this.toggle(6);}} size="sm" class="sm-info">
                  <DropdownToggle caret color="primary">
                    Opções
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><i class="fa fa-edit"></i> Renomear</DropdownItem>
                    <DropdownItem><i class="fa fa-refresh"></i> Sincronizar</DropdownItem>
                    <DropdownItem><i class="fa fa-remove"></i> Excluir</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </div>
              </CardHeader>
              <CardBody>
                <img src={sygnet} class="img-full70 align-content-center" alt="Loja Teste"></img>
                <p class="text-primary h5 text-center">Loja Teste LTDA</p>
                <p class="text-left">
                <i class="fa fa-envelope"></i> E-mail: teste@teste.com<br></br>
                <i class="fa fa-user"></i> Usuário: LojaFulano
                </p>
              </CardBody>
              <CardFooter>
              <div class="text-left float-left">
              <span class="text-success h5">398</span> Vendas
              </div>
              <div class="float-right text-right">
              <span class="text-success h5">254</span> Anúncios
              </div>
              </CardFooter>
            </Card>
          </Col>
          
          
        </Row>

      </div>
    );
  }
}

export default ListaContas;
