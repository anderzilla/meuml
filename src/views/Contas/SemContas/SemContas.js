import React, { Component } from 'react';
import {
  Button,
} from "reactstrap";
import {Link} from "react-router-dom";

class SemContas extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="animated fadeIn">
          <h1>Você não tem nenhuma conta do mercado livre cadastrada
          </h1>
          <p>
            Para acessar esté modulo é necessário pelo menos um conta do Mercado Livre cadastrada.
          </p>
          <Link to="/contas/adicionar"> {/* ADICIONAR ROTA PARA O MECADO LIVRE OAUTH */}
            <Button className="btn btn-primary"> <i className="fa fa-plus-circle" ></i> Adicionar Conta </Button>
          </Link>
        </div>

    );
  }
}

export default SemContas;
