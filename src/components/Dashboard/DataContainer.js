import React, { Component } from './node_modules/react';
export const Data = React.createContext();

export class DataContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAcc: '',
      accReputation: 0,
      accLevel: 0,
      salesData: {
        canceled: 0,
        realyzed: 0,
        total: 0,
        avalition: 0
      },
      salesWithMediation: 0
    }
  }

  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    this.setState({
      selectedAcc: 'Conta 1',
      accReputation: 'gold',
      accLevel: '4',
      salesData: {
        canceled: 3,
        realyzed: 300,
        total: 303,
        avalition: 10
      },
      salesWithMediation: 1
    });
  }
  
  render() {
    return(
      <Data.Provider
        value={{
          state: this.state,
          fetchData: () => this.fetchData
        }}
        >{this.props.children}
      </Data.Provider>
    );
  }
}
