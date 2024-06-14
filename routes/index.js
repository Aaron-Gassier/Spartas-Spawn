const express = require('express');
const router = express.Router();
const path = require('path');

// Route for the main page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route for the game page
router.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/game.html'));
});

module.exports = router;
