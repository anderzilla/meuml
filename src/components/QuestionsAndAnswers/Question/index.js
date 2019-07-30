import React, { Component } from  'react';
import api from '../../../services/api';
import { fetchAccounts, fetchQuestions } from '../fetch';
import { ActionGroup, ActionLabel } from '../../ListGroup/ActionGroup';
import Answer from '../buttons/Answer';
import Swal from 'sweetalert2';

export class Question extends Component {
  constructor(props) {
    super(props);
    this.state ={
      accId: null,
      questionId: null,
      answer: '',
      sync: false,
      error: null
    };
  }

  resync = () => {
    fetchAccounts().then(()=> {
      fetchQuestions(this.state.accId);
      this.setState({ sync: true });
    }).catch(err => {
      this.setState({ sync: false, error: err });
    });
  }

  blockUser = (user_id, acc_id) => {
    if(user_id !== undefined && user_id !== null &&
      acc_id !== undefined && acc_id !== null){
      const url = '/blacklist';
      const data = {
        account_id: acc_id.toString(),
        user_id: user_id.toString(),
        acc_id: acc_id.toString()
      };
      api.post(url, data).then(res => {
        if (res.data.status === 'success'){
          Swal.fire({
            html:`<p>Resposta enviada!</p>`,
            type: 'success',
            showCloseButton: true
          }).then(()=>{
            this.resync();
          });
        } else {
          Swal.fire({
            html:`<p>${res.data.message}</p>`,
            type: res.data.status,
            showCloseButton: true
          });
        }
      }).catch(error => {
        Swal.fire({
          html:`<p>${error}</p>`,
          type: 'error',
          showCloseButton: true
        });
        this.resync();
      });
    }
  }
  
  removeQuestion = (question, account) => {
    const url = `/questions/${question}?account_id=${account}`;
    api.delete(url).then(res => {
      if (res.data.status === 'success'){
        Swal.fire({
          html:`<p>${res.data.message}</p>`,
          type: res.data.status,
          showCloseButton: true
        });
        this.resync();
      }else{
        Swal.fire({
          html:`<p>${res.data.message}</p>`,
          type: 'error',
          showCloseButton: true
        });
      }
    }).catch(error => {
      Swal.fire({
        html:`<p>${error}</p>`,
        type: 'error',
        showCloseButton: true
      });
      this.resync();
    });
  }

  render() {
    return(
      <>
        <ActionGroup className="col-md-6">
          <ActionLabel key={this.props.key}
            title={this.props.title}
            smallTitle={this.props.smallTitle}
            label={this.props.label}
            smallLabel={this.props.smallLabel}
            accId={this.props.accId}
            userId={this.props.userId}
            questionId={this.props.questionId}
            >
              <Answer 
                accId={this.props.accId}
                questionId={this.props.questionId}
                questText={this.props.label}
                id="answer"
              />
            </ActionLabel>
        </ActionGroup>
      </>
    );
  }
}