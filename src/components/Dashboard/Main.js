import React from 'react';
import Rating from './Rating';
import Transactions from './Transactions';
import SellerStatus from '../widgets/SellerStatus';
import SelectAccount from './buttons/SelectAccount';
import { Data, DataContainer } from './DataContainer';
import SellerReputation from '../widgets/SellerReputation';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const Main = () => {
  return (
    <DataContainer>
      <Data.Consumer>
        {(provider) => {
          return(
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <div className="mt-2 mb-3" style={{textAlign: 'right'}}>
                        <SelectAccount />
                      </div>
                      <div className="ml-3">
                        <h4>{provider.state.selectedAccount.seller_reputation.account_name || '-'}</h4>
                        <Row>
                          <h6>Nível da conta:</h6>
                          <SellerReputation
                            levelId={provider.state.selectedAccount.seller_reputation.level_id}/>
                        </Row>
                        <SellerStatus 
                          status={provider.state.selectedAccount.seller_reputation.power_seller_status}/>
                      </div>
                      <hr/>
                    </CardHeader>
                    <CardBody>
                      <Rating />
                      <Transactions />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        }
      </Data.Consumer>
    </DataContainer>
  );
}

export default Main;
