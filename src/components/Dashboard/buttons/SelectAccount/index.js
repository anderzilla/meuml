import React from "react";
import { ButtonGroup,  Row } from 'reactstrap';
import DropDown from '../DropDown';
import { Data } from '../../../../containers/Data';

const SelectAccount = () => {
  return (
    <Data.Consumer>
      {provider => {
        if (provider.state.accountsFound === 0) {return <h6>Nenhuma conta do ML encontrada.</h6>;
        
        } else if (provider.state.accountsFound === 1) {
          return <button className="btn btn-success btn-sm"
                  onClick={() => provider.selectAccount(provider.state.accounts[0].id)}
                  >{provider.state.accounts[0].name}
                 </button>
      
        } else if (provider.state.accountsFound === 2 || provider.state.accountsFound === 3) {
          return <ButtonGroup>
                  {provider.state.accounts.map(acc => {
                    return <button className="btn btn-secondary btn-sm"
                            onClick={() => provider.selectAccount(acc.id)}
                            >{acc.name}
                           </button>
                  })}
                </ButtonGroup>
        
        } else if(provider.state.accountsFound >= 4) {
          return (
            <Row>
              <DropDown color="secondary" title="Selecionar Conta">
                {provider.state.accounts.map((acc, key) => {
                  return (
                    <button
                      className="dropdown dropdown-item"
                      key={key}
                      onClick={()=> provider.selectAccount(acc.id)}
                      >{acc.name}
                    </button>
                  )}
                )}
              </DropDown>
            </Row>          
          );
        }                
      }}
    </Data.Consumer>
  );
};

export default SelectAccount;
