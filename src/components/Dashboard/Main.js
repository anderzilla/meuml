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
          let sellerStatus = provider.state.selectedAccount.seller_reputation.power_seller_status;
          let levelId = provider.state.selectedAccount.seller_reputation.level_id;
          let accountName = provider.state.selectedAccount.seller_reputation.account_name || '-';
          return(
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
                          <h4 className="mr-3">{accountName}</h4>
                          <SellerStatus status={sellerStatus}/>
                        </Row>
                        <Row>
                          <h6>Nível da conta:</h6>
                          <SellerReputation levelId={levelId}/>
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
          )}
        }
      </Data.Consumer>
    </DataContainer>
  );
}

export default Main;
