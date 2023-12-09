const express = require('express');
const router = express.Router();

// Keep track of created lobbies
const lobbies = {};


router.get('/create', (req, res) => {
    const lobbyCode = generateLobbyCode();
    console.log("test");
    lobbies[lobbyCode] = {
    code: lobbyCode,
    users: [] // You can store additional lobby-related data here
  };

  // Redirect the user to the new lobby
  res.redirect(`/lobby/${lobbyCode}`);
});


router.get('/:code', (req, res) => {
  const lobbyCode = req.params.code;
  console.log(lobbyCode);
  const lobby = lobbies[lobbyCode];
  console.log("testing");

  if (!lobby) {
    // Handle invalid or non-existent lobby codes
    res.status(404).send('Lobby not found');
    return;
  }
  // Render the lobby page with the lobby data
  res.render('lobby', { lobby });
});

// Function to generate a random lobby code (replace with your logic)
function generateLobbyCode() {
    return Math.floor(Math.random() * 8999+1000).toString();
}

module.exports = router;
