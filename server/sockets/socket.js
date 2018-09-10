const { io } = require('../server');
const{ TicketControl }= require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguienteTicket();

        console.log(`El siguiente ticket es: `, siguiente);
        callback(siguiente);
    });

    //Emitir un evento llamado 'estadoActual' ==> retorna ultimo ticket
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    client.on('atenderTicket', (data, callback) => {
            
        if ( !data.escritorio ) {
            return callback({
                err: true, 
                mensaje: 'El escritorio es necesario'
            });
        }        
        let atenderTicket = ticketControl.atenderTicket( data.escritorio );
        callback( atenderTicket );

        client.broadcast.emit('actualizarPantalla', {
            ultimos4: ticketControl.getUltimos4()
        });
        //actualizar / notificar cambios en los ULTIMOS 4
    });
});