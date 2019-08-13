import React, { useState } from 'react';
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import { Data } from '../../../../containers/data';
import { Col, Row, FormGroup } from 'reactstrap';

export default function SelectAccount(props) {
  const [selected, setSelected] = useState([]);
  const toArray = props => props.map(item => item.name);
  const handleChange = e => {
    setSelected(e);
    props.callback(e);
  }
  return (
    <Data.Consumer>
      {(provider) => {
        const options = toArray(provider.state.accounts);
        return (
          !provider.state.isLoading ? (
            <Row>
              <Col xs="12" sm="6" md="6">
                <FormGroup>
                  <h5>Selecione uma conta</h5>
                  <Picky className="input-group"
                    value={selected}
                    options={options}
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
                    callback={(value)=> props.callback(value)}
                  />
                </FormGroup>
              </Col>
            </Row>
          ):(<h3>Carregando ...</h3>)
        );
      }}
    </Data.Consumer>
  );
}
