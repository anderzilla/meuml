import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Table, Button} from 'reactstrap';





class MeusBloqueios extends Component {

  constructor(props) {
    super(props);

    this.nbloqueios = "2048";

    // ...

  }


  render() {
    return (
      <div className="animated fadeIn">
        <h1 className="text-primary">Meus Bloqueios!</h1>
        <Card>
          <CardHeader>
            <h2>Bloqueios - {this.nbloqueios}</h2> 
          </CardHeader>
          <CardBody>
          <Table responsive>
                  <thead>
                  <tr>
                    <th>ID do Usuario</th>
                    <th class="text-center">Compras</th>
                    <th class="text-center">Perguntas</th>
                    <th>Motivo</th>
                    <th class="text-center">Ação</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>100</td>
                    <td class="text-center"><i class="fa fa-ban text-danger"></i></td>
                    <td class="text-center"><i class="fa fa-ban text-danger"></i></td>
                    <td>qwerty qwerty qwerty</td>
                    <td>
                    <Button class="btn btn-danger btn-small"><i class="fa fa-unlock"></i> Desbloquear</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>101</td>
                    <td class="text-center"><i class="fa fa-ban text-danger"></i></td>
                    <td class="text-center"><i class="fa fa-check text-success"></i></td>
                    <td>qwerty qwerty qwerty</td>
                    <td>
                    <Button class="btn btn-danger btn-small"><i class="fa fa-unlock"></i> Desbloquear</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>102</td>
                    <td class="text-center"><i class="fa fa-ban text-danger"></i></td>
                    <td class="text-center"><i class="fa fa-ban text-danger"></i></td>
                    <td>qwerty qwerty qwerty</td>
                    <td>
                    <Button class="btn btn-danger btn-small"><i class="fa fa-unlock"></i> Desbloquear</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>103</td>
                    <td class="text-center"><i class="fa fa-check text-success"></i></td>
                    <td class="text-center"><i class="fa fa-ban text-danger"></i></td>
                    <td>qwerty qwerty qwerty</td>
                    <td>
                    <Button class="btn btn-danger btn-small"><i class="fa fa-unlock"></i> Desbloquear</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>104</td>
                    <td class="text-center"><i class="fa fa-check text-success"></i></td>
                    <td class="text-center"><i class="fa fa-ban text-danger"></i></td>
                    <td>qwerty qwerty qwerty</td>
                    <td>
                    <Button class="btn btn-danger btn-small"><i class="fa fa-unlock"></i> Desbloquear</Button>
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

export default MeusBloqueios;
