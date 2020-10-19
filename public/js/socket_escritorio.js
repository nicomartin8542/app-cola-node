let socket = io();

let params = new URLSearchParams(window.location.search);

let label = $('small');

socket.on('connect', () => {
    console.log('Se conecto con el servidor');
});


socket.on('disconnect', () => {
    console.log('Se desconecto del servidor');
});


if (!params.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

let escritorio = params.get('escritorio');
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio }, function(resp) {
        if (!resp.numero) {
            $('h4').text(resp);
            alert(resp);
            return;
        }

        label.text(`Ticket ${resp.numero}`);
        console.log(resp);
    });
});