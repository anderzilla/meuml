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
                      <div className="ml-3"><SelectAccount /></div><br/>
                      <h6>{provider.state.selectedAcc.name || 'Nenhuma conta selecionada.'}</h6><hr/>
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
