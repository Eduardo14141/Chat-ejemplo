const express = require("express");
const body_parser = require("body-parser");
const socket = require("socket.io");
const PORT = proccess.env.PORT || 8080;

const app = express();
const io= socket(server);

const server = app.lister(PORT, ()=>{
	console.log("escuhando en el puerto " + PORT);
});
app.use(express.static("./public"));

io.on("connetion", (socket)=>{
	console.log("Se ha realizado una nueva conexión con: " + socket.id);
	socket.on("chat", (data)=>{
		io.sockets.emit('chat', data);
	});
});
let clientes = [];