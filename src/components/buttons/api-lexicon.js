import api from '../../services/api';
import Swal from 'sweetalert2';

export async function apiGet(url) {
    try {
        const res = await api.get(url);
        console.log(res)
        if(res !== undefined) Swal.fire({
            title: res.data.message,
            type: res.data.status,
            showCloseButton: true
        });
    }catch {
        Swal.fire({
            title:"Sem resposta do servidor.",
            type:"error",
            showCloseButton: true
        }) }
};

export async function apiDelete (props) {
    try {
        const { url } = props;
        let onSuccess = props.onSuccess || 'Feito!';
        const res = await api.get(url);
        res.status === 200 ? Swal.fire({title: onSuccess, type: "success"})
        : Swal.fire({title: res.status, type: "warning", showCloseButton: true});
    } catch { Swal.fire({title: 'e', type: "error", showCloseButton: true}); }
}

export async function apiPost (props) {    
    try {
        const { url, data } = props;
        let onSuccess = props.onSuccess || 'Feito!';
        const res = await api.post(url, data);
        res.status === 200 ? Swal.fire({title: onSuccess, type: 'success', showCloseButton: true})
        : Swal.fire({title: res.status, type: "warning", showCloseButton: true});
    }catch { Swal.fire({title: 'err', type: "error", showCloseButton: true}); }
}

export async function apiPut(props) {    
    try {
        const { url, data } = props;
        const res = await api.put(url, data);
        if(res !== undefined) Swal.fire({
            html: `<p>${res.data.message}</p>`,
            type: res.data.status,
            showCloseButton: true
        });
    }catch {
        Swal.fire({
            html: 'Erro interno.',
            type: "error",
            showCloseButton: true
        }); 
    }
}
