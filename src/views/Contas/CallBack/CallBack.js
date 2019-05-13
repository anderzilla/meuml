import { Component } from 'react';
import {getToken} from '../../../auth';
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
        window.history.go(-2);
      }
    }).catch(error => {
      console.log(error);
      Swal.fire({html:'<p>'+ error.response +'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar',
      onClose: () => {
        window.history.go(-2);
      }});
    });
  }
}

export default CallBack;
