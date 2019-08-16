import React, { Component } from 'react';
import { getUserId, getUserName, getUserEmail } from '../auth';
import admins from '../services/isadmin';
import Swal from 'sweetalert2';
export const Data = React.createContext();

export class DataContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAdmin: false,
    }
  }  

  componentWillMount() {
    this.getUserProps();
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }

  getUserProps = async () => {
    try {
      const userId = await getUserId();
      const userName = await getUserName();
      const userEmail = await getUserEmail();
      this.setState({
        userId: userId,
        userName: userName,
        userEmail: userEmail
      }); 
    } catch (error) {
      console.log(error);
    } finally {
      this.isUserAdmin();
    }
  }

  isUserAdmin = () => {
    const isAdmin = this.verifyUser();
    if (isAdmin === true) this.setState({ isAdmin: true })
    else this.setState({ isAdmin: false });
  }

  verifyUser = () => {
    const { id, name, email } = this.state;
    const { idAdmin, nameAdmin, emailAdmin } = admins[0];
    if (
      id === idAdmin &&
      name === nameAdmin &&
      email === emailAdmin
    ) return true
    else return false;
  }

  accessDenied = () => {
    this.props.history.push('/#/inicio');
  }

  render() {
    return(
      <Data.Provider 
        value={{
            state: this.state,
            accessDenied: () => this.accessDenied(),
          }}
        >{this.props.children}
      </Data.Provider>
    );
  }
}
