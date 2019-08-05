import React from './node_modules/react';
import Sales from './Sales';
import { Data, DataContainer } from './DataContainer';
import { Card, CardBody, CardHeader, Col, Row } from './node_modules/reactstrap';

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
                      <h4>Painel de Controle</h4>
                    </CardHeader>
                    <CardBody>
                      <Sales 
                        canceled={provider.state.salesData.canceled}
                        realyzed={provider.state.salesData.realyzed}
                        salesWithMediation={provider.state.salesWithMediation}
                        total={provider.state.salesData.total}
                      />
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
