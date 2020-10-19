//inicializo socket.io

let socket = io();
let label = $('#lblNuevoTicket');


socket.on('connect', () => {
    console.log('Se conecto con el servidor');
});

socket.on('ticketActual', (ticket) => {
    label.text(ticket.estadoActual);
});

socket.on('disconnect', () => {
    console.log('Se desconecto del servidor');
});


$('button').on('click', function() {
    socket.emit('nuevoTicket', null, (nuevoTicket) => {
        label.text(nuevoTicket);
    });
});