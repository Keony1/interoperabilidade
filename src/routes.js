const express = require('express');
const path = require('path');
const WebmapController = require('./controllers/WebmapController');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

router.post('/', WebmapController.find);

module.exports = router;