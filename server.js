const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

const socketFunctions = require('./socket-functions');
socketFunctions.initSocketFunctions(io);



app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


const homeRouter = require('./routes/home');
const lobbyRouter = require('./routes/lobby')

app.use('/', homeRouter);
app.use('/lobby', lobbyRouter);



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
