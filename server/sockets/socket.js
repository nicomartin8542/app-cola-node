const { io } = require('../server');
const { TicketControl } = require('../classes/ticket_control');


let ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('usuario conectado');

    //Envio el ticket actual al actualizar la apgina
    client.emit('ticketActual', {
        estadoActual: ticketControl.getUlitmoTicket(),
        ultimos4: ticketControl.getUlitmo4()
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('nuevoTicket', (data, callback) => {
        let ticket = ticketControl.siguienteNumero();
        callback(ticket);
    });

    client.on('atenderTicket', (data, callback) => {
        if (data.escritorio === null) {
            return {
                ok: false,
                err: 'Tienen que haber un escritorio'
            }
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);
        client.broadcast.emit('ultimoTicket', ticketControl.getUlitmo4());

    });


});