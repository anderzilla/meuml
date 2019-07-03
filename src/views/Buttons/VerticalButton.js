import React, { Component } from 'react';
import api from '../../services/api';
import { getToken } from '../../auth';
import axios from 'axios';

import Swal from 'sweetalert2';
import ButtonGroup from 'reactstrap/lib/ButtonGroup';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default class VerticalBtnGroup extends Component{
    constructor(props){
        super(props);

        this.state = {
            dropdownOpen: false,
            newName: null,
        };

        // Binds
        this.toggle = this.toggle.bind(this);
    };

    // Dropdown Toggle
    toggle() {
        if(this.state.dropdownOpen === true) {
            this.setState({ dropdownOpen: false });

        } else {
            this.setState({ dropdownOpen: true });
        };
    };

    // Account sync
    async sync(account_id) {
        const url = `${process.env.REACT_APP_API_URL}/accounts/${account_id}/sync`;
        const headers = { headers: {'Authorization' : 'Bearer '+getToken()} };

        try {
            const response = await api.get(url, headers);
            console.log(response);

            if(response.data.status === 'success') {
                Swal.fire({
                    html: `<p>${response.data.message}<p>`,
                    type: 'success',
                    showConfirmButton: true
                });

            } else {
                Swal.fire({
                    html: `<p>${response.data.message}</p>`,
                    type: 'error',
                    showConfirmButton: true
                });
            };

        } catch(err) {
            console.log(err);
            Swal.fire({
                html: `<p>${err}</p>`,
                type: 'error',
                showConfirmButton: true
            });
        };
    };

    // Delete account
    async delete(account_id){
        const url = `${process.env.REACT_APP_API_URL}/accounts/${account_id}`;
        const headers = { headers: {'Authorization' : 'Bearer '+getToken()} };

        try {
            const response = await api.delete(url, headers);
            console.log(response);

            if(response.data.status === 'success') {
                Swal.fire({
                    html: `<p>${response.data.message}<p>`,
                    type: 'success',
                    showConfirmButton: true,
                    onClose: () => { this.fetchAccounts() }
                });

            } else {
                Swal.fire({
                    html: `<p>${response.data.message}</p>`,
                    type: 'error',
                    showConfirmButton: true
                });
            };

        } catch(err) {
            console.log(err);
            Swal.fire({
                html: `<p>${err}</p>`,
                type: 'error',
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonText: 'Cancelar'
            });
        };
    };

    // Rename account
    rename(account_id) {
        Swal.fire({
          title: 'Renomear Conta:',
          input: 'text',
          showCancelButton: true,
          inputPlaceholder: 'Preencha o novo nome'
        }).then(res => {
            this.setState({ newName: res.value });

            if(this.state.name !== null) {
                const url = `${process.env.REACT_APP_API_URL}/accounts/${account_id}`;
                const name = {'name': this.state.newName};
                const headers = {headers: {'Authorization': 'Bearer ' + getToken()}};

                api.put(url, name, headers).then(response =>{
                    if(response === 'success') {
                        document.getElementById('nomeConta').innerHTML = this.state.newName;
                    } else {
                        Swal.fire({
                            html: `<p>${response}</p>`,
                            type: 'error',
                            showConfirmButton: true
                      });
                    };
                });
            }
        });
    };


    render(){
        const acc = this.props.account

        return(
            <div className="ButtonGroup">
                <ButtonGroup>
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={() => { this.toggle() }}>
                    <DropdownToggle
                        caret color="primary"
                        size="sm"
                        >Opções
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={ () => this.rename(acc) }

                        >Renomear</DropdownItem>
                        <DropdownItem
                            onClick={ () => this.sync(acc) }
                            >Sincronizar
                        </DropdownItem>
                        <DropdownItem
                            onClick={ () => this.delete(acc) }
                            >Excluir
                        </DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                </ButtonGroup>

            </div>
        );
    };
};


//   //motor do dropdown
//   toggle(i) {
//     const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
//     this.setState({
//       dropdownOpen: newArray,
//     });
//   }
//   componentDidMount() {
//     this.fetchAccounts();
//   }
//   //Sincronizar Conta
//   sincronizar(account_id){
//     axios.get(process.env.REACT_APP_API_URL + `/accounts/` + account_id + '/sync',
//         { headers: {"Authorization" : 'Bearer '+getToken()}},
//     ).then(res => {
//       console.log(res);
//       if (res.data.status === 'success'){
//         Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'success', showConfirmButton: true});
//       }else{
//         Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
//       }
//     }).catch(error => {
//       Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
//     });
//   }
//   //Excluir conta
//   excluir(account_id){
//     axios.delete(process.env.REACT_APP_API_URL + `/accounts/` + account_id,
//         { headers: {"Authorization" : 'Bearer '+getToken()}},
//     ).then(res => {
//       if (res.data.status === 'success'){
//         Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'success', showConfirmButton: true, onClose: () => {
//           this.fetchAccounts();
//         }});
//       }else{
//         Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
//       }
//     }).catch(error => {
//       Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
//     });
//   }
//   //Renomear conta * somente para o sistema
//   renomear(account_id,index){
//     const {value: novoNome} =  Swal.fire({
//       title: 'Renomear Conta:',
//       input: 'text',
//       showCancelButton: true,
//       inputPlaceholder: 'Preencha o novo nome'
//     }).then((result) => {
//       console.log(result)
//       if (result.value) {
//         axios.put(process.env.REACT_APP_API_URL + `/accounts/` + account_id,
//             {'name' : result.value},
//             { headers: {"Authorization" : 'Bearer '+getToken()}},
//         ).then(res => {
//           console.log(res);
//           if (res.data.status === 'success'){
//             document.getElementById('nomeConta-'+index).innerHTML = result.value;
//           }else{
//             Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true,})
//           }
//         }).catch(error => {
//           Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', confirmButtonText: 'Fechar'});
//         });
//       }
//     });
//   }