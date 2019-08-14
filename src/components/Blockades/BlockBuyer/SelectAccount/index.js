import React, { useState, useEffect } from 'react';
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import { Data } from '../../../../containers/data';
import { FormGroup } from 'reactstrap';

export default function SelectAccount(props) {
  const [selected, setSelected] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const toArray = () => accounts.map(item => item.name);
  const handleChange = e => {
    setSelected(e); 
    props.callback(e);
  }
  return (
    <Data.Consumer>
      {(provider) => {
        setAccounts(provider.state.accounts);
        return (
          !provider.state.isLoading ? (
            <FormGroup style={{marginBottom: '50px'}}>
              <h6><b>Conta do Mercado Livre</b></h6>
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
                callback={(id)=> props.callback(id)}
              />
            </FormGroup>
          ):(<h3>Carregando ...</h3>)
        );
      }}
    </Data.Consumer>
  );
}
