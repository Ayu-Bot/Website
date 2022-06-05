const express = require('express');
const app = express();
const io = require('socket.io');
const server = require('http').createServer(app);
const socket = io(server);
const passport = require('passport');
require('dotenv').config();

app.set("views", "./src/Views")
app.set("view engine", "ejs")

require('./src/System/socket.io.js')({});
require('./src/System/auth/Auth.passport.js')(app);
require('./src/System/auth/Auth.passport.js')(app);
require("./src/Routes/index.js")(app);

server.listen(80)

module.exports = {app, passport};