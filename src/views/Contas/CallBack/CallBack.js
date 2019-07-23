import React, { Component } from 'react';
import {getToken} from '../../../auth';
import axios from 'axios';
import ReactLoading from 'react-loading';

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
      <div className="animated fadeIn">
        <ReactLoading type={'spinningBubbles'} color={'#054785'} height={100} width={100}  className='spinnerStyle'/>
      {!this.state.executed ? (
            axios.post(process.env.REACT_APP_API_URL + `/accounts/from-mercado-livre`,
                {"code": token,},
                {headers: {"Authorization": 'Bearer ' + getToken()}},
            ).then(res => {
              this.setState({
                executed: true,
                doIt: 2
              })
              if (res.data.status === 'success') {
                this.props.history.push('/listacontas?status=add'+res.data.status+'mensagem='+res.data.message);
                window.location.reload();
              } else {
                this.props.history.push('/listacontas?status='+res.data.status+'mensagem='+res.data.message);
                window.location.reload();
              }
            }).catch((error) => {     
              !error.response ?
              (this.setState({tipoErro: error})) :
              (this.setState({tipoErro: error.response.data.message}))
                if (error.response !== undefined) {
                  this.props.history.push('/listacontas?status='+error+'&mensagem='+this.state.tipoErro);
                  window.location.reload();
                } else {
                  this.props.history.push('/listacontas?status='+error+'mensagem='+error.message);
                  window.location.reload();
                }
            })

        ) : (
          window.location.href("/listacontas?status=erro&mensagem=Desconhecido")
        )}
        </div>
    )
  }
}

export default CallBack;