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
                this.props.history.push('/listacontas?status=add'+res.data.status);
                window.location.reload();
              } else {
                this.props.history.push('/listacontas?status='+res.data.status);
                window.location.reload();
              }
            }).catch((error) => {     
              !error.response ?
              (this.setState({tipoErro: error.message})) :
              (this.setState({tipoErro: error.response.data.message}))
                if (error.response.status === 400) {
                  this.props.history.push('/listacontas?status=400');
                  window.location.reload();
                }else if(error.response === 409){
                  this.props.history.push('/listacontas?status=409');
                  window.location.reload();
                } else {
                  this.props.history.push('/listacontas?status='+error.response.status);
                  window.location.reload();
                }
            })

        ) : (
          window.location.href("/listacontas?status=erro")
        )}
        </div>
    )
  }
}

export default CallBack;