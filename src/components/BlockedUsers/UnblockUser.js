import React from "react";
import Swal from "sweetalert2";
import { Row } from 'reactstrap';
import * as fetch from './fetch';
import Data, { DataContainer } from './DataContainer';

class UnblockUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accId: 75,
      customerId: ''
    }

    this.handleChanges = this.handleChanges.bind(this);
    this.unblockUser = this.unblockUser.bind(this);
  }

  handleChanges(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async unblockUser() {
    try {
      const res = await fetch.UnblockUser(this.state.accId, this.state.customerId);
    } catch (error) {
      Swal.fire({
        html: `<p>${error}</p>`,
        type: 'error',
        showCloseButton: true
      });
    }
  }

  render() {
    return(
      <Row className="form-group ml-3">
        <input
          className="form-control col-md-2"
          onChange={this.handleChanges}
          value={this.state.userInput}
          name="customerId"
          type="text"
        />
        <button
          className="btn btn-primary btn-sm ml-1"
          onClick={this.unblockUser}
        > Desbloquear
        </button>
      </Row>
    );
  }
}

export default UnblockUser;