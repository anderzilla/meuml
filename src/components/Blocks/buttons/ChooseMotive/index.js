import React, { useState } from 'react';
import api from '../../../../services/api';
import { Row, Input } from 'reactstrap';
import { DropDown } from '../../../buttons/ButtonGroup';

export default function ChooseMotive(props) {  
  const [motiveList, setMotiveList] = useState([]);
  const [motive, setMotive] = useState('');
  
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
  fetchList();
  
  return (
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
      <Input className="form-control col-md-3" placeholder={motive} value={motive} readOnly/>
    </Row>
  );
}
