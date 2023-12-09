// socket-functions.js

const Player = require('./classes/playerClass'); // Adjust the path based on your file structure

let players = {};

function initSocketFunctions(io){
    io.on("connection", (socket) => {
        console.log("User connected: " + socket.id);

        const newPlayer = new Player(socket.id, 'Default', null);
        players[socket.id] = newPlayer;
        console.log(players[socket.id])


        socket.on("chat message", (msg) => {
            console.log(msg);
            io.emit("chat message", msg); // Broadcast the message to all connected clients
        });

        socket.on("disconnect", () => {
            console.log('User Disconnected: ' + socket.id);
            delete players[socket.id];
        });



        socket.on('join lobby', (data) =>{
            const {lobbyCode} = data;
            console.log(`${socket.id} joined lobby ${lobbyCode}`);
            socket.emit('redirect to lobby', lobbyCode);
        })







    });

}

let lobbies = {};
function updateLobbyData(newLobbies) {
    lobbies = newLobbies;
}




module.exports = {
    initSocketFunctions,
    updateLobbyData,
};