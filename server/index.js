const path = require('path');
const express = require("express");
const socketio = require('socket.io');
const http = require('http')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const db = process.env.DB_URI || require('./config/keys').mongoURI;
const users = require("./routes/api/users");

const app = express();
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3000;

const root = __dirname + '/../client/dist';


io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('join', ({name, room}, callback) => {
		console.log("name",name)
		console.log("room", room)
		addUser({ id: socket.id, name, room });

		// if (error) return callback(error);

		console.log('added a user');
		socket.join(room);

		// socket.emit('message', { user: 'admin', text: `${name}, welcome to room ${room}.` });
		// socket.broadcast.to(room).emit('message', { user: 'admin', text: `${name} has joined!` });

		io.to(room).emit('roomData', { room: room, users: getUsersInRoom(room) });

		callback();
	})


	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);

		if (user && user.room) {
			io.to(user.room).emit('message', { user: user.name, text: message });
			callback();
		}
	});

	socket.on('unsubscribe', () => {
		console.log('disconnecting', socket.id);
		const user = removeUser(socket.id);

		console.log('user: ', user);
		if (user) {
			console.log('disconnected', socket.id);
			// io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
			io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
		}
	})

});



app.use(express.static(root));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


mongoose
	.connect(db, { useNewUrlParser: true, auto_reconnect: true })
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	})
} else {
	app.get("/", (req, res) => res.send("Hello World!!"));
}

app.use(passport.initialize());
require('./config/passport')(passport);


app.use("/api/users", users);

server.listen(port, function () {
	console.log('Listening on port', port);
});