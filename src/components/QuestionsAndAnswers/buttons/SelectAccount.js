import React, { Component } from 'react';
import { fetchAccounts } from '../fetch';
import { BtnGroup, DropDown } from '../../buttons/ButtonGroup';

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

  updateAccounts = () => {
    fetchAccounts().then(res=>{
      this.setState({
        isLoading: false,
        loadingAcc: false,
        accounts: res.accounts,
        totalOfAcc: res.accounts.length
      });
    }).catch(err=>{console.log(err)})
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
                      onClick={()=>{
                        this.updateAccounts()
                        this.props.onClick()
                      }}
                      key={acc.key}
                      id={acc.id}
                      >{acc.name} ({acc.numberOfQuests})
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
