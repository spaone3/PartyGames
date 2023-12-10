const express = require('express');
const router = express.Router();

// Keep track of created lobbies


router.get('/create', (req, res) => {

    // Redirect the user to the new lobby
  res.redirect(`/lobby/${lobbyCode}`);
  console.log('/create');
});


router.get('/:code', (req, res) => {
  const lobby = req.params.code;
  const curSocket = req.query.socketId;
  console.log("lobby/code stage");


  if (!lobby) {
    // Handle invalid or non-existent lobby codes
    res.status(404).send('Lobby not found');
    return;
  }
  // Render the lobby page with the lobby data
  res.render('lobby', { lobby, curSocket });
});


module.exports = router;
