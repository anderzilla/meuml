import React, { Component } from 'react';
import {getToken} from '../../../auth';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

class CallBack extends Component {

  constructor(props) {
    super(props);
    const token = window.location.href.split('?')[1].split('=')[1].split('&')[0];
    this.state = {
      token: token,
      message: '',
      status: '',
      linkLista: '',
      redirect: false,

    };

    
    axios.post(`https://api.app2.meuml.com/accounts/from-mercado-livre`, 
    {"code": token,},
    { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
      if (res.data.status === 'success'){
          return ( <Redirect to='/listacontas' /> ) ;
      }
    }).catch(error => {
      Swal.fire({html:'<p>'+ error +'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar',
      onClose: () => {
        return ( <Redirect to='/listacontas' /> ) ;
      }});
    });

  }
}

export default CallBack;
