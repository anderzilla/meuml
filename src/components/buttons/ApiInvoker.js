import React, { useState } from 'react';
import { apiGet, apiPost, apiPut, apiDelete } from './api-lexicon';
import Swal from 'sweetalert2';

async function ApiInvoker (props) {
  const [url, setUrl] = useState('');
  const [http, setHttp] = useState('');
  const [data, setData] = useState('');
  const [state, setState] = useState('waiting');

  async function callback(props) {
    try {
        const httpValidation = await httpValidate(props.http);
        const questValidation = await anyQuestions(props.question);
        const urlValidation = await urlValidate(props.url);

        if(httpValidation === true) {
          if(questValidation === true) {
            if(urlValidation === true) {
              await setState('ready');
              await callApi();
            } else {
              const msg = `<p>Url inválida.</p>`;
              Swal.fire({ html: msg, type: "error", showCloseButton:true });
            };
          };
        } else {
          const msg = `<p>Método HTTP (${props.http}) inválido</p>`;
          Swal.fire({ html: msg, type: "error", showCloseButton:true });
        };
        
    } catch { Swal.fire({ html:`<p>Erro interno.</p>`, type: 'error', showCloseButton: true }); }
  }

  async function callApi () {
    try {
      if(state === 'ready') {
        if(http === 'get') await apiGet(url);
        else if(http === 'delete') await apiDelete(url);
        else if(http === 'put') await apiPut(url, data);
        else if(http === 'post') await apiPost(url, data);
      }
    } catch(e) {
      Swal.fire({ html:e, type: 'error', showCloseButton: true });
    }
  }

  const httpValidate = (http) => {
    if(http === 'get' || http === 'post' || http === 'put' || http === 'delete') {
      setHttp(http);
      return true;
    } else return false;
  }

  const urlValidate = (url) => {
    if(url !== null && url !== undefined && url !== '') {
      setUrl(url);
      return true;
    } else return false;
  }

  const anyQuestions = (question) => {
    if(question !== undefined && question !== null && question !== '') {
      const {value: res} = Swal.fire({
        title: question, input: "text",
        type: "question", showConfirmButton: true,
        showCancelButton: true, confirmButtonText: "Salvar"});
      
      setData(res);
      return true
    } else return false;
  }

  return(
      <button type="button"
        className={props.className}
        url={props.url}
        data={props.data}
        http={props.http}
        question={props.question}
        onClick={ ()=> callback() }
        >{props.children}
      </button>
  );
}

export default ApiInvoker;
