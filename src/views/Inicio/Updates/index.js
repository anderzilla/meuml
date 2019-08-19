import React, { useEffect, useState } from 'react';
import { Col, Card, CardBody, Row } from 'reactstrap';

export default function Updates() {
  const [info, setInfo] = useState(0);
  useEffect(() => {
    if (info > 3) setInfo(0);
    else {
      setTimeout(() => {
        let nextInfo = info + 1;
        setInfo(nextInfo);
      }, 5000);
    }
  }, [info]);
  return(
    <Col style={{marginLeft:'25%', marginTop:'5%'}} md="6">
      <Card fade color="primary">
        <CardBody>
          <IconWithTitle info={info}/>
          <Content info={info} />
        </CardBody>
      </Card>
    </Col>
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
      <i className="fa fa-user fa-4x">
        <h5>Multicontas</h5>
      </i>
    );
  else if (props.info === 2)
    return (
      <i className="fa fa-balance-scale fa-4x">
        <h5>Pesos e Dimensões</h5>
      </i>
    );
  else if (props.info === 3)
    return (
      <i className="fa fa-ban fa-4x">
        <h5>Bloqueios</h5>
      </i>
    );
  else return <div />;
};

const Content = props => {
  if (props.info === 0)
    return (
      <p>
        Nesta nova versão teremos muito mais flexibilidade e agilidade para
        desenvolver novas ferramentas para você, vendedor. Para começar,
        aproveite para usar nossas ferramentas gratuitas, que em breve
        publicaremos novas funcionalidades!
      </p>
    );
  else if (props.info === 1)
    return (
      <p>
        A versão 2 do MeuML.com continua Multicontas, assim como já era na
        versão 1. Fique a vontade para adicionar quantas contas quiser!
      </p>
    );
  else if (props.info === 2)
    return (
      <p>
        Acompanhe os pesos e dimensões de todas as categorias do MercadoLivre,
        de forma gratuita!
      </p>
    );
  else if (props.info === 3)
    return (
      <p>
        Bloqueie compradores indesejados de forma simples e rápida, em várias
        contas ao mesmo tempo, de forma gratuita!
      </p>
    );
  else return <div />;
};