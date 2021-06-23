// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// api request logger
app.use("/", (req, res, next) => {
  var logString = req.method + " " + req.path + " - " + req.ip;
  console.log(logString);
  next(); 
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// date request endpoint
app.get("/api/2015-12-25", (req, res) => {
  var date = new Date("2015-12-25");
  var utcDate = date.toString();
  var unixTimeStamp = Math.floor(date.getTime()/1000);
  res.json({
    unix: unixTimeStamp,
    utc: utcDate
  });
});



// listen for requests :)
var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
