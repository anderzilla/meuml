import React from "react";
import { ButtonGroup,  Row } from 'reactstrap';
import DropDown from '../DropDown';
import { Data } from '../../../../containers/Data';
import './index.css';

const SelectAccount = () => {
  return (
    <Data.Consumer>
      {provider => {
        if (provider.state.accountsFound === 0) {return <h6>Nenhuma conta do ML encontrada.</h6>;
        
        } else if (provider.state.accountsFound === 1) {
          return <button className="btn btn-primary btn-sm"
                  id="button"
                  onClick={() => provider.selectAccount(provider.state.accounts[0].id)}
                  >{provider.state.accounts[0].name}
                 </button>
      
        } else if (provider.state.accountsFound === 2 || provider.state.accountsFound === 3) {
          return <ButtonGroup id="button-group">
                  {provider.state.accounts.map(acc => {
                    return <button className="btn btn-primary btn-sm"
                            onClick={() => provider.selectAccount(acc.id)}
                            >{acc.name}
                           </button>
                  })}
                </ButtonGroup>
        
        } else if(provider.state.accountsFound >= 4) {
          return (
            <Row>
              <DropDown id="button" color="primary" title="Selecionar Conta">
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
