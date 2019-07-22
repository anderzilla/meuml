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
            onSuccess: null,
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

          return res.value;
        } else return false
      }catch(err) { Swal.fire({title: err, type:"error", showCloseButton: true}) };
    }

    callback = async () => {
        try {
            const httpValidation = await this.httpValidation(this.props.http);
            const questions = await this.anyQuestions(this.props.question);
            if(httpValidation !== false) {
              const { url, data, http, onSuccess, question } = this.props;
              await this.setState({ url, data, http, onSuccess, question });
              if(questions !== false) { await this.setState({ data: questions }); }
              else {
                if(this.props.data !== null) {
                  await this.setState({ data: this.props.data }); 
                } else await this.setState({ data: null })
              }
              await this.callApi();
            }
        } catch(err) {}//swalShout(err, 'error');}
    };

    callApi = async () => {
      if(this.state.http === 'get') await apiGet(this.state.url, this.state.onSuccess);
      else if(this.state.http === 'delete') await apiDelete(this.state.url, this.state.onSuccess);
      else if(this.state.http === 'put') await apiPut(this.state.url, this.state.data, this.state.onSuccess, this.state.question);
      else if(this.state.http === 'post') await apiPost(this.state.url, this.state.data, this.state.onSuccess, this.state.question);
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
