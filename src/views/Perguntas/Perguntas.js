import React, { Component } from 'react';
import axios from "axios";
import {getToken} from "../../auth";
import SemContas from "../Contas/SemContas/"
import Swal from "sweetalert2";
import {
  Button,
  Card,
  Col,
  CardBody,
  CardFooter,
  CardHeader,
  Table,
  ButtonGroup,
  ButtonDropdown,
  Dropdown,
  DropdownToggle, DropdownMenu, DropdownItem, Row,
  Input
} from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import fotoPadrao from "../../assets/img/avatars/user.svg";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Perguntas extends Component {


  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(2).fill(false),
      questions: [],
      accounts: [],
      isLoading: true,
      isLoadingAccounts: true,
      total: 0,
      answer:'',
      not_has_accounts: false
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

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  componentDidMount() {
    this.fetchAccounts()
    //this.fetchQuestions();
  }

  fetchAccounts()
  {


    this.url = process.env.REACT_APP_API_URL + `/accounts?extra_fields=unanswered_questions`

    axios.get(this.url,
        { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
      console.log(res);
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

      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => {
      Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });
  }

  fetchQuestions(account_id) {
    this.url = process.env.REACT_APP_API_URL + `/questions?account_id=` + account_id
    //this.url = `http://localhost:8000/api/questions`
    axios.get(this.url,
        { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
      console.log(res);
      if (res.status === 200){
        console.log(res.data);
        this.setState({
          questions: res.data.data,
          isLoading: false,
          total: res.data.data.length,
          account_id: account_id
        });

      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => {
      Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });
  }

  sendAnswer() {

    this.url = process.env.REACT_APP_API_URL + `/questions/answer`
    //this.url = `http://localhost:8000/api/questions`
    axios.post(this.url,
        {
          'account_id' : this.state.account_id.toString(),
          'question_id' : this.state.question_id,
          'text' : this.state.answer[this.state.question_id]
        },
        { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {

      if (res.status === 200){

        Swal.fire({html:'<p>Pergunta respondida com sucesso!</p>', type: 'success', showConfirmButton: true, timer: 5});

        setTimeout(this.fetchQuestions(this.state.account_id),10000);

      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => {
      Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });
  }

  removeQuestion(question){

    this.url = process.env.REACT_APP_API_URL + `/questions/` + question + '?account_id=' + this.state.account_id

    axios.delete(this.url,
        { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {

      if (res.status === 200){

        Swal.fire({html:'<p>Pergunta deletada com sucesso!</p>', type: 'success', showConfirmButton: true, timer: 5});

        setTimeout(this.fetchQuestions(this.state.account_id),10000);

      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => {
      Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });

  }


  blockUserFromQuestions(question, user){
    this.url = process.env.REACT_APP_API_URL + `/questions/` + question + '/block/user'

    axios.post(this.url,
        {
            user_id: user.toString(),
            account_id:this.state.account_id,
            item_id: question.toString()
        },
        { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {

      if (res.status === 200){

        Swal.fire({html:'<p>Pergunta deletada com sucesso!</p>', type: 'success', showConfirmButton: true, timer: 5});

        setTimeout(this.fetchQuestions(this.state.account_id),10000);

      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => {
      Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });

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
    {console.log(this.state)}
    return (
        this.state.not_has_accounts === false ? (
          <div className="animated fadeIn">
            <Card>
              <CardHeader>
                <h4>Perguntas - ({this.state.total}) </h4>

                <br />
                <ButtonGroup>

                  <ButtonDropdown isOpen={this.state.dropdownOpen[1]} toggle={() => { this.toggle(1); }}>
                    <DropdownToggle caret color="primary" size="sm">
                      Opções
                    </DropdownToggle>
                    <DropdownMenu>

                      {!this.state.accounts.isLoadingAccounts ? (
                          this.state.accounts.map(c => {

                            {if(this.state.accounts.length === 1){
                                var checked = this.state.accounts[0].name
                            }}
                            {if(checked === c.name){
                              return (
                                  <DropdownItem onClick={() => this.fetchQuestions(c.id)}>{c.name}  ({c.count_questions})</DropdownItem>
                              )
                            }else{
                              return (
                                  <DropdownItem onClick={() => this.fetchQuestions(c.id)}>{c.name}</DropdownItem>
                              )
                            }}

                          })
                      ) : (
                          <h3>Loading...</h3>
                      )}
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
              </CardHeader>

              <CardBody>


                {!this.state.isLoading ? (

                    this.state.questions.length > 0 ? (
                        this.state.questions.map(question => {
                          return (
                              <Card id={"question-" + question.id}>
                                <CardBody className={"card text-black bg-default"} >
                                  {question.text}
                                </CardBody>
                                <CardFooter className="px-3 py-2">
                                  <Col md={12} lg={12}>

                                    <Row>
                                      <Input type={'textarea'} className={"col-md"} id={question.id} value={this.state.answer[question.id]} onChange={this.handleChange} />
                                      <hr />
                                    </Row>
                                    <Row>
                                      <Col md={3} lg={3}>
                                        <Button className={"btn btn-success"} onClick={this.handleClick}>{"Responder pergunta"}</Button>
                                      </Col>

                                      <Col md={3} lg={3}>
                                        <Button className={"btn btn-danger"} onClick={() => this.removeQuestion(question.id)}>{"Remover Pergunta"}</Button>
                                      </Col>

                                      <Col md={3} lg={3}>
                                        <Button className={"btn btn-default"}  onClick={() => this.blockUserFromQuestions(question.id, question.from.id )}>{"Bloquear usuário para perguntar"}</Button>
                                      </Col>

                                      <Col md={3} lg={3}>
                                        <Button className={"btn btn-default"}  onClick={this.handleClick}>{"Bloquear usuário para perguntar e comprar"}</Button>
                                      </Col>
                                    </Row>
                                  </Col>
                                </CardFooter>
                              </Card>
                          )
                        })
                  ) : (
                      <h3>Nenhuma pergunta pendente.</h3>
                  )
                ) : (
                    <h3>Carregando ...</h3>
                )}
              </CardBody>

            </Card>

          </div>
      ) : (
            <SemContas
                {...this.state}
            />
      )
    );
  }
}

export default Perguntas;
