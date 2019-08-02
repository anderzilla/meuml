import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  ButtonDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../../auth";
import { AppSwitch } from "@coreui/react";
import Select from "react-select";
import "react-select/dist/react-select.min.css";
import Picky from "react-picky";
import "react-picky/dist/picky.css";
import ReactLoading from "react-loading";

class BloquearComprador extends Component {
  //Adaptar para os valores de motivos de bloqueio
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="12" xl="8">
            <Card className="card-accent-primary" />
          </Col>
        </Row>
      </div>
    );
  }
}
export default BloquearComprador;
