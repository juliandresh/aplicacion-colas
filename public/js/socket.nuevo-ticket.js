


// Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});


socket.on('estadoActual', function(resp){
    console.log("Estado actual enviado por server", resp);
    label.text(resp.actual);
});

$('button').on('click', function() {
    //No envío nada pero el callback me dara la respuesta que el server envíe
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.text(siguienteTicket);
    })
});