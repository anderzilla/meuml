import React, { Component } from 'react';
import { fetchAccounts, fetchQuestions } from './fetch';
import { BtnGroup, DropDown } from '../../components/buttons/ButtonGroup';

class SelectAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      advertisings: [],
      totalOfAds: 0,
      totalOfAcc: 0,
      isLoading: true,
      loadingAcc: true
    };
  }

  componentDidMount() {
    this.updateAccounts();
  }

  updateAccounts = async () => {
    try {
      const res = await fetchAccounts();
      this.setState({
        isLoading: false,
        loadingAcc: false,
        accounts: res.accounts,
        totalOfAcc: res.accounts.length
      });
      console.log(this.state)
    } catch (error) {
      
    }
  }

  render() {
    return(
        <>
        {
        this.state.isLoading ? <span>Loading ...</span> : (
          this.state.loadingAcc ? <span>Loading ...</span> : (
            this.state.accounts.length <= 3 && this.state.accounts.length > 0 ? (
              <BtnGroup className="btn btn-primary">
                {this.state.accounts.map(acc => {
                  return (
                    <button className="btn btn-primary btn-sm"
                      onClick={this.props.onClick}
                      key={acc.key}
                      id={acc.id}
                      >{acc.name} ({acc.numberOfQuestions})
                    </button>
                  );
                })}
              </BtnGroup>
          ):(this.state.accounts.length > 3 ? (
              <DropDown
                title="Minhas Contas"
                >{this.state.accounts.map(acc => {
                  return (
                    <button
                      className="dropdown dropdown-item"
                      onClick={this.props.onClick}
                      >{acc.name} ({acc.numberOfQuestions})
                    </button>
                  );
                })}
              </DropDown>
          ):(<div>Você não possui contas sincronizadas.</div>)) 
          )
        )
        }
      </>
    );
  }
}

export default SelectAccount;