import React from 'react';
import api from '../../../services/api';
import Swal from 'sweetalert2';
import { fetchAccounts, fetchQuestions } from '../fetch';

const Delete = props => {
  return(
    <button onClick={()=>{
      removeQuestion(props.question, props.account)
      props.onClick();
    }} className="btn btn-danger btn-sm ml-1 mb-1 mt-1 mr-1"
      >Remover
    </button>
  );
}

const removeQuestion = (question, account) => {
  const url = `/questions/${question}?account_id=${account}`;
  Swal.fire({
    html: `<p>Você tem certeza que deseja excluir esta pergunta?`,
    type: 'warning',
    showConfirmButton: true,
    confirmButtonText: 'Sim, tenho certeza!',
    showCancelButton: true,
    cancelButtonText: 'Não, espera!'
  }).then(res => {
    if(res.value === true) {
      api.delete(url).then(res => {
        if (res.data.status === 'success'){
          Swal.fire({
            html:`<p>${res.data.message}</p>`,
            type: res.data.status,
            showCloseButton: true
          });
          sync(account);
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
        sync(account);
      });
    };
  })
    .catch(err => console.log(err))

}

const sync = async (id) => {
  try {
    await fetchAccounts();
    await fetchQuestions(id);
  } catch (error) {
    Swal.fire({
      html: `<p>${error}</p>`,
      type: 'error',
      showCloseButton: true
    })
  }
}

export default Delete;
