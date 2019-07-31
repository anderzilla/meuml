import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class UserTable extends Component {
  constructor(props) {
    super(props);

    this.headBuilder = this.headBuilder.bind(this);
    this.bodyBuilder = this.bodyBuilder.bind(this);
  }

  headBuilder = () => {
    if(this.props.thead !== undefined &&
      this.props.thead !== null &&
      this.props.thead !== '') {
        return this.props.thead.map(col=>{return <th>{col}</th>})
      }
      else return <div />
  }

  bodyBuilder = () => {
    if(this.props.tbody !== undefined &&
      this.props.tbody !== null &&
      this.props.tbody !== '') {
        return this.props.tbody.map(col=>{});
      }
      else return <div />
  }

  render() {
    return(
      <>
        <Table responsive>
          <thead>
            <tr>
              {this.headBuilder}
            </tr>
          </thead>
          <tbody>
            {this.bodyBuilder}
          </tbody>
        </Table>
      </>
    );
  }
}
