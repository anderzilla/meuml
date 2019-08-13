import React, { useState } from 'react';
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import { Data } from '../../../../containers/data';
import { FormGroup } from 'reactstrap';

export default function SelectAccount(props) {
  const [selected, setSelected] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState(0);
  const toArray = () => accounts.map(item => item.name);
  const toId = name => accounts.map(item => {
    let res = 0;
    if (name === item.name) res = item.id;
    return res;
  });
  const handleChange = e => {
    setSelected(e);
  }
  return (
    <Data.Consumer>
      {(provider) => {
        setAccounts(provider.state.accounts);
        const id = toId(selected);
        return (
          !provider.state.isLoading ? (
            <FormGroup>
              <h5>Selecione uma conta</h5>
              <Picky className="input-group"
                value={selected}
                options={toArray()}
                onChange={handleChange}
                open={false}
                valueKey="value"
                labelKey="label"
                multiple={true}
                includeSelectAll={true}
                includeFilter={true}
                placeholder="Selecione uma conta"
                dropdownHeight={500}
                manySelectedPlaceholder="%s contas selecionadas"
                selectAllText="Selecionar todas"
                callback={()=> props.callback(id)}
              />
            </FormGroup>
          ):(<h3>Carregando ...</h3>)
        );
      }}
    </Data.Consumer>
  );
}
