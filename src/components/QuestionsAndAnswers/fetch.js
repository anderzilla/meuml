import api from '../../services/api';
import Swal from 'sweetalert2';

export const fetchAccounts = async () => {
  try {
    const url = `/accounts?extra_fields=unanswered_questions`;
    const res = await api.get(url);
    let accounts = [];
    let numberOfAds = 0;
    let numberOfAcc = 0;
    let numberOfQuests = 0;
    if(res.data.status === 'success') {
      if(res.data.data.length > 0) {
        res.data.data.forEach(acc => {
          accounts.push({
            id: acc.id,
            name: acc.name,
            key: acc.name + acc.id,
            numberOfAds: acc.count_advertisings,
            numberOfQuests: acc.count_questions,
          });
          numberOfAcc = accounts.length;
          numberOfAds += acc.count_advertisings;
          numberOfQuests += acc.count_questions;
        });

        return ({
          accounts,
          numberOfAcc,
          numberOfAds,
          numberOfQuests
        });
      } else Swal.fire({ html: 'Você precisa ter ao menos uma conta cadastrada.', type: 'warning', showCloseButton: true });
    } else Swal.fire({ html: `<p>${res.data.message}</p>`, type: res.data.status, showCloseButton: true });
  } catch(e) {
    Swal.fire({
      html: `<p>${e}</p>`,
      type: 'error',
      showCloseButton: true
    });
  }
}

export const fetchQuestions = async id => {
  try{
    const url = `/questions/advertisings?account_id=${id}`
    const res = await api.get(url);
    if(res.data.status === 'success'){
      return {advertisings: res.data.data.advertisings};
    }
  }catch(error) {
    Swal.fire({
      html:`<p>${error}</p>`,
      type: 'error',
      showCloseButton: true
    });
  }
}