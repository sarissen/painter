const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const stringGen = require('./utils');

const port = 3000;

app.listen(port);

const members = {};

// Start the server at port 3000
function handler(req, res) {
  // Send HTML headers and message
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Websocket</h1>');
}

// Add a connect listener
io.on('connection', (socket) => {
  console.log('Connection to client established');

  // Success!  Now listen to messages to be received
  socket.on('message', (event) => {
    console.log('Received message from client!', event);
  });

  socket.on('disconnect', () => {
    console.log('Client has disconnected');
    socket.broadcast.emit('disconnected', members[socket.id]);
  });

  socket.on('new', (member) => {
    const identifier = stringGen(10);
    members[socket.id] = member;

    socket.join(identifier);
    console.log(`Created room ${identifier}`);
    socket.emit('identifier', identifier);
  });

  socket.on('join', (identifier, member) => {
    socket.join(identifier);
    members[socket.id] = member;
    console.log(`${member} joined room ${identifier}`);
    socket.broadcast.emit('joined', member);
  });

  socket.on('member', (member) => {
    console.log(`${member} is sending over member data`);
    socket.broadcast.emit('member', member);
  });

  socket.on('starting', () => {
    console.log('Starting a game');
    socket.broadcast.emit('starting');
  });

  socket.on('canvas', (canvas) => {
    console.log('Received a canvas');
    socket.broadcast.emit('canvas', canvas);
  });

  socket.on('word', (word) => {
    console.log('Received a word');
    socket.broadcast.emit('word', word);
  });

  socket.on('requestWord', () => {
    console.log('Received a word request');
    socket.broadcast.emit('requestWord');
  });
});

console.log(`Server running at http://127.0.0.1:${port}/`);
