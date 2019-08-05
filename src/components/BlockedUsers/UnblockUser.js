import React from "react";
import Swal from "sweetalert2";
import { Row } from 'reactstrap';
import api from '../../services/api';
import Data, { DataContainer } from './DataContainer';

class UnblockUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: '',
      selectedAcc: '',
      data: []
    }
    this.handleChanges = this.handleChanges.bind(this);
    this.unblockUser = this.unblockUser.bind(this);
  }

  handleChanges(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async unblockUser() {
    try {
      let data = await this.setData();
      const res = await api.post('/blacklist', data);
      const validation = await this.validate(res);
    } catch (error) {
      Swal.fire({
        html: `<p>${error}</p>`,
        type: 'error',
        showCloseButton: true
      });
    }
    
  }

  setAccountId(id) {
    this.setState({ selectedAcc: id });
    this.unblockUser();
  }

  setData() {
    const data = [{
      "account_id": this.state.selectedAcc,
      "bids": false,
      "customer_id": `${this.state.customerId}`,
      "questions": false,
      "motive_id": 1
    }];
    return data;
  }
  
  validate(response) {
    if (response.data.status === 'success') {
      Swal.fire({
        html: `<p>Usuário desbloqueado.</p>`,
        type: 'success',
        showCloseButton: true
      });
      return 'success'
    } else {
      Swal.fire({
        html:`<p>Falha ao desbloquear usuário.`,
        type:'error',
        showCloseButton: true
      });
      return 'error'
    }
  }

  render() {
    return(
      <DataContainer>
        <Row className="form-group ml-3">
          <input
            className="form-control col-md-2"
            onChange={this.handleChanges}
            value={this.state.customerId}
            name="customerId"
            type="text"
          />
          <Data.Consumer>
            {(provider) => {return(
            <button
              className="btn btn-primary btn-sm ml-1"
              onClick={()=>this.setAccountId(provider.state.selectedAcc)}
              >Desbloquear
            </button>
            );}}
          </Data.Consumer>
        </Row>
      </DataContainer>
    );
  }
}

export default UnblockUser;