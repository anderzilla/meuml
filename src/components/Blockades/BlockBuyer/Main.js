import React, { useState } from 'react';
import Carton from '../../Card';
import BlockType from './BlockType';
import SelectAccount from './SelectAccount';
import BuyerReference from  './BuyerReference';
import { Data } from '../../../containers/data';
import ChooseMotive from '../buttons/ChooseMotive';
import BlockDescription from './BlockDescription';


const Main = () => {
  const [motive, setMotive] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [buyerReference, setBuyerReference] = useState('');
  const [blockDescription, setBlockDescription] = useState('')
  const [blockBids, setBlockBids] = useState(false);
  const [blockQuestions, setBlockQuestions] = useState(false);
  const handleBlockType = e => {
    if (e.target.name === 'bids') blockBids ? setBlockBids(false) : setBlockBids(true);
    if (e.target.name === 'Questions') blockQuestions ? setBlockQuestions(false) : setBlockQuestions(true);
  }
  return(
    <Data.Consumer>
      {(provider) => {
        return (
          <Carton>
            <SelectAccount callback={(value) => setAccounts(value)}/>
            <BuyerReference callback={(value) => setBuyerReference(value)}/>
            <ChooseMotive callback={(value) => setMotive(value)}/>
            <BlockDescription col="5"
              name="blockMotive"
              id="blockMotive"
              rows="3"
              callback={(value) => setBlockDescription(value)}
            />
            <BlockType onChange={(e) => handleBlockType(e)}/>
          </Carton>
        );
      }}
    </Data.Consumer>
  );
}

export default Main;
