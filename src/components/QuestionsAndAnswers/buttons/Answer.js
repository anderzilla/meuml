import React from 'react';
import api from '../../../services/api';
import Swal from 'sweetalert2';
import { fetchAccounts, fetchQuestions } from '../fetch';

const Answer = props => {
  return(
    <>
      <button onClick={()=>handleClick(props)} className="btn btn-success btn-sm">Responder</button>
    </>
  );
}

const handleClick = props => {
  if(props.id === 'answer') {
    Swal.fire({
      html: `<p>${props.questText}</p>`,
      input: 'textarea',
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Responder',
      cancelButtonText: 'Cancelar'
    }).then(res => {
      if(res.value !== undefined && res.value !== null && res.value !== '') {
        sendAnswer(props.accId)(props.questionId)(res.value);
      };
    });
  }
}

const sendAnswer = (accId) => (questionId) => (answer) => {
    const url = '/questions/answer';
    const data = {
      account_id: accId.toString(),
      question_id: questionId.toString(),
      text: answer.toString()
    }

    api.post(url, data).then(res => {
      if(res.status === 200) {
        Swal.fire({
          html: `<p>Resposta enviada!</p>`,
          type: 'success',
          showCloseButton: true
        });
        sync();
      } else {
        Swal.fire({
          html: 'Ops, parece que algo deu errado. Tente novamente.',
          type: 'warning',
          showCloseButton: true
        });
      }
    }).catch(error => {
      Swal.fire({
         html:`<p>${error}</p>`,
         type: 'error',
         showCloseButton: true
        });
      sync();
    });
  }

const sync = () => {
  fetchAccounts().then(()=>{
    fetchQuestions();
  });

}

export default Answer;