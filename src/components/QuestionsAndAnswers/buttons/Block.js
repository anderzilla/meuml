import React from 'react';
import api from '../../../services/api';
import Swal from 'sweetalert2';
import { fetchAccounts, fetchQuestions } from '../fetch';

const Block = props => {
  return(
    <>
      <button className="btn btn-danger btn-sm btn-sm ml-1 mb-1 mt-1 mr-1"
        userId={props.userId}
        accId={props.accId}
        onClick={()=> handleClick(props)}
        >Bloquear
      </button>
    </>
  );
}

const handleClick = props => {
  Swal.fire({
    html: `<p>Tem certeza que deseja bloquear este usuário?</p>`,
    type: 'warning',
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Sim, tenho certeza!',
    cancelButtonText: 'Cancelar'
  }).then(res => {
    if(res.value === true) {
      blockQuestUser(props.userId)(props.accId);
    }
  });
}

const blockQuestUser = (userId) => (accId) => {
  if (userId !== undefined && userId !== null &&
      accId !== undefined && accId !== null){
    const url = '/blacklist';
    const data = [{
                	"account_id": accId,
                	"bids": true,
                	"customer_id": `${userId}`,
                	"motive_description": "",
                	"motive_id": 1,
                	"questions": true
                }];
    api.post(url, data).then(res => {
      if (res.data.status === 'success') {
        Swal.fire({
          html: `<p>Usuário bloqueado!</p>`,
          type: 'success',
          showCloseButton: true
        }).then(() => {
          sync(accId);
        });
      } else {
        console.log(res)
        Swal.fire({
          html: `<p>${res.data.message}</p>`,
          type: res.data.status,
          showCloseButton: true
        });
      }
    }).catch(error => {
      Swal.fire({
        html: `<p>${error}</p>`,
        type: 'error',
        showCloseButton: true
      });
      sync(accId);
    });
  }
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
    });
  }
}

export default Block;
