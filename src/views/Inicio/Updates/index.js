import React, { useEffect, useState } from "react";
import { Col, Card, CardBody, Row, CardGroup } from "reactstrap";
import Logo from "../Logo";

function Item(props) {
  return (
    <Col xs="1" sm lg md="3">
      <Card fade color={props.color}>
        <CardBody>
          <IconWithTitle info={props.title} />
          <Content info={props.content} />
        </CardBody>
      </Card>
    </Col>
  );
}

export default function Updates() {
  return (
    <CardGroup>
      <Item title={0} content={0} color={"dark"} />
      <Item title={1} content={1} color={"success"} />
      <Item title={2} content={2} color={"secondary"} />
      <Item title={3} content={3} color={"danger"} />
      <Item title={4} content={4} color={"warning"} />
    </CardGroup>
  );
}

const IconWithTitle = props => {
  if (props.info === 0)
    return (
      <i className="fa fa-cog fa-4x mr-3">
        <h4>Este é o MeuML.com Versão 2!</h4>
      </i>
    );
  else if (props.info === 1)
    return (
      <i className="fa fa-pagelines fa-4x">
        <h5>Novidades</h5>
      </i>
    );
  else if (props.info === 2)
    return (
      <i className="fa fa-user fa-4x">
        <h5>Multicontas</h5>
      </i>
    );
  else if (props.info === 3)
    return (
      <i className="fa fa-balance-scale fa-4x">
        <h5>Pesos e Dimensões</h5>
      </i>
    );
  else if (props.info === 4)
    return (
      <i className="fa fa-ban fa-4x">
        <h5>Bloqueios</h5>
      </i>
    );
  else return <div />;
};

const Content = props => {
  if (props.info === 0)
    return (<>
      <p>
        Nesta nova versão teremos muito mais flexibilidade e agilidade para
        desenvolver novas ferramentas para você, vendedor.
      </p>
    </>);
  else if (props.info === 1)
    return (<>
      <p>
        Para começar, aproveite para usar nossas ferramentas gratuitas, que em
        breve publicaremos novas funcionalidades!
      </p><br/><br/>
    </>);
  else if (props.info === 2)
    return (<>
      <p>
        A versão 2 do MeuML.com continua Multicontas, assim como já era na
        versão 1. Fique a vontade para adicionar quantas contas quiser!
      </p>
    </>);
  else if (props.info === 3)
    return (<>
      <p>
        Acompanhe os pesos e dimensões de todas as categorias do MercadoLivre,
        de forma gratuita!
      </p><br/><br/><br/>
    </>);
  else if (props.info === 4)
    return (<>
      <p>
        Bloqueie compradores indesejados de forma simples e rápida, em várias
        contas ao mesmo tempo, de forma gratuita!
      </p><br/><br/><br/><br/>
    </>);
  else return <div />;
};
