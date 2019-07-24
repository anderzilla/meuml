import api from '../../services/api';
import Swal from 'sweetalert2';

export const fetchAccounts = async () => {
  try {
    const url = `/accounts?extra_fields=unanswered_questions`;
    const res = await api.get(url);
    let accounts = [];
    if(res.data.status === 'success') {
      if(res.data.data.length > 0) {
        await res.data.data.forEach(acc => {
          accounts.push({
            id: acc.id,
            name: acc.name,
            key: acc.name + acc.id,
            numberOfAds: acc.count_advertisings,
            numberOfQuestions: acc.count_questions,
          });
        });
        return ({
          accounts: accounts,
          totalOfAcc: accounts.length
        });
      } else Swal.fire({ html: 'Você precisa ter ao menos uma conta cadastrada.', type: 'warning', showCloseButton: true });
    } else Swal.fire({ html: `<p>${res.data.message}</p>`, type: res.data.status, showCloseButton: true });
  } catch(e) {
    Swal.fire({
      html: `<p>${e}</p>`,
      type: 'error',
      showCloseButton: true
    });
    this.props.history.push('/#/contas');
  }
}

export const fetchQuestions = id => {
  const url = `/questions/advertisings?account_id=${id}`
  api.get(url).then(res => {
    Swal.fire({
      html:'<p>'+res.data.message+'</p>',
      type: res.data.status,
      showConfirmButton: true
    });
    if (res.data.status === 'success'){
      let accountList = this.state.accounts;
      let index = accountList.map((a, i) => {if(a.id === id) return i});
      accountList[index] = {
        id: accountList[index].id,
        name: accountList[index].name,
        key: accountList[index].name + accountList[index].id,
        numberOfAds: res.data.data.advertisings,
        numberOfQuestions: res.data.data.total_questions,
      }
      return ({ 
        accounts: accountList,
        advertisings: accountList[index].ads,
        totalOfAds: accountList[index].ads.length
      });
    }
  }).catch(error => Swal.fire({html:`<p>${error}</p>`, type: 'error', showCloseButton: true}));
}