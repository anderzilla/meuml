import React, { Component } from 'react';
import SelectAccount from './SelectAccount';
import CategoriesBtn from '../Categories/CategoriesBtn';
import { InfoGroup, InfoLabel } from '../ListGroup/InfoGroup';
import { ActionGroup, ActionLabel } from '../ListGroup/ActionGroup';
import { fetchQuestions, fetchAccounts } from './fetch';
import Swal from 'sweetalert2';

export default class DataPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesDataTableIs: 'closed',
      accounts: [],
      advertisings: [],
      unansweredQuestions: [],
      numberOfQuests: 0,
      numberOfAds: 0,
      numberOfAcc: 0,
    }

    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetchAccounts().then(res => {
      this.setState({
        accounts: res.accounts,
        numberOfAcc: res.numberOfAcc,
        numberOfAds: res.numberOfAds,
        numberOfQuests: res.numberOfQuests
      });
    });
  }

  handleClick = e => {
    fetchQuestions(e.target.id).then(res => {
      let adsArray = [];
      let quests = this.state.unansweredQuestions;
      res.advertisings.forEach(ad => {
        let advertising = ad.title;
        let quantityAvailable = ad.quantity_available;
        let price = ad.price;
        let thumbnail = ad.thumbnail;
        let expirationDate = ad.expires_at;
        let questions = ad.questions;
        adsArray.push({advertising, quantityAvailable, price, thumbnail, expirationDate, questions});
        ad.questions.map(a => {quests.push(a)});
      });
      this.setState({
        advertisings: adsArray,
        unansweredQuestions: quests
      });
    });
    this.setState({ accId: e.target.id });
  }

  render() {
    return (
      <>
        <InfoGroup className="col-md-6">
          <InfoLabel span={this.state.numberOfAcc}>Contas Sincronizadas</InfoLabel>
          <InfoLabel span={this.state.numberOfAds}>Anúncios encontrados</InfoLabel>
          <InfoLabel span={this.state.numberOfQuests}>Perguntas não respondidas</InfoLabel>
          <InfoLabel span="">
            <SelectAccount onClick={this.handleClick} accounts={this.state.accounts}/>
            <p className="text-right"><CategoriesBtn/></p>
          </InfoLabel>
        </InfoGroup>
        <hr />
        {this.state.unansweredQuestions.length === 0 ? (<div />) : (
          this.state.unansweredQuestions.map(quest => {
            return(
              <ActionGroup className="col-md-6">
                <ActionLabel
                  title={quest.from.email}
                  smallTitle={quest.from.first_name}
                  label={quest.text}
                  smallLabel={quest.date_created}
                  accId={this.state.accId}
                  questionId={quest.id}
                />
            </ActionGroup>
            );
          })
        )}
        <button onClick={()=> console.log(this.state)}>Console Log</button>
      </>
    );
  }
}