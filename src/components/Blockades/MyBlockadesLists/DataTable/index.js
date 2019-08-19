import React, { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../../../services/api';
import { Data } from '../../../../containers/data';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default function DataTable(props) {
  const refresh = () => props.refresh();
  const deleteList = props => {
    Swal.fire({
      title: 'Você tem certeza?',
      html:`<p>Você deseja mesmo apagar a lista ${props.name}</p>`,
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Excluir lista',
      cancelButtonText: 'Cancelar'
    }).then(choice => {
      if(choice.value) {
        api.delete(`/blacklist/list/${props.id}`)
          .then(response => {
            if (response.status === 200) {
              refresh();
              Swal.fire({
                html: '<p>Lista excluída com sucesso</p>',
                type: 'success',
                showConfirmButton: true
              })
            }
            else {
              Swal.fire({
                html: '<p>Algo deu errado, atualize e tente mais uma vez.</p>',
                type: 'warning',
                showConfirmButton: true
              });
            }
          }).catch(error => {
            Swal.fire({
              html: `<p>Algo deu errado, tente novamente mais tarde.</p>`,
              type: 'warning',
              showConfirmButton: true
            });
          });
        }
    });
  }

  const DeleteButton = props => <button 
    type="button"
    className="btn btn-danger btn-sm"
    onClick={()=>deleteList({ id: props.id, name: props.name })}
    ><icon className="fa fa-trash" /> {props.name}
  </button>
  const Button = (cell, row) => <DeleteButton id={row.id} name={row.name} />;
  return(
    <Data.Consumer>
      {(provider) => {
        return (<>
          <BootstrapTable
            version="4"
            striped
            hover
            pagination
            search
            searchPlaceholder="Procurar ..."
            data={props.blacklistLists}
            paginationSize={props.paginationSize}
            sortIndicator ={true}
            hideSizePerPage ={true}
            hidePageListOnlyOnePage ={true}
            clearSearch ={true}
            alwaysShowAllBtns ={false}
            withFirstAndLast ={false}
            >
          <TableHeaderColumn isKey dataField="id" dataSort>
            Id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name">
            Nome
          </TableHeaderColumn>
          <TableHeaderColumn dataField="description" dataSort>
            Descrição
          </TableHeaderColumn>
          <TableHeaderColumn dataField="delete" dataFormat={ Button }>
            Deletar
          </TableHeaderColumn>
        </BootstrapTable></>);
      }}
    </Data.Consumer>
  );
}