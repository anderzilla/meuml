import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Transactions from './Transactions';
import SellerStatus from '../widgets/SellerStatus';
import SelectAccount from './buttons/SelectAccount';
import SellerReputation from '../widgets/SellerReputation';
import { Data, DataContainer } from '../../containers/Data';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import './main.css';

const Main = () => {
  return (
    <DataContainer>
      <Data.Consumer>
        {(provider) => { 
          return(
            provider.state.isLoading ? <p>Carregando ...</p> : provider.state.accountsFound > 0 ? (
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <SelectAccount />
                    </CardHeader>
                    <CardBody>
                      <div id="main">
                        <Row>
                          <SellerStatus />
                        </Row>
                        <h4>{provider.state.selectedAccount.name}</h4>
                        <SellerReputation />
                      </div>
                      <br/>
                      <Rating />
                      <hr />
                      <Transactions />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
            ):(
              <p>Você não possui nenhuma <Link to={'/listacontas'}>conta</Link> do ML cadastrada.</p>
            ))}}
      </Data.Consumer>
    </DataContainer>
  );
}

export default Main;
