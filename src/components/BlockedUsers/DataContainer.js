import React, { Component } from "react";
import Swal from "sweetalert2";
import * as fetch from "./fetch";
const Data = React.createContext();

export class DataContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      blacklist: [],
      message: "",
      numberOfAcc: 0,
      paginationSize: 0,
      status: null
    };
  }

  componentDidMount() {
    fetch.Accounts().then(res => {
      this.setState({
        accounts: res.accounts,
        numberOfAcc: res.numberOfAcc
      });
    });
  }

  updateBlacklist = async id => {
    try {
      const response = await fetch.BlackList(id);
      if (response !== undefined) {
        const blacklist = response.data;
        const paginationSize = response.meta.total;
        const status = response.status;
        const message = response.message;
        this.setState({ blacklist, paginationSize, status, message });
      }
    } catch (error) {
      Swal.fire({
        html: `<p>${error}</p>`,
        type: "error",
        showCloseButton: true
      });
    }
  };

  render() {
    return (
      <Data.Provider
        value={{
          state: this.state,
          updateBlacklist: id => this.updateBlacklist(id),
          handleState: ()=> this.props.handleState
        }}
      >
        {this.props.children}
      </Data.Provider>
    );
  }
}

export default Data;