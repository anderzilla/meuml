import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Transactions from './Transactions';
import SellerReputation from './SellerReputation';
import SelectAccount from './buttons/SelectAccount';
import SellerMetrics from './SellerMetrics';
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
              <Row id="main-row">
                <Col id="main-col">
                  <Card id="main-card">
                    <CardHeader id="card-header">
                      <SelectAccount 
                        id="select-account"
                      />
                    </CardHeader>
                    <CardBody id="card-body">
                      <div id="avatar">
                        <h4 id="avatar-title">
                          {provider.state.selectedAccount.name}
                        </h4>
                        <SellerReputation
                          id="seller-reputation"
                        />
                      </div>
                    <hr/>
                      <Transactions
                        id="seller-transactions"
                      />
                      <hr/>
                      <SellerMetrics />
                      <hr/>
                      <Rating
                        id="seller-rating"
                      />
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
