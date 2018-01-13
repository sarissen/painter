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
    if (members.hasOwnProperty(socket.id)) {
      socket.broadcast.to(members[socket.id].room).emit('disconnected', members[socket.id].member);
    }
    delete members[socket.id];
  });

  socket.on('new', (member) => {
    const identifier = stringGen(10);
    members[socket.id] = { member, room: identifier };

    socket.join(identifier);
    console.log(`Created room ${identifier}`);
    socket.emit('identifier', identifier);
  });

  socket.on('join', (identifier, member) => {
    socket.join(identifier);
    members[socket.id] = { member, room: identifier };
    console.log(`${member} joined room ${identifier}`);
    socket.broadcast.to(identifier).emit('joined', member);
  });

  socket.on('member', (member) => {
    console.log(`${member} is sending over member data`);
    if (members.hasOwnProperty(socket.id)) {
      socket.broadcast.to(members[socket.id].room).emit('member', member);
    }
  });

  socket.on('starting', () => {
    console.log('Starting a game');
    if (members.hasOwnProperty(socket.id)) {
      socket.broadcast.to(members[socket.id].room).emit('starting');
    }
  });

  socket.on('canvas', (canvas) => {
    console.log('Received a canvas');
    if (members.hasOwnProperty(socket.id)) {
      socket.broadcast.to(members[socket.id].room).emit('canvas', canvas);
    }
  });

  socket.on('word', (word) => {
    console.log('Received a word');
    if (members.hasOwnProperty(socket.id)) {
      socket.broadcast.to(members[socket.id].room).emit('word', word);
    }
  });

  socket.on('requestWord', () => {
    console.log('Received a word request');
    if (members.hasOwnProperty(socket.id)) {
      socket.broadcast.to(members[socket.id].room).emit('requestWord');
    }
  });

  socket.on('done', (count) => {
    console.log('Received a done');
    if (members.hasOwnProperty(socket.id)) {
      io.in(members[socket.id].room).emit('done', count, members[socket.id].member);
    }
  });

  socket.on('rejoin', (member, identifier) => {
    if (!members.hasOwnProperty(socket.id)) {
      console.log('Attempting rejoin');
      socket.join(identifier);
      members[socket.id] = { member, room: identifier };
    }
  });
});

console.log(`Server running at http://127.0.0.1:${port}/`);
