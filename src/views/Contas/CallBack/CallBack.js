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
      executed: false,
      doIt: 0
    };

    if(this.state.executed === false && this.state.doIt < 1) {
      axios.post(process.env.REACT_APP_API_URL + `/accounts/from-mercado-livre`,
          {"code": token,},
          {headers: {"Authorization": 'Bearer ' + getToken()}},
      ).then(res => {
        if (res.data.status === 'success') {
          Swal.fire({
            html: '<p>' + res.data.message + '</p>', type: 'success', showConfirmButton: true,
            onClose: () => {
              this.setState(
                  {
                    executed: true,
                    doIt: 2
                  }
              )
              this.props.history.push('/listacontas');
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            html: '<p>' + res.data.message + '</p>', type: 'error', showConfirmButton: true,
            onClose: () => {
              this.props.history.push('/listacontas');
              window.location.reload();
            }
          });
        }
      }).catch(error => {
        console.log('rejected');
        console.log(error.response);

        if (error.response !== undefined) {
          Swal.fire({
            html: '<p>' + error.response.data.message + '</p>',
            type: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            onClose: () => {
              this.props.history.push('/listacontas');
              window.location.reload();
            }
          });
        } else {
          return true;
        }
      });
    }
  }
}

export default CallBack;
