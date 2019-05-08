import React, { Component } from 'react';
//import { Button, Card, CardBody, CardHeader, CardFooter, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
//import { Link } from 'react-router-dom';
import {getToken} from '../../../auth';
import axios from 'axios';
import Swal from 'sweetalert2';

class CallBack extends Component {

  constructor(props) {
    super(props);
    
    //const search = props.location.search;
    //const query = new URLSearchParams(search);
    const token = window.location.href.split('?')[1].split('=')[1]
    //query.get('code')
    console.log(token)//retorno do mercado livre
    
    this.state = {
      token: token,
      message: '',
      status: '',
    };
    
    axios.post(`https://api.app2.meuml.com/accounts/from-mercado-livre`, 
    {"code": token,},
    { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
      if (res.data.status === 'success'){
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'success', showConfirmButton: true,
        onClose: () => {
          //console.log(res.data.status);
          this.props.history.push('/listacontas');
          //window.location.reload();
        }});
      }else{
       Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true,
       onClose: () => {
        //console.log(res.data.message); 
        this.props.history.push('/listacontas');
         //window.location.reload();
       }});
      }
    }).catch(error => {
      Swal.fire({html:'<p>ErroGeral::'+ error+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar',
      onClose: () => {
        //console.log(error);
        this.props.history.push('/listacontas');
        //window.location.reload();
      }});
    });

  }

  render(){
    
    return(
      <div className="app flex-row align-items-center">
      <p>{this.state.token}</p>
      </div>
    );
  }
  

}

export default CallBack;
