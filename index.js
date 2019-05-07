var app=require('express')();
var server=require('http').Server(app);
var io=require('socket.io')(server);

server.listen('4000');

app.get('/',function (request,response) {
    response.sendFile(__dirname + "/index.html");
});

io.on('connection',function (socket) {
    console.log('new user');
    socket.on('newMessage',function (data,room) {
       // console.log('newMessage' + data);
        socket.to(room).emit('clientMessage',data);

    });
    socket.on('leaveRoom',function (data) {
        console.log('user leave ' + data);
        socket.leave(data);

    });
    socket.on('joinRoom',function (data) {
        //console.log('user join ' + data);
        socket.join(data);

    });

});
