import React, { Component } from  'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

export class ActionLabel extends Component {
  constructor(props) {
    super(props);

    this.state ={
      accId: null,
      questionId: null,
      answer: ''
    };
    this.sendAnswer = this.sendAnswer.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  sendAnswer = () => {
    const url = '/questions/answer';
    const data = {
      'account_id' : this.state.accId.toString(),
      'question_id' : this.state.questionId,
      'text' : this.state.answer
    }
    api.post(url, data).then(res => {
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

  handleClick = e => {
    if(e.target.id === 'answer') {
      Swal.fire({
        html: `<p>${this.props.label}</p>`,
        input: 'textarea',
        type: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Responder',
        cancelButtonText: 'Cancelar'
      }).then(res => {
        if(res.value !== undefined && res.value !== null && res.value !== '') {
          this.setState({
            accId: this.props.accId,
            questionId: this.props.questionId,
            answer: res.value
          });
          this.sendAnswer();
          console.log(this.state)
        };
      });
    }
  }

  render() {
    return(
      <>
        <button onClick={this.handleClick} id="answer" className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1 mr-3">{this.props.title}</h5>
            <small className="ml-6">{this.props.smallTitle}</small>
          </div>
          <div className="float-right">
            <button className="btn btn-danger btn-sm"
              onClick={this.handleClick}
              id="block"
              >Bloquear Usuário
            </button>
          </div>
          <p className="mb-1">{this.props.label}</p>
          <small>{this.props.smallLabel}</small>
        </button>
      </>
    );
  }
}

export class ActionGroup extends Component {
  render() {
    return(
      <>
        <div className={`list-group ${this.props.className}`}>
          {this.props.children}
        </div>
      </>
    );
  }
}