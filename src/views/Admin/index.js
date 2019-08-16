import React from 'react';
import Swal from 'sweetalert2';
import Page404 from '../Sistema/Page404/';
import { Data } from '../../containers/data';
const Admin = () => {
  return(
    <Data.Consumer>
      {(provider) => {
        return (
          provider.state.isAdmin ? (
            <h1>Admin</h1>
          ):(<Page404 />)
        );
      }}
    </Data.Consumer>
  );
}
export default Admin;