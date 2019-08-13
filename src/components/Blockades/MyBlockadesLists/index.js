import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Carton from '../../Card';
import DataTable from './DataTable';
import api from '../../../services/api';
import { DataContainer } from '../../../containers/data'

export default function Main() {
  const [blacklistLists, setBlacklistLists] = useState([]);
  const [paginationSize, setPaginationSize] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBlockadesLists = async () => {
    try {
      const response = await api.get('/blacklist/list');
      if (response.status === 200) {
        setBlacklistLists(response.data.data);
        setPaginationSize(response.data.meta.total)
      }
      else Swal.fire({
        html: `<p>${response.data.message}</p>`,
        type: 'error',
        showCloseButton: true
      });
    } catch (error) {
      Swal.fire({
        html: `<p>${error}</p>`,
        type: 'error',
        showCloseButton: true
      });
    }
  }
  
  if(loading === true) {
    fetchBlockadesLists();
    setLoading(false);
  }
  return (
    <DataContainer>
      <Carton header={
        <button className="btn btn-dark" onClick={()=> fetchBlockadesLists()}>Atualizar</button>}>
        <DataTable blacklistLists={blacklistLists} paginationSize={paginationSize} />
      </Carton>
    </DataContainer>
  );
}