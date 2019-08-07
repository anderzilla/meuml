import React from "react";
import { ButtonGroup,  Row } from 'reactstrap';
import DropDown from '../DropDown';
import { Data } from '../../DataContainer';

const SelectAccount = () => {
  return (
    <Data.Consumer>
      {context => {
        if (context.state.accountsFound === 0) {return <h6>Nenhuma conta do ML encontrada.</h6>;
        
        } else if (context.state.accountsFound === 1) {
          return <button className="btn btn-success btn-sm"
                  onClick={() => context.selectAccount(context.state.accounts[0].id)}
                  >{context.state.accounts[0].name}
                 </button>
      
        } else if (context.state.accountsFound === 2 || context.state.accountsFound === 3) {
          return <ButtonGroup>
                  {context.state.accounts.map(acc => {
                    return <button className="btn btn-secondary btn-sm">{acc}</button>
                  })}
                </ButtonGroup>
        
        } else if(context.state.accountsFound >= 4) {
          return (
            <Row>
              <DropDown color="secondary" title="Selecionar Conta">
                {context.state.accounts.map((acc, key) => {
                  return (
                    <button
                      className="dropdown dropdown-item"
                      key={key}
                      onClick={()=> context.selectAccount(acc.id)}
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
