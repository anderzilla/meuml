import React, { Component } from 'react';
import api from '../../services/api';

import Swal from "sweetalert2";
import 'react-toastify/dist/ReactToastify.css';

import DataPanel from '../../components/AnswersAndQuestions/DataPanel'

class Perguntas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      advertisings: [],
      totalOfAcc: 0,
      totalOfAds: 0,
      isLoading: true,
      loadingAcc: true,
      question: '',
      answer: '',
      acc_id: null,
      user_id: null,
      categoriesDataTableIs: 'closed',
    };

    this.handleChange = this.handleChange.bind(this);
  }


  sendAnswer = () => {
    const url = '/questions/answer';
    const data = {
      'account_id' : this.state.acc_id.toString(),
      'question_id' : this.state.question,
      'text' : this.state.answer
    }
    api.post(this.url, data).then(res => {
      if (res.status === 200){
        Swal.fire({
          html:'<p>Pergunta respondida com sucesso!</p>',
          type: 'success',
          showConfirmButton: true
        });
        
        setTimeout(function ressync(){
          this.fetchQuestions(this.state.account_id);
          this.fetchAccounts();
          this.setState({
            ressync: false
          })
        }.bind(this), 2000);

      } else {
        Swal.fire({
          html:'<p>'+res.data.message+'</p>',
          type: 'error',
          showConfirmButton: true
        });
      }
    }).catch(error => {
      Swal.fire({
         html:'<p>'+ error.response.data.message+'</p>',
         type: 'error',
         showCloseButton: true
        });
    });
  }

  removeQuestion = question => {
    this.url = process.env.REACT_APP_API_URL + `/questions/` + question + '?account_id=' + this.state.account_id
    api.delete(this.url).then(res => {
      if (res.status === 200){
        Swal.fire({html:'<p>Pergunta deletada com sucesso!</p>', type: 'success', showConfirmButton: true});
        this.setState({ressync: true});
        setTimeout(function ressync(){
          this.fetchQuestions(this.state.account_id);
          this.fetchAccounts()
        }.bind(this), 2000);
      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => {
      Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });
  }

  blockUser = (user_id, acc_id, madeABet) => {
    if(madeABet === false &&
       user_id !== undefined && user_id !== null &&
       acc_id !== undefined && acc_id !== null){
    
      const url = '/blacklist';
      const data = {
        account_id:acc_id,
        user_id: user_id.toString(),
        acc_id: acc_id.toString(),
      };
      api.post(url, data).then(res => {
        if (res.data.status === 'success'){
          Swal.fire({
            html:'<p>Pergunta deletada com sucesso!</p>',
            type: 'success',
            showConfirmButton: true
          });

          setTimeout(function ressync(){
            this.fetchQuestions(this.state.account_id);
            this.fetchAccounts();
            this.setState({
              ressync: false
            })
          }.bind(this), 2000);
        } else {
          Swal.fire({
            html:'<p>'+res.data.message+'</p>',
            type: 'error',
            showConfirmButton: true
          });
        }
      }).catch(error => {
        Swal.fire({
          html:'<p>'+ error.response.data.message+'</p>',
          type: 'error',
          showConfirmButton: true
        });
      });
    }
  }

  handleChange = event => {
    var answer = {}
    answer[event.target.id] = event.target.value
    this.setState({
      answer: answer,
      question_id: event.target.id
    });
  }

  render() {
    return(
      <>
        <DataPanel />
      </>
    );
  }
}

export default Perguntas;
