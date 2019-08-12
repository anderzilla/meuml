import Swal from 'sweetalert2';

const swalShout = (message, type) => {
    Swal.fire({ title: message, type: 'error', showCloseButton: true });
};
