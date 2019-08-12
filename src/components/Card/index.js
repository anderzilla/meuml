import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Col, Fade } from 'reactstrap';

export default class Carton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeIn: true,
      timeout: 300
    }
  }

  componentWillMount() {
    this.setState({
      fadeIn: this.props.fadeIn,
      timeout: this.props.timeout
    });
  }

  render() {
    return (
      <>
        <Col xs={this.props.xs} sm={this.props.sm} md={this.props.md} key={this.props.key}>
          <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
            <Card className={this.props.className}>
              <CardHeader className={this.props.className}>
                {this.props.header}
              </CardHeader>
              <CardBody className={this.props.className}>
                {this.props.children}
              </CardBody>
            </Card>
            </Fade>
          </Col>
      </>
    );
  }
}