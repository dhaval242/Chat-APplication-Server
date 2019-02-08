let express = require('express')
let app = express();
let cors = require('cors')

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);
io.set('origins', '*:*');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
      console.log(message);
      io.emit('new-message',message);
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
