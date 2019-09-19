const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

//middlewares
server.use(bodyParser.json());
// server.use(cors);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(routes);
server.use(express.static(__dirname + '/../public'));


server.listen(3333);