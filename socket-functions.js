// socket-functions.js

const Player = require('./classes/playerClass'); // Adjust the path based on your file structure
const Lobby = require('./classes/lobbyClass');
let players = {};
let lobbies = {};

function initSocketFunctions(io){
    io.on("connection", (socket) => {
        console.log("User connected: " + socket.id);

        socket.on("chat message", (msg) => {
            console.log(msg);
            io.emit("chat message", msg); // Broadcast the message to all connected clients
        });

        socket.on("disconnect", () => {
            console.log('\n');
            console.log('User Disconnected: ' + socket.id);


            console.log([socket.id]);
            console.log(players);
            if(players[socket.id]){

                x = lobbies[players[socket.id].lobby];
                for(let i=0; i < (x.users.length); i++){
                    if(x.users[i] == players[socket.id]){
                        x.removeUser(socket.id);
                    }

                }

            }

            console.log('\n');
            delete players[socket.id];
        });



        socket.on('create lobby', () =>{

            console.log("\n" + "CREATING LOBBY");
            const lobbyCode = generateLobbyCode();
            socket.emit('add lobby', lobbyCode);

            addLobby(lobbyCode, socket.id);
            console.log(lobbies[lobbyCode]);
            console.log("\n PLAYER:::::::::");
            console.log(players);

            console.log(`${socket.id} joined lobby ${lobbyCode}`);
            console.log("\n");
            socket.emit('redirect to lobby', { lobbyCode, socketId: socket.id });
        });


        socket.on('join lobby', (data) =>{

            const code = data && data.lobbyCode;

            console.log("\n");
            console.log(lobbies[code]);
            console.log("\n");

            if(lobbies[code]){
                const newPlayer = new Player(socket.id, 'Default', code);
                players[socket.id] = newPlayer;
                lobbies[code].addUser(newPlayer);
                console.log(lobbies[code]);

                lobbyCode = code;
                socket.emit('redirect to lobby', { lobbyCode, socketId: socket.id });
                console.log("\n");

            } else {
                console.log('Invalid Lobby Code');
                console.log("\n");

            }
        });

    });

}


function generateLobbyCode() {
    return Math.floor(Math.random() * 8999+1000).toString();
}

function addLobby(code, id){
    //Create Lobby, add to array 
    const newLobby = new Lobby(code);
    lobbies[code] = newLobby;

    //Create Player, add to array
    const newPlayer = new Player(id, 'Default', code);
    players[id] = newPlayer;

    //Add player to lobby
    lobbies[code].addUser(newPlayer);


}


module.exports = {
    initSocketFunctions
};