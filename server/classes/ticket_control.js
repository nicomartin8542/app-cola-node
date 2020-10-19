const fs = require('fs');


class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl {

    constructor() {

        this.turno = 0;
        this.dia = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.dia === this.dia) {
            this.turno = data.turno;
            this.tickets = data.tickets;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteNumero() {
        this.turno += 1;
        let ticket = new Ticket(this.turno, null);
        this.tickets.push(ticket);
        this.guardarData();
        return `Ticket ${this.turno}`;
    }

    reiniciarConteo() {
        this.turno = 0;
        this.tickets = [];
        this.guardarData();
    }

    getUlitmoTicket() {
        return `Ticket ${this.turno}`;
    }

    getUlitmo4() {
        return this.ultimos4;
    }

    guardarData() {
        let ticketReiniciado = {
            turno: this.turno,
            dia: this.dia,
            tickets: this.tickets
        }

        let jsonString = JSON.stringify(ticketReiniciado);
        fs.writeFileSync('./server/data/data.json', jsonString);
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        //Guardo el primer ticket del arreglo
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        //Agrego ticket atendido al array de los ultimos4 con unshift
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket);

        //Verifico si hay mas de cuatro tickets, si hay elimino el ultimo con splice
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }

        // console.log('Ultimos 4');
        // console.log(this.ultimos4);

        this.guardarData();

        return atenderTicket;
    }


}

module.exports = {
    TicketControl
}