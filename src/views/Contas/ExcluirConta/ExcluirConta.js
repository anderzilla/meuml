import { Component } from 'react';
import {getToken} from '../../../auth';
import axios from 'axios';
import Swal from 'sweetalert2';

class ExcluirConta extends Component {

  constructor(props) {
    super(props);
    const { handle } = this.props
    let account_id = this.props.match.params.id
    axios.delete(`https://api.app2.meuml.com/accounts/` + account_id,
        { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
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

export default ExcluirConta;



