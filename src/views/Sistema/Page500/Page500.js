import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';

class Page500 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <span className="clearfix">
                <h1 className="float-left display-3 mr-4">500</h1>
                <h4 className="pt-3">Houston, nós temos um problema!</h4>
                <p className="text-muted float-left">A página requisitada está temporariamente indisponível.</p>
                <Link to="/dashboard">
                  <Button type="submit" color="primary">Voltar</Button>
                </Link>
              </span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page500;
