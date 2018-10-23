const socket = io.connect('192.168.20.162:8080');
var lista = document.querySelector('#lista-users');
var username = window.location.pathname.replace('/chat/', '');
let clientes = [];
let scroll = 0;
function scroll_to(div){
	if(div.scrollTop<(div.scrollHeight - div.clientHeight)){
		div.scrollHeight - div.clientHeight;
		div.scrollTop += 1000; //se mueve hacia abajo
	}
}

function conectarChat(){
	let id = socket.id;
	console.log("id:", id, "username:", username);
	$.post('/login', {username: username, id:id}, (data)=>{
		console.log(data);
		clientes= data;
		list.innerHTML += "Cargando...";
		let html = '';
		clientes.forEach((cliente)=>{
			html += "<li>"+cliente.username+"</li>"
		});
		list,innerHTML= html;
		$(".loader").fadeOut();
	});
}
function EnviarMensaje(e){
	if(e.which !== 13) return;
	let msg = document.querySelector("#text");
	if(msg.lenght<1)return;
	$.post("/send", {mensaje: msg, username: username, id: socket.id}, (data)=>{
		document.querySelector("#input").value;
	});
}
function joinChat(){
	const username = document.querySelector('#username').value;
	if (username.lenght == 0) {
		alert('El usuario es requerido');
	} else {
		window.location('/chat//'+ username);
	}
}

socket.on('mensaje', function(data){
	data.username = data.username.replace('</','');
	var sanitized = data.msg.replace('</','');
	sanitized = sanitized.replace('>','');
	sanitized = sanitized.replace('<','');
	if(data.id == socket.id){
		let msg = ` <div class='local-message'> <strong>${data.username}</strong>
		<p>${sanitized}</p></div>`;
		document.querySelector(".msg-container").innerHTML += msg;
	}else{
		let msg = ` <div class='local-message'> <strong>${data.username}</strong>
		<p>${sanitized}</p></div>`;
		document.querySelector(".msg-container").innerHTML += msg;
	}
	document.querySelector("#msg-container").scrollIntoView(false);
})