import Swal from 'sweetalert2';
import api from '../../services/api';
import swalShout from '../../helpers/swalShout';

export async function apiGet(props) {
    const { url, onSuccess } = props;

    try {
        const res = await api.get(url);

        res.status === 200 ? (
            Swal.fire({
                html: `<p>${onSuccess}</p>`,
                type: 'success',
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonText: 'Fechar'
              })
  
        ) : (
            Swal.fire({
                html: `<p>Response Status: ${res.status}</p>`,
                type: 'error',
                showConfirmButton: false,
                showCancelButton: false,
                showCloseButton: true,
                closeButtonText: 'Fechar'
              
            }).then(()=> this.setState({ hasChanged:false }))
            );
    } catch (error) {
        swalShout(error);
    }
};

export async function apiDelete(props) {
    const { url, onSuccess } = props;

    try {
        const res = await api.get(url);

        res.status === 200 ? (
            Swal.fire({
                html: `<p>${onSuccess}</p>`,
                type: 'success',
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonText: 'Fechar'
              })
  
        ) : (
            Swal.fire({
                html: `<p>Response Status: ${res.status}</p>`,
                type: 'error',
                showConfirmButton: false,
                showCancelButton: false,
                showCloseButton: true,
                closeButtonText: 'Fechar'
              })
            )
    } catch (error) {
        swalShout(error);
    }
}

export async function apiPost(props) {
    const { url, data, onSuccess } = props;
    
    try {
        const res = await api.post(url, data);

        res.status === 200 ? (
            Swal.fire({
                html: `<p>${onSuccess}</p>`,
                type: 'success',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            }).then(()=> this.setState({ hasChanged: false }))
        ) : (swalShout(res.status))

    } catch (error) {
        swalShout(error);
    }
}

export async function apiPut(props) {
    const { url, data, onSuccess } = props;
    
    try {
        const res = await api.put(url, data);

        res.status === 200 ? (
            Swal.fire({
                html: `<p>${onSuccess}</p>`,
                type: 'success',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            }).then(()=> this.setState({ hasChanged: false }))
        ) : (swalShout(res.status))
    } catch (error) {
        swalShout(error);
    }
}

export async function validate(props) {
    if(!props.question) {
        this.callback(props);
    
    } else {
      try {
        const {value: res} = await Swal.fire({
            html:`<p>${props.question}</p>`,
            type: 'question',
            showConfirmButton: true,
            confirmButtonText: 'Confirmar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        });

        props.data = res;

      } catch (error) {
        swalShout(error)
      }
  }
}