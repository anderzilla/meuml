import React, { Component } from 'react';
import SelectAccount from './SelectAccount';
import CategoriesBtn from '../Categories/CategoriesBtn';
import { InfoGroup, InfoLabel } from '../ListGroup/InfoGroup';
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
      totalOfQuestions: 0,
      totalOfAds: 0,
      totalOfAcc: 0,
    }

    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetchAccounts().then(res => {
      console.log(res)
      this.setState({
        accounts: res.accounts,
        totalOfAcc: res.totalOfAcc
      });

      res.accounts.map(acc => {
        if(acc.numberOfAds > 0 && acc.numberOfAds!== undefined) {
          let counter = this.state.totalOfAds;
          this.setState({totalOfAds: counter + acc.numberOfAds})
        }
        if(acc.numberOfQuestions > 0 && acc.numberOfQuestions !== undefined) {
          let counter = this.state.totalOfQuestions;
          this.setState({ totalOfQuestions: counter + acc.numberOfQuestions})
        }
      })

      console.log(this.state)
    })
  }

  handleClick = async e => {
    try {
      const res = await fetchQuestions(e.target.id);
      if(res.data.status === 'success') {
        this.setState({
          accounts: res.data.accounts,
          advertisings: res.data.advertisings,
          totalOfAds: res.data.totalOfAds
        });
        Swal.fire({
          html:`<p>${res.data.message}</p>`,
          type: res.data.status,
          showCloseButton: true
        });
      };
    }catch{
      // being handled inside fetchQuestions();
    };
  }

  handleChange = e => {
    if(e.target.value === 'opened') this.setState({ categoriesDataTableIs: 'opened' })
    else this.setState({ categoriesDataTableIs: 'closed' });
  }

  render() {
    return (
      <>
        <InfoGroup className="col-md-6">
          <InfoLabel span={this.state.totalOfAcc}>Contas Sincronizadas</InfoLabel>
          <InfoLabel span={this.state.totalOfAds}>Anúncios encontrados</InfoLabel>
          <InfoLabel span={this.state.totalOfQuestions}>Perguntas não respondidas</InfoLabel>
          <InfoLabel span="">
            <SelectAccount onClick={this.handleClick} accounts={this.state.accounts}/>
            <p className="text-right"><CategoriesBtn/></p>
          </InfoLabel>
        </InfoGroup>
        <hr />
      </>
    );
  }
}