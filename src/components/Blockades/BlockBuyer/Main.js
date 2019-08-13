import React, { useState } from 'react';
import Carton from '../../Card';
import BlockType from './BlockType';
import SelectAccount from './SelectAccount';
import BuyerReference from  './BuyerReference';
import { Data } from '../../../containers/data';
import ChooseMotive from '../buttons/ChooseMotive';
import BlockDescription from './BlockDescription';
import { Row, FormGroup } from 'reactstrap';
import api from '../../../services/api';
import Swal from 'sweetalert2';

const Main = () => {
  const [motive, setMotive] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [buyerReference, setBuyerReference] = useState('');
  const [blockDescription, setBlockDescription] = useState('Sem descrição.')
  const [blockBids, setBlockBids] = useState(false);
  const [blockQuestions, setBlockQuestions] = useState(false);
  const handleBlockType = e => {
    if (e.target.name === 'bids') blockBids ? setBlockBids(false) : setBlockBids(true);
    if (e.target.name === 'questions') blockQuestions ? setBlockQuestions(false) : setBlockQuestions(true);
  }
  const blockBuyer = () => {
    const data = makeJson({ motive, accounts, buyerReference, blockDescription, blockBids, blockBuyer });
    data.forEach(element => {
      api.post('/blacklist', element).then(response => {
        Swal.fire({
          html: `<p>${response.data.message}</p>`,
          type: response.data.status,
          showCloseButton: true
        });
      }).catch(error => {
        Swal.fire({
          title: 'Ops, parece que algo deu errado!',
          html: `<p>Por favor, certifique-se de preencher todos os campos!</p>`,
          type: 'error',
          showCloseButton: true
        });
      });
    });
  }
  return(
    <Data.Consumer>
      {(provider) => {
        return (
          <Carton md="8">
            <Row>
              <Row style={{marginLeft: "10px"}}>
                <FormGroup>
                  <SelectAccount callback={(value) => setAccounts(value)}/>
                  <BuyerReference callback={(value) => setBuyerReference(value)}/>
                  <BlockType onChange={(e) => handleBlockType(e)}/>                
                </FormGroup>
              </Row>
              <Row style={{marginLeft: "178px"}}>
                <FormGroup>
                  <BlockDescription
                    name="blockMotive"
                    id="blockMotive"
                    rows="3"
                    callback={(value) => setBlockDescription(value)}/>
                  <ChooseMotive callback={(value) => setMotive(value)}/>
                </FormGroup>
              </Row>
            </Row>
            <button 
              onClick={()=>blockBuyer()}
              style={{float: 'right'}}
              className="btn btn-danger"
              ><icon className="fa fa-lock" />
            </button>
          </Carton>
        );
      }}
    </Data.Consumer>
  );
}

const makeJson = props => {
  const { motive, accounts, buyerReference, blockDescription, blockBids, blockQuestions } = props;
  let data = accounts.map(account => {
      let data = {
      "motive_id": motive,
      "account_id": account.id,
      "customer_id": `${buyerReference}`,
      "description": blockDescription,
      "bids": blockBids,
      "questions": blockQuestions
    }
    console.log(data);
    return data;
  });
  return data;
}

export default Main;
