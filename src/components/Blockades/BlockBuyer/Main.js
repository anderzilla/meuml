import React, { useState } from 'react';
import Carton from '../../Card';
import SelectAccount from './SelectAccount';
import BuyerReference from  './BuyerReference';
import { Data } from '../../../containers/data';
import ChooseMotive from '../buttons/ChooseMotive';
import BlockDescription from './BlockDescription';
import BlockType from './BlockType';

const Main = () => {
  const [motive, setMotive] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [buyerReference, setBuyerReference] = useState('');
  const [blockDescription, setBlockDescription] = useState('')
  const [blockType, setBlockType] = useState(3);
  return(
    <Data.Consumer>
      {(provider) => {
        return (
          <Carton>
            <button onClick={()=>console.log(blockType)}>LOG</button>
            <SelectAccount callback={(value) => setAccounts(value)}/>
            <BuyerReference callback={(value) => setBuyerReference(value)}/>
            <ChooseMotive callback={(value) => setMotive(value)}/>
            <BlockDescription col="5"
              name="blockMotive"
              id="blockMotive"
              rows="3"
              callback={(value) => setBlockDescription(value)}
            />
            <BlockType callback={(value) => setBlockType(value)}/>
          </Carton>
        );
      }}
    </Data.Consumer>
  );
}

export default Main;

const handleBlockType = (props) => {
  if (props === 0) console.log('um')
  if (props === 1) console.log('dois')
  if (props === 2) console.log('trers')
}