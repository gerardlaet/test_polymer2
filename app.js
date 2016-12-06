var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var expressWs = require('express-ws')(app);

const port = 3000;

app.use(express.static('public'));
app.use(express.static('files'));

app.post('/show/:id/:evt', function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('start '+req.params.id+' appel from '+ip);

  console.log("P:/evt/"+req.params.evt+".evt");
  fs.writeFile("P:/evt/"+req.params.evt+".evt", req.params.id, function(err) {
      if(err) {
          return console.log(err);
      }
  });
  res.send('Hello World!');
})

app.post('/stop/:id/:evt', function (req, res, next) {
  console.log('stop '+req.params.id);
  console.log("P:/evt/"+req.params.evt+".evt");
  fs.writeFile("P:/evt/"+req.params.evt+".evt", req.params.id, function(err) {
      if(err) {
          return console.log(err);
      }
  });
  res.send('Hello World!');
})
app.post('/web/:id/:evt', function (req, res, next) {
  console.log('web '+req.params.id);

  console.log("P:/evt/"+req.params.evt+".evt");
  fs.writeFile("P:/evt/"+req.params.evt+".evt", req.params.id, function(err) {
      if(err) {
          return console.log(err);
      }
  });
  res.send('Hello World!');
})

// app.use('/*.html', function (req, res, next) {
//   console.log('Time:', Date.now())
//   next()
// })

app.use('/', express.static(__dirname));

var clients = [];

app.ws('/', function(ws, req) {
  clients.push(ws);
  ws.on('message', function(msg) {
    broadcast(msg);
    console.log("Receive message", msg);
  });

  console.log('someoneConnected');
  ws.send("You are connected");

  function broadcast(msg) {
    console.log(clients);
    clients.forEach(function(client) {
        client.send(msg);
      });
  }

});

app.listen(port, function() { console.log('listening') });
