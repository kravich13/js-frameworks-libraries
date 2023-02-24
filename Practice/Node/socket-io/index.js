const app = require('express')();
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);

    console.log('new message:', msg);
  });
});

server.listen(port, undefined, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
