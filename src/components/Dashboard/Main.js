import React from 'react';
import Sales from './Sales';
import SellerStatus from '../widgets/SellerStatus';
import SelectAccount from './buttons/SelectAccount';
import LevelId from '../widgets/LevelId';
import { Data, DataContainer } from './DataContainer';
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
                      <div className="mt-2 mb-3">
                        <SelectAccount/>
                      </div>
                      <div className="ml-3 mt-1">
                        <b><SellerStatus status={provider.state.selectedAccount.seller_reputation.power_seller_status}/></b>
                        <Row>
                          <h6>Nível da conta:</h6>
                          <LevelId levelId={provider.state.selectedAccount.seller_reputation.level_id}/>
                        </Row>
                      </div>
                    <hr/>
                    </CardHeader>
                    <CardBody>
                      <Sales/>
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
