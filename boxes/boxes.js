var express = require('express');
var io      = require('socket.io');

var app = express.createServer();
var server = io.listen(app);

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.staticProvider(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('boxes');
});

server.on('connection', function(client) {
  client.on('message', function (msg){
	server.broadcast(msg);
  });
  client.on('disconnect', function(client){});
});

app.listen(5000);