import React, { Component } from 'react';
import api from '../../services/api';

import Swal from "sweetalert2";
import 'react-toastify/dist/ReactToastify.css';
import { BtnGroup, Item, DropDown } from '../../components/buttons/ButtonGroup';
import { GroupItem, GroupHolder } from '../../components/ListGroup/Main';
import DataTable from '../../components/Categories/DataTable';

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

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buildQuestsCard = this.buildQuestsCard.bind(this);
  }

  componentDidMount() {
    this.fetchAccounts()
  }
  
  handleClick = id => {
    this.fetchQuestions(id);
  }

  fetchAccounts = async () => {
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
              ads: acc.count_advertisings,
              questions: acc.count_questions,
            });
          });
          await this.setState({
            accounts: accounts,
            isLoading: false,
            loadingAcc: false,
            totalOfAcc: accounts.length
          });
        } else Swal.fire({ html: 'Você precisa ter ao menos uma conta cadastrada.', type: 'warning', showCloseButton: true });
      } else Swal.fire({ html: `<p>${res.data.message}</p>`, type: res.data.status, showCloseButton: true });
    } catch {
      Swal.fire({
        html: 'Ops, algo deu errado!',
        type: 'error',
        showCloseButton: true
      });
      this.props.history.push('/#/contas');
    }
  }

  fetchQuestions = id => {
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
          ads: res.data.data.advertisings,
          questions: res.data.data.total_questions,
        }
        this.setState({ 
          accounts: accountList,
          advertisings: accountList[index].ads,
          totalOfAds: accountList[index].ads.length
        });
      }
    }).catch(error => Swal.fire({html:`<p>${error}</p>`, type: 'error', showCloseButton: true}));
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

  handleCategories = () => {
    if (this.state.categoriesDataTableIs === 'closed') {
      this.setState({ categoriesDataTableIs: 'opened'});
    } else this.setState({categoriesDataTableIs: 'closed'});
    console.log(this.state.categoriesDataTableIs);
  }

  buildQuestsCard = () => {
    if(this.state.isLoading === false && this.state.loadingAcc === false) {
      if(this.state.totalOfAds >= 1) {
        this.state.advertisings.map(ad => {
          return(
            <>
              <GroupItem
                title={ad.name}
                label={ad.question}
                smallTitle={ad.coffe}
                smallLabel={ad.tea}
              />
              <button className="btn btn-danger" onClick={this.blockUser}>Bloquear</button>
              <button className="btn btn-danger" onClick={this.removeQuestion}>Remover pergunta</button>
            </>
          );
        });
      } else return false;
    }
  }

  buildAccountMenu = () => {
    return(
        <>
        {
        this.state.isLoading ? <span>Loading ...</span> : (
          this.state.loadingAcc ? <span>Loading ...</span> : (
            this.state.accounts.length <= 3 ? (
              <BtnGroup className="btn btn-primary">
                {this.state.accounts.map(acc => {
                  return (
                    <button className="btn btn-primary"
                      onClick={()=>this.handleClick(acc.id)}
                      key={acc.key}
                      >{acc.name} ({acc.questions})
                    </button>
                  );
                })}
              </BtnGroup>
          ):(this.state.accounts.length > 3 ? (
              <DropDown
                title="Minhas Contas"
                >{this.state.accounts.map(acc => {
                  return (
                    <button
                      className="dropdown dropdown-item"
                      onClick={()=>this.handleClick(acc.id)}
                      >{acc.name} ({acc.questions})
                    </button>
                  );
                })}
              </DropDown>
          ):(<div>Você não possui contas sincronizadas.</div>)) 
          )
        )
        }
      </>
    );
  }

  buildDataCard = () => {
    return (
      <>
        <ul className="list-group col-md-4 mb-1">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Contas Sincronizadas
            <span className="badge badge-primary badge-pill">{this.state.totalOfAcc}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Perguntas não respondidas
            <span className="badge badge-primary badge-pill">{this.state.totalOfAds}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {this.buildAccountMenu()}
            <button className="btn btn-secondary"
              onClick={()=>this.handleCategories()}
              >Categorias
            </button>
          </li>
        </ul>
      </>
    );
  }

  render() {
    return(
      <>
        {this.buildDataCard()}
        <hr/>
        {this.state.categoriesDataTableIs === 'closed' ? <div /> : (<DataTable />)}
        <GroupHolder className="col-md-8">
          {this.buildQuestsCard() ||
          <GroupItem 
            title="Não há perguntas a serem repondidas."
            label="Você poderá responder a todas as perguntas por aqui.">
          </GroupItem>}
        </GroupHolder>
      </>
    );
  }
}

export default Perguntas;
