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
                      <div className="ml-3 mb-3"><SelectAccount/></div>
                      <div className="acc-info">
                        {provider.state.selectedAcc !== 'Nenhuma conta selecionada.' ? (
                          <h6>
                            {provider.state.selectedAcc.name} Nível: {provider.state.selectedAcc.accLevel}
                          </h6>
                        ):(<div/>)}
                      </div><hr/>
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
