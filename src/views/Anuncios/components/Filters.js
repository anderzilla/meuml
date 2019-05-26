import React from 'react';
import {
  Button, Card, CardBody, Row, 
} from 'reactstrap';
import ButtomMenu from './ButtomMenu';

export default (props) => (
  <Card>
    <CardBody>
      <Row className="align-items-center">
        <ButtomMenu 
          title="Conta"
          options={ [ "Conta1", "Conta2" ]}
        />
        <ButtomMenu 
          title="Status"
          options={ [ "Status1", "Status2" ]}
        />
        <ButtomMenu 
          title="Frete Grátis"
          options={ [ "Frete1", "Frete2" ]}
        />
        <ButtomMenu 
          title="Listagem"
          options={ [ "Listagem1", "Listagem2" ]}
        />
        <ButtomMenu 
          title="Produto"
          options={ [ "Produto1", "Produto2" ]}
        />
        <ButtomMenu 
          title="Ordenar por"
          options={ [ "Nome", "Preço" ]}
        />
        <Button color="primary"><i className="fa fa-filter"></i> Filtrar Anúncios</Button>
      </Row>
    </CardBody>
  </Card>
);

