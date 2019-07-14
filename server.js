//ESSENTIALS
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

//IMPORT MODELS
const OnlineUser = require('./model/OnlineUser');

//IMPORT APIs
const UserRouter = require('./api/UserApi');
const MessageRouter = require('./api/MessageApi');
const OnlineUserRouter = require('./api/OnlineUserApi');

//GLOBAL VARS
const app = express();
const PORT = 8000;

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

//CONNECTING DATABASE
mongoose.connect('mongodb://root:H4rdik@ds042698.mlab.com:42698/h4rdik_chat',{ useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
	console.log("DATABASE CONNECTION ESTABLISHED");
});

//ROUTE CONFIG
app.use('/user', UserRouter.routes());
app.use('/message', MessageRouter.routes());
app.use('/online_user', OnlineUserRouter.routes());

//SETTING UP SOCKET
const allowedOrigins = "*:*";
const server = http.createServer(app);
const io = socketIO(server, {origins: allowedOrigins});
io.on("connection", socket => {
	console.log("USER CONNECTED!");
	socket.on("user_connected", (data) => {
		const user = new OnlineUser(data);
		
		OnlineUser.findOne({sender_id:data.sender_id}, (err, u) =>{
			if(u == null){
				user.save();
			}
		});
		io.sockets.emit("update_online_users");
	});
	socket.on("disconnect_user", data => {
		OnlineUser.findOneAndRemove({sender_id:data.sender_id}, (err,data) =>{});
	});
	socket.on("send_message", (data) => {
		data["timestamp"] = Date.now();
		console.log(data);
		io.sockets.emit("receive_message", data);
	})
});

//SERVER SOCKET
server.listen(process.env.PORT || PORT,() => {
	console.log('SERVER STARTED AT : ' + PORT);
});