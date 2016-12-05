var express = require('express');
var app = express();

var fs = require('fs');

app.use(express.static('public'));
app.use(express.static('files'));

app.post('/show/:id', function (req, res, next) {
  console.log(req.params.id);
  /*fs.writeFile("X:/evt1.evt", req.params.id, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });*/
  res.send('Hello World!');
})
/*
app.use('/*.html', function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
*/
app.use('/', express.static(__dirname));
app.listen(3000, function() { console.log('listening') });
