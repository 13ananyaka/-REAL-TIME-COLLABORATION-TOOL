const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('client'));

let sharedText = "";

io.on('connection', (socket) => {
  console.log('User connected');

  // Send current text to new user
  socket.emit('textUpdate', sharedText);

  socket.on('textChange', (data) => {
    sharedText = data;
    socket.broadcast.emit('textUpdate', data); // send to all except sender
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
