import React from "react";
import { BtnGroup } from "../buttons/ButtonGroup";
import Data from './DataContainer';

const ChooseAccBtn = () => {
  return (
    <Data.Consumer>
      {context => {
        if (context.state.numberOfAcc === 1) {
          return (
            <button
              className="btn btn-success btn-sm"
              onClick={() =>
                context.updateBlacklist(context.state.accounts[0].id)
              }
            >
              {context.state.accounts[0].name}
            </button>
          );
        } else if (context.state.numberOfAcc === 0) {
          return <h6>Nenhuma conta do ML encontrada.</h6>;
        } else {
          return (
            <BtnGroup>
              {context.state.accounts.map(acc => {
                return (
                  <button
                    className="dropdown-item"
                    onClick={() => context.updateBlacklist(acc.id)}
                  >
                    {acc.name}
                  </button>
                );
              })}
            </BtnGroup>
          );
        }
      }}
    </Data.Consumer>
  );
};

export default ChooseAccBtn;