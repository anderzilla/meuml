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
      selectedAccount: [],
      accountsFound: 0
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
          accountsFound: response.data.data.length,
          selectedAccount: response.data.data[0],
          isLoading: false
        });
        console.log(this.state);
      }
    }).catch(err => console.log(err));
  }

  selectAccount = id => {
    const selectedAccount = this.state.accounts.map(account => {
      if (account.id === id) return account;
    });
    this.setState({ selectedAccount: selectedAccount });
  }

  render() {
    return(
      <Data.Provider 
        value={{
            state: this.state,
            fetchAccounts: () => this.fetchAccounts,
            selectAccount: (id) => this.selectAccount(id)
          }}
        >{this.props.children}
      </Data.Provider>
    );
  }
}