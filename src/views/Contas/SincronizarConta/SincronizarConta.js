import React, { Component } from 'react';
import axios from "axios";
import {getToken} from "../../../auth";
import Swal from "sweetalert2";

class SincronizarConta extends Component {
  constructor(props) {
    super(props);
    const { handle } = this.props
    let account_id = this.props.match.params.id
    axios.get(`https://api.app2.meuml.com/accounts/` + account_id + '/sync',
        { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
      console.log(res);
      if (res.data.status === 'success'){
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'success', showConfirmButton: true,
          onClose: () => {
            this.props.history.push('/listacontas');
            window.location.reload();
          }});
      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true,
          onClose: () => {
            this.props.history.push('/listacontas');
            window.location.reload();
          }});
      }
    }).catch(error => {
      Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar',
        onClose: () => {
          this.props.history.push('/listacontas');
          window.location.reload();
        }});
    });

  }
}

export default SincronizarConta;
