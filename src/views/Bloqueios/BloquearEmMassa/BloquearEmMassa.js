import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Table, Form, Label, FormGroup, Input, Button} from 'reactstrap';
import { Link } from 'react-router-dom';

class BloquearEmMassa extends Component {
  constructor(props) {
    super(props);

    this.nbloqueios = "2048";
    this.nlistas = "48";
    // ...

  }

  render() {


    return (
      <div className="animated fadeIn">
        <h1 className="text-primary">Bloqueios em Massa!</h1>
        <Card>
        <Form name='novaLista'>
          <CardHeader>
            <h2>Criar Lista</h2> 
          </CardHeader>
          <CardBody>
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
            <h2>Listas - {this.nlistas}</h2> 
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
                  <tr>
                    <td>Golpes</td>
                    <td class="text-center"><span class="text-danger">231</span></td>
                    <td class="text-center">Importado facebook</td>
                    <td class="text-center">12/04/2019</td>
                    <td class="text-right">
                    <Link to="/adicionaritemlista" class="btn btn-primary btn-small"><i class="fa fa-user-plus"></i> Adicionar</Link>
                    <Link to="/" class="btn btn-success btn-small"><i class="fa fa-unlock"></i> Desbloquear</Link>
                    <Link to="/" class="btn btn-warning btn-small"><i class="fa fa-refresh"></i> Sincronizar</Link>
                    <Link to="/" class="btn btn-danger btn-small"><i class="fa fa-trash"></i> Excluir</Link>
                    </td>
                  </tr>
                  <tr>
                  <td>Golpes</td>
                    <td class="text-center"><span class="text-danger">231</span></td>
                    <td class="text-center">Importado facebook</td>
                    <td class="text-center">12/04/2019</td>
                    <td class="text-right">
                    <Link to="/adicionaritemlista" class="btn btn-primary btn-small"><i class="fa fa-user-plus"></i> Adicionar</Link>
                    <Link to="/" class="btn btn-success btn-small"><i class="fa fa-unlock"></i> Desbloquear</Link>
                    <Link to="/" class="btn btn-warning btn-small"><i class="fa fa-refresh"></i> Sincronizar</Link>
                    <Link to="/" class="btn btn-danger btn-small"><i class="fa fa-trash"></i> Excluir</Link>
                    </td>
                  </tr>
                  <tr>
                  <td>Golpes</td>
                    <td class="text-center"><span class="text-danger">231</span></td>
                    <td class="text-center">Importado facebook</td>
                    <td class="text-center">12/04/2019</td>
                    <td class="text-right">
                    <Link to="/adicionaritemlista" class="btn btn-primary btn-small"><i class="fa fa-user-plus"></i> Adicionar</Link>
                    <Link to="/" class="btn btn-success btn-small"><i class="fa fa-unlock"></i> Desbloquear</Link>
                    <Link to="/" class="btn btn-warning btn-small"><i class="fa fa-refresh"></i> Sincronizar</Link>
                    <Link to="/" class="btn btn-danger btn-small"><i class="fa fa-trash"></i> Excluir</Link>
                    </td>
                  </tr>
                  <tr>
                  <td>Golpes</td>
                    <td class="text-center"><span class="text-danger">231</span></td>
                    <td class="text-center">Importado facebook</td>
                    <td class="text-center">12/04/2019</td>
                    <td class="text-right">
                    <Link to="/adicionaritemlista" class="btn btn-primary btn-small"><i class="fa fa-user-plus"></i> Adicionar</Link>
                    <Link to="/" class="btn btn-success btn-small"><i class="fa fa-unlock"></i> Desbloquear</Link>
                    <Link to="/" class="btn btn-warning btn-small"><i class="fa fa-refresh"></i> Sincronizar</Link>
                    <Link to="/" class="btn btn-danger btn-small"><i class="fa fa-trash"></i> Excluir</Link>
                    </td>
                  </tr>
                  <tr>
                  <td>Golpes</td>
                    <td class="text-center"><span class="text-danger">231</span></td>
                    <td class="text-center">Importado facebook</td>
                    <td class="text-center">12/04/2019</td>
                    <td class="text-right">
                    <Link to="/adicionaritemlista" class="btn btn-primary btn-small"><i class="fa fa-user-plus"></i> Adicionar</Link>
                    <Link to="/" class="btn btn-success btn-small"><i class="fa fa-unlock"></i> Desbloquear</Link>
                    <Link to="/" class="btn btn-warning btn-small"><i class="fa fa-refresh"></i> Sincronizar</Link>
                    <Link to="/" class="btn btn-danger btn-small"><i class="fa fa-trash"></i> Excluir</Link>
                    </td>
                  </tr>
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
