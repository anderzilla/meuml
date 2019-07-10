import { Component } from 'react';
import {logout} from '../../../auth';
import history from '../../../history';
import Swal from 'sweetalert2';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        try {
            logout();
            history.push('/');
        } catch (error){
            this.setState({ error });
        }
    }
    
    render() {
        if (this.state.error) {
          return Swal.fire({html:'<p>'+this.state.error+'</p>', type: 'error', showConfirmButton: true,});
        }
        return (
            Swal.fire({html:'<p>Logout realizado com sucesso</p>', type: 'info', showConfirmButton: true,
            onClose: () => {
            logout()
            window.location.reload();
        }})
        )
    }
}
export default Logout;

