import React from 'react';
import Rating from './Rating';
import Transactions from './Transactions';
import SellerStatus from '../widgets/SellerStatus';
import SelectAccount from './buttons/SelectAccount';
import SellerReputation from '../widgets/SellerReputation';
import { Data, DataContainer } from '../../containers/Data';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const Main = () => {
  return (
    <DataContainer>
      <Data.Consumer>
        {(provider) => { return(
          provider.state.isLoading ? <p>Carregando ...</p> : provider.state.accountsFound > 0 ? (
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <div className="mt-2 mb-3" style={{textAlign: 'right'}}>
                        <SelectAccount />
                      </div>
                      <hr/>
                    </CardHeader>
                    <CardBody>
                      <div className="ml-3 mb-3">
                        <Row>
                          <h4 className="mr-3">{provider.state.selectedAccount.name || 'Selecione uma conta'}</h4>
                          <SellerStatus status={provider.state.selectedAccount.external_data.seller_reputation.power_seller_status}/>
                        </Row>
                        <Row>
                          <h6>Nível da conta:</h6>
                          <SellerReputation levelId={provider.state.selectedAccount.external_data.seller_reputation.level_id}/>
                        </Row>
                      </div>
                      <Rating />
                      <hr />
                      <Transactions />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
            ):(
              <p>Você não possui nenhuma conta do ML cadastrada.</p>
            ))}}
      </Data.Consumer>
    </DataContainer>
  );
}

export default Main;
