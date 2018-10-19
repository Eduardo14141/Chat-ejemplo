const express = require("express");
const body_parser = require("body-parser");
const socket = require("socket.io");
const PORT = 8080;

const app = express();
app.use(express.static("./public"));
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

const server = app.listen(PORT, ()=>{
	console.log("escuhando en el puerto " + PORT);
});

const io= socket(server);
let clientes = [];

app.get("/",function(req, res){ res.sendFile(__dirname + "/public/index.html");});
app.get("/chat/:username", (req, res)=>{ res.sendFile(__dirname + "/public/chat.html")});
app.post("/login", (req, res)=>{
	let id = body.req.id;
	let username = body.req.username;
	clientes.push({id: id, username:username});
	io.emit("socket connected ", {id: id, username:username});
	return res.json(clientes);
});
app.post("/send", (req, res)=>{
	let id = body.req.id;
	let username = body.req.username;
	let msg = body.req.text;
	socket.emit("mensaje", {id:id, username: username, msg: msg});
	return res.json({text: "Mensaje enviado"});
});

io.on("connection", (socket)=>{
	console.log("Se ha realizado una nueva conexión con: " + socket.id);
	socket.on("disconnect", ()=>{
		clientes = clientes.filter(cliente =>
			cliente.id != socket.id;
		);
		io.emit("socket desconectado", {text: "El socket se desconectó", id: socket.id});
	});
	/*socket.on("typing", ()=>{
		socket.emit("")
	})*/
});