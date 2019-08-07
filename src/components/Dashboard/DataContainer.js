import React, { Component } from 'react';
import api from '../../services/api';
import data from './_data';
import Swal from 'sweetalert2';
export const Data = React.createContext();

export class DataContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      accountsFound: 0,
      selectedAccount:{
        "seller_reputation": {
          "level_id": "",
          "power_seller_status": "none",
          "transactions": {
            "canceled": 0,
            "completed": 0,
            "period": "",
            "ratings": {
              "negative": 0,
              "neutral": 0,
              "positive": 0
            },
            "total": 0
          },
          "metrics": {
            "sales": {
              "period": "",
              "completed": 0
            },
            "claims": {
              "period": "",
              "rate": 0
            },
            "delayed_handling_time": {
              "period": "",
              "rate": 0
            },
            "cancellations": {
              "period": "",
              "rate": 0
            }
          }
        }
      },
      isLoading: true
    }
  }

  componentDidMount() {
    this.fetchAccounts();
  }
  
  fetchAccounts = async () => {
    try {
      const response = await api.get('/accounts');
      const {accounts, total } = this.filterJSON(response);
      this.setState({
        accounts: accounts,
        accountsFound: total,
        isLoading: false
      });
    } catch (error) {
      Swal.fire({
        html: `<p>${error}</p>`,
        type: 'error',
        showCloseButton: true
      });
    }
  }
  
  selectAccount(accountId) {
    console.log(accountId);
    this.setState({ selectedAccount: data });
    // api.get('/metricas/accountId').then(response => {
    //   this.setState({ selectedAccount: response.data });
    // }).catch(error => Swal.fire({ 
    //   html: `<p>${error}</p>`,
    //   type: 'error',
    //   showCloseButton: true
    // }));
  }

  filterJSON = (response) => {
    if(response.status === 200) {
      const accounts = response.data.data.map(account => {
        return {
          name: account.name,
          id: account.id,
          external_id: account.external_id,
        }
      });
      const total = response.data.data.length;
      return {accounts, total};
    } else return false;
  }
  
  render() {
    return(
      <Data.Provider
        value={{
          state: this.state,
          fetchAccounts: () => this.fetchAccounts,
          selectAccount: (accountId) => this.selectAccount(accountId)
        }}
        >{this.props.children}
      </Data.Provider>
    );
  }
}
