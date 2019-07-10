import Swal from 'sweetalert2';

// Anyone can use this function to show a 'Error Sweet Alert'.
// Just import it to your code and pass the error properties to the function. Ex.: errorResponse('This is an error');

function swalShout (error) {
    Swal.fire({
        html: `<p>Error. Server response ${error}</p>`,
        type: 'error',
        showCloseButton: true,
        
    });
};

export default swalShout;