import React, { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../../../services/api';
import { Data } from '../../../../containers/data';
import { Row } from 'reactstrap';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default function DataTable(props) {
  const [selected, setSelected] = useState([]);

  const deleteList = () => {
    api.delete(`/blacklist/list/${selected}`)
    .then(response => {
      if (response.status === 200) {
        Swal.fire({
          html: '<p>Lista excluída com sucesso</p>',
          type: 'success',
          showConfirmButton: true
        });
        
      } else {
        Swal.fire({
          html: '<p>Algo deu errado, tente novamente mais tarde.</p>',
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

  const Checkbox = props => <input type="checkbox" onChange={setSelected(props.id)} checked={props.active} />
  const CheckboxCell = (cell, row) => <Checkbox id={row.id} active={cell} />;
  return(
    <Data.Consumer>
      {(provider) => {
        return (<>
          <button
            style={{marginBottom: '-58px'}}
            className="btn btn-danger btn-sm mr-5"
            onClick={() => deleteList()}><icon className="fa fa-trash"></icon></button>
          <BootstrapTable
            version="4"
            striped
            hover
            pagination
            search
            data={props.blacklistLists}
            paginationSize={props.paginationSize}
            sortIndicator ={true}
            hideSizePerPage ={true}
            hidePageListOnlyOnePage ={true}
            clearSearch ={true}
            alwaysShowAllBtns ={false}
            withFirstAndLast ={false}
            >
          <TableHeaderColumn dataField="id" dataSort>
            Id
          </TableHeaderColumn>
          <TableHeaderColumn isKey dataField="name">
            Nome
          </TableHeaderColumn>
          <TableHeaderColumn dataField="description" dataSort>
            Descrição
          </TableHeaderColumn>
          <TableHeaderColumn dataField="active" dataFormat={ CheckboxCell }>
            Selecionar
          </TableHeaderColumn>
        </BootstrapTable></>);
      }}
    </Data.Consumer>
  );
}