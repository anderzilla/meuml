import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../auth';
export const Data = React.createContext();

export class DataContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      isLoading: true,
    }
  }
  
  componentDidMount() {
    this.fetchAccounts();
  }

  fetchAccounts() {
    axios.get(process.env.REACT_APP_API_URL + `/accounts`, {
      headers: { Authorization: "Bearer " + getToken() }})
    .then(response => {
      if (response.status === 200) {
        this.setState({
          accounts: response.data.data,
          isLoading: false
        });
      }
    }).catch(err => console.log(err));
  }

  render() {
    return(
      <Data.Provider 
        value={{
            state: this.state,
            fetchAccounts: () => this.fetchAccounts,
          }}
        >{this.props.children}
      </Data.Provider>
    );
  }
}