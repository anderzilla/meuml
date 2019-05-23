import React, { Component } from 'react';
import { 
  ButtonDropdown, DropdownMenu, DropdownToggle, DropdownItem,
  Card, CardBody, Row } from 'reactstrap';

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Row className="align-items-center">
              <ButtonDropdown isOpen={true} >
                <DropdownToggle caret>
                  Conta
                </DropdownToggle>
                <DropdownMenu left>
                  <DropdownItem >Conta 1</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown >
                <DropdownToggle caret>
                  Status
                </DropdownToggle>
              </ButtonDropdown>
 
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Dashboard;
