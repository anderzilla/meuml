import React, { useState } from 'react';
import api from '../../../../services/api';
import { Col, Row, FormGroup, Input } from 'reactstrap';
import { DropDown } from '../../../buttons/ButtonGroup';

export default function ChooseMotive(props) {  
  const [motiveList, setMotiveList] = useState([]);
  const [motive, setMotive] = useState('');
  const [loading, setLoading] = useState(true);
  
  const handleClick = e => {
    setMotive(e.target.name)
    props.callback(e.target.id);
  }
  
  const fetchList = async () => {
    try {
      const response = await api.get('/blacklist/motives');
      if(response.status === 200) setMotiveList(response.data.data);
      else return 'error';
    } catch{}
  }
  
  if (loading === true) {
    fetchList();
    setLoading(false);
  }

  return (
    <Col xs="12" sm="6" md="6">
      <FormGroup>
        <Row>
          <DropDown title="Selecione um motivo">
          {motiveList.map(motive => {
            return (
              <button
                callback={(value)=> props.callback(value)}
                onClick={(e)=> handleClick(e)}
                title={motive.description}
                className="dropdown-item"
                name={motive.name}
                key={motive.key}
                id={motive.id}
                >{motive.key} - {motive.name}
              </button>
            );
          })}
          </DropDown>
          <Input className="form-control col-md-6 ml-1" placeholder={motive} value={motive} readOnly/>
        </Row>
      </FormGroup>
    </Col>
  );
}
