import React, { Component } from 'react';
import { apiGet, apiPost, apiPut, apiDelete } from './api-lexicon';
import Swal from 'sweetalert2';

class ApiInvoker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: null,
            data: null,
            http: null,
            question: null,
        };
        this.callback = this.callback.bind(this);
        this.httpValidation = this.httpValidation.bind(this);
    }

    httpValidation = () => {
        const { http } = this.props;
        if(http === 'get' || http === 'post' || http === 'put' || http === 'delete'){
          return true;
        } else {
          Swal.fire({html:`<p>Método HTTP (${this.props.http}) inválido</p>`, type: "error", showCloseButton:true});
          return false;
        };
    };

    anyQuestions = async (question) => {
      try {
        if(question !== undefined && question !== null && question !== '') {
          const {value: res} = await Swal.fire({
            title: question,
            input: "text",
            type: "question",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Salvar",
          });

          return res;
        } else return false;
      }catch(err) { Swal.fire({title: err, type:"error", showCloseButton: true}) };
    }

    callback = async () => {
        try {
            const httpValidation = await this.httpValidation(this.props.http);
            const questions = await this.anyQuestions(this.props.question);
            
            if(httpValidation !== false) {
              const { url, data, http, question } = this.props;
              this.setState({ url, data, http, question });
              
              if(questions !== false && questions !== '') { 
                this.state.data = questions; 
                console.log(this.state)
                await this.callApi();
              }
              else {
                if(this.props.data !== null && this.props.data !== undefined) {
                  this.setState({ data: this.props.data });
                  await this.callApi();
                } 
                else {
                  this.setState({ data: null });
                  await this.callApi();
                };
              };
              
            } else {
              this.setState({
                url: null,
                data: null,
                http: null,
                question: null            
              });

              Swal.fire({
                html: 'Protocolo HTTP inválido.',
                type: 'warning',
                showCloseButton: true
              });
            }
        } catch {
          Swal.fire({
            html:`<p>Erro interno.</p>`,
            type: 'error',
            showCloseButton: true
          });
        }
    };

    callApi = async () => {
      console.log(this.state);
      if(this.state.http === 'get') await apiGet(this.state.url);
      else if(this.state.http === 'delete') apiDelete(this.state.url, this.state.onSuccess);
      else if(this.state.http === 'put') await apiPut(this.state.url, this.state.data);
      else if(this.state.http === 'post') apiPost(this.state.url, this.state.data, this.state.onSuccess, this.state.question);
    }

  render() {
    return(
        <button type="button"
          className={this.props.className}
          url={this.props.url}
          data={this.props.data}
          http={this.props.http}
          onSuccess={this.props.onSuccess}
          question={this.props.question}
          onClick={ ()=> this.callback() }
          >{this.props.children}
        </button>
    );
  }
}

export default ApiInvoker;
