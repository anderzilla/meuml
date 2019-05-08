import React, { Component } from 'react';
//import { Button, Card, CardBody, CardHeader, CardFooter, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

class CallBack extends Component {

  constructor(props) {
    super(props);
    
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get('code')
    console.log(token)//retorno do mercado livre
    
    this.state = {
      token: token,
      message: '',
      status: '',
    };
    Swal.fire({html:'<p>'+this.state.token+'</p>', type: 'error', showConfirmButton: true,
       onClose: () => {
        console.log(this.state.token); 
        this.props.history.push('/listacontas');
        window.location.reload();
       }});
    console.log('Código recebido: '+this.state.token);
    
    /*axios.post(`https://api.app2.meuml.com/accounts/from-mercado-livre`, {
      "code": this.state.token,
    })
    .then(res => {
      if (res.data.status === 'success'){
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'success', showConfirmButton: true,
        onClose: () => {
          console.log(res.data.status);
          //this.props.history.push('/listacontas');
          //window.location.reload();
        }});
      }else{
       Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true,
       onClose: () => {
        console.log(res.data.message); 
        //this.props.history.push('/listacontas');
         //window.location.reload();
       }});
      }
    }).catch(error => {
      Swal.fire({html:'<p>ErroGeral::'+ error+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar',
      onClose: () => {
        console.log(error);
        
        //this.props.history.push('/listacontas');
        //window.location.reload();
      }});
    });*/

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
