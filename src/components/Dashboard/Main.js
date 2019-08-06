import React from 'react';
import Sales from './Sales';
import SelectAccount from './buttons/SelectAccount';
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
                      <h5>Painel de Controle: </h5><br/>
                      <h6>{provider.state.selectedAcc.name || 'Nenhuma conta selecionada.'}</h6><hr/>
                      <SelectAccount />
                    </CardHeader>
                    <CardBody>
                      <Sales 
                        canceled={provider.state.selectedAcc.canceled}
                        realyzed={provider.state.selectedAcc.realyzed}
                        salesWithMediation={provider.state.selectedAcc.salesWithMediation}
                        total={provider.state.selectedAcc.total}
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
