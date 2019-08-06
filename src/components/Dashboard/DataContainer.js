import React, { Component } from 'react';
export const Data = React.createContext();

export class DataContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      selectedAcc: 'Nenhuma conta selecionada.',
      accReputation: 0,
      accLevel: 0,
      salesData: {
        canceled: 0,
        realyzed: 0,
        total: 0,
        avalition: 0
      },
      salesWithMediation: 0,
      numberOfAccounts: 0,
    }
  }

  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    this.setState({
      accounts: [
        {name:'Conta 1', id: 1, canceled: 1, realyzed: 2, total: 3, salesWithMediation: 1},
        {name:'Conta 2', id: 2},
        {name:'Conta 3', id: 3},
        {name:'Conta 4', id: 4},
      ],
      numberOfAccounts: 4
    });
  }
  
  selectAccount(acc) {
    this.state.accounts.map(account => {
      if(account.id === acc) this.setState({ selectedAcc: account });
    });
  }
  
  render() {
    return(
      <Data.Provider
        value={{
          state: this.state,
          fetchData: () => this.fetchData,
          selectAccount: (acc) => this.selectAccount(acc)
        }}
        >{this.props.children}
      </Data.Provider>
    );
  }
}
