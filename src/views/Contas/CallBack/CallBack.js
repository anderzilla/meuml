import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
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
      executed: false,
      doIt: 0
    };
  }
  render(){
    const token = this.state.token;

    return (
        !this.state.executed ? (

            axios.post(process.env.REACT_APP_API_URL + `/accounts/from-mercado-livre`,
                {"code": token,},
                {headers: {"Authorization": 'Bearer ' + getToken()}},
            ).then(res => {
              this.setState({
                executed: true,
                doIt: 2
              })
              window.location.reload();
            }).catch((error) => {     
              !error.response ?
              (this.setState({tipoErro: error})) :
              (this.setState({tipoErro: error.response.data.message}))
              Swal.fire({html:'<p>'+ this.state.tipoErro+'<br /></p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar',
              onClose: () => {
                window.location.reload();
              }
            });
            
            })

        ) : (
            console.log('None')
        )
    )
  }
}

export default CallBack;