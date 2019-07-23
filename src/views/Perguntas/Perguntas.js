import React, { Component } from 'react';
import api from '../../services/api';
import { BtnGroup, Item } from '../../components/buttons/ButtonGroup';
import Swal from "sweetalert2";
import {
  Button,
  Card,
  Col,
  CardBody,
  CardFooter,
  CardHeader,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, Row,
  Input,
} from "reactstrap";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Perguntas extends Component {


  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(2).fill(false),
      advertisings: [],
      accounts: [],
      isLoading: true,
      isLoadingAccounts: true,
      total: 0,
      answer:'',
      not_has_accounts: false,
      backend_error: false,
      ressync: false
    };


    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleClick() {
    this.sendAnswer()
  }

  show_alert(type, text){
    if(type === 'success'){
      this.success(text)
    }
    if(type === 'error'){
      this.error(text)
    }
  }

  success(text) {
    // default type
    return toast.success(text, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  error(text) {
    // add type: 'error' to options
    return toast.error(text);
  }

  componentDidMount() {
    this.fetchAccounts()
  }

  fetchAccounts()
  {

    this.url = `/accounts?extra_fields=unanswered_questions`;
    api.get(this.url).then(res => {
      if (res.status === 200){
        this.setState({
          accounts: res.data.data,
          isLoadingAccounts: false
        });
        if(res.data.data.length > 0){
          this.fetchQuestions(res.data.data[0].id)
        }else{
          this.setState({not_has_accounts: true});
        }
        this.setState({
          ressync: false
        })
      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => {
      this.setState({
        backend_error: true
      });
    });
  }

  fetchQuestions(account_id) {
    this.setState({
      ressync: true
    })
    this.url = `/questions/advertisings?account_id=` + account_id
    api.get(this.url).then(res => {
      if (res.status === 200){
        this.setState({
          advertisings: res.data.data.advertisings,
          isLoading: false,
          total: res.data.data.total_questions,
          account_id: account_id,
          ressync: false
        });
      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => this.setState({backend_error: true}));
  }

  sendAnswer() {
    this.url = `/questions/answer`;
    api.post(this.url,
        {
          'account_id' : this.state.account_id.toString(),
          'question_id' : this.state.question_id,
          'text' : this.state.answer[this.state.question_id]
        }
    ).then(res => {
      if (res.status === 200){
        Swal.fire({html:'<p>Pergunta respondida com sucesso!</p>', type: 'success', showConfirmButton: true});
        setTimeout(function ressync(){
          this.fetchQuestions(this.state.account_id);
          this.fetchAccounts();
          this.setState({
            ressync: false
          })
        }.bind(this), 2000);
      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => {
      Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });
  }

  removeQuestion(question){
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

  blockUserFromQuestions(customer_id = 0, item_id = 0, bids = false){
    this.url = `/blacklist`;
    if(bids === false){
      api.post(this.url,
          {
            account_id:this.state.account_id,
            user_id: customer_id.toString(),
            item_id: item_id.toString(),
         }
      ).then(res => {
        if (res.status === 200){
          Swal.fire({html:'<p>Pergunta deletada com sucesso!</p>', type: 'success', showConfirmButton: true});

          setTimeout(function ressync(){
            this.fetchQuestions(this.state.account_id);
            this.fetchAccounts();
            this.setState({
              ressync: false
            })
          }.bind(this), 2000);

        }else{
          Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
        }
      }).catch(error => {
        Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
      });

    }

  }

  handleChange(event) {
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
      
      </>
    );
  }
}

export default Perguntas;
