import api from '../../services/api';
import Swal from 'sweetalert2';

export const Accounts = async () => {
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
  } catch(error) {
    Swal.fire({
      html: `<p>${error}</p>`,
      type: 'error',
      showCloseButton: true
    });
  }
}

export const BlackList = async accId => {
  if(accId !== null && accId !== undefined) {
    try {
      const url = `blacklist?account_id=${accId}`;
      const res = await api.get(url);
      if(res) return({
        data: res.data.data,
        meta: res.data.meta,
        status: res.data.status,
        message: res.data.message,
      });
    } catch {}
  };
}

export const UnblockUser = async (accId, customerId) => {
  if(accId !== null && accId !== undefined) {
    try {
      const url = `blacklist/unblock`;
      const data = {
        "account_id": accId,
        "bids": true,
        "block_id": `${customerId}`,
        "questions": true
      }
      const res = await api.post(url, data);
      console.log(res);
      return res
    } catch {}
  };
}
