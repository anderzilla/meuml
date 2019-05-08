import { Component } from 'react';
//import { Button, Card, CardBody, CardHeader, CardFooter, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

class AdicionarConta extends Component {

  constructor(props) {
    super(props);
    
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get('code')
    console.log(token)//retorno do mercado livre
    
    this.state = {
      token: '',
      message: '',
      status: '',
    };

    axios.post(`https://api.app2.meuml.com/from-mercado-livre`, {
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
      Swal.fire({html:'<p>'+ error+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar',
      onClose: () => {
        console.log(error);
        
        //this.props.history.push('/listacontas');
        //window.location.reload();
      }});
    });
  }
}

export default AdicionarConta;
