import api from '../../services/api';
import Swal from 'sweetalert2';

export async function apiGet(props) {
    try {
        const url = props.url;
        let onSuccess = props.onSuccess;
        let backupVar= null;
        onSuccess === undefined ? onSuccess = 'Feito!' : backupVar = 1;
        const res = await api.get(url);
        console.log(res)
        if(res.status === 200) Swal.fire({title:onSuccess, type:"success", showCloseButton: true});
        if(res.status !== 200) Swal.fire({title:res.data.message, type:"warning", showCloseButton: true})
    }catch(err) {Swal.fire({title:err, type:"error", showCloseButton: true}) }
};

export const apiDelete = async (props) => {
    try {
        const { url } = props;
        let onSuccess = props.onSuccess || 'Feito!';
        const res = await api.get(url);
        res.status === 200 ? Swal.fire({title: onSuccess, type: "success"})
        : Swal.fire({title: res.status, type: "warning", showCloseButton: true});
    }catch(err) { Swal.fire({title: err, type: "error", showCloseButton: true}); }
}

export const apiPost = async (props) => {    
    try {
        const { url, data } = props;
        let onSuccess = props.onSuccess || 'Feito!';
        const res = await api.post(url, data);
        res.status === 200 ? Swal.fire({title: onSuccess, type: 'success', showCloseButton: true})
        : Swal.fire({title: res.status, type: "warning", showCloseButton: true});
    }catch(err) { Swal.fire({title: err, type: "error", showCloseButton: true}); }
}

export async function apiPut(props) {    
    try {
        const { url, data } = props;
        let onSuccess = props.onSuccess || 'Feito!';
        const res = await api.put(url, data);
        res.status === 200 ? Swal.fire({title: onSuccess, type: 'success', showCloseButton: true}) 
        : Swal.fire({title: res.status, type: "error", showCloseButton: true});
    }catch(err) { Swal.fire({title: err, type: "error", showCloseButton: true}); }
}
