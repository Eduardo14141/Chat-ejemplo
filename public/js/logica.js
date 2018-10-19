const socket = require("socket.io");
function conectarChat(){
	let msg = $("#text");
	socket.emit("mensaje", msg.value);
}
function EnviarMensaje(event){
	
}