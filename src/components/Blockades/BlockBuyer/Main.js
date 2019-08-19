import React, { useState, useEffect, useContext } from 'react';
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
import { getToken } from '../../../auth';

const Main = () => {
  const [motive, setMotive] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [buyerReference, setBuyerReference] = useState('');
  const [blockDescription, setBlockDescription] = useState('Sem descrição.')
  const [blockBids, setBlockBids] = useState(false);
  const [blockQuestions, setBlockQuestions] = useState(false);
  const Context = useContext(Data);
  const handleBlockType = e => {
    if (e.target.name === 'bids') blockBids ? setBlockBids(false) : setBlockBids(true);
    if (e.target.name === 'questions') blockQuestions ? setBlockQuestions(false) : setBlockQuestions(true);
  }
  const blockBuyer = () => {
    const header = { headers: { 'Authorization': "Bearer " + getToken() } };
    const url = `${process.env.REACT_APP_API_URL}/blacklist`;
    const data = makeJson();
    data.forEach((element, index) => {
      api.post(url, element).then(response => {
        if(index <= 1) {
          Swal.fire({
            html: `<p>${response.data.message}</p>`,
            type: response.data.status,
            showCloseButton: true
          });
        }
      }).catch(error => {
        console.log(error);
        Swal.fire({
          title: 'Ops, parece que algo deu errado!',
          html: `<p>Por favor, certifique-se de preencher todos os campos!</p>`,
          type: 'error',
          showCloseButton: true
        });
      });
    });
  }
  const makeJson = () => {
    let data = accounts.map(account => {
      return {
        "motive_id": motive,
        "account_id": account,
        "customer_id": `${buyerReference}`,
        "description": blockDescription,
        "bids": blockBids,
        "questions": blockQuestions
      }
    });
    return data;
  }

  useEffect(() => {
    Context.state.accounts.map((account, index) => {
      if (account.name === accounts[index]) accounts[index] = account.id;
      if (accounts == []) {
        Swal.fire({
          html: <p>Você precisa ter ao menos uma conta.</p>,
          type: 'info',
          showCloseButton: true
        }).then(function() {
          window.location.href = "#/listacontas?status=lista";
        });
      }
    });
  }, [accounts]);
  return(
    <Data.Consumer>
      {(provider) => {
        return (
          <Carton md="8">
            <Row>
              <Row style={{marginLeft: "50px"}}>
                <FormGroup>
                  <SelectAccount callback={(value) => setAccounts(value)}/>
                  <BuyerReference callback={(value) => setBuyerReference(value)}/>
                  <BlockType onChange={(e) => handleBlockType(e)}/>                
                </FormGroup>
              </Row>
              <Row style={{marginLeft: "110px"}}>
                <FormGroup>
                  <BlockDescription
                    rows="3"
                    callback={(value) => setBlockDescription(value)}/>
                  <ChooseMotive id="ChooseMotive" callback={(value) => setMotive(value)}/>
                </FormGroup>
              </Row>
            </Row>
            <button 
              onClick={()=> blockBuyer()}
              style={{float: 'right'}}
              className="btn btn-danger"
              ><icon className="fa fa-lock" /> Bloquear
            </button>
          </Carton>
        );
      }}
    </Data.Consumer>
  );
}

export default Main;