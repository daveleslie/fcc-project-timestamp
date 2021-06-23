// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
app.get("/api/:word/echo", function echo(req, res) {
  res.json({echo: req.params.word});
});

// date request endpoint
// app.get("/api/2015-12-25", (req, res) => {
//   let date = new Date("2015-12-25");
//   let utcDate = date.toString();
//   let unixTimeStamp = Math.floor(date.getTime()/1000);
//   res.json({
//     unix: unixTimeStamp,
//     utc: utcDate
//   });
// });

// date request endpoint with params
app.get("/api/:date?", (req, res) => {
  res.json(returnDate(req.params.date));
});

const returnDate = function(dateString) {
  let date;
  if (!dateString) {
    date = new Date();
  } else {
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }
  if (date.toString() === 'Invalid Date') {
    return {
      error: date.toString()
    };
  } else {
    return {
      unix: date.getTime(),
      utc: date.toUTCString()
    };
  }
};

// date request form handler
app.route('/api/date')
  .post((req,res) => {
    let {dateString: dateString} = req.body;
    res.json(returnDate(dateString));
  //   let date;
  //   if (!dateString) {
  //     date = new Date();
  //   } else {
  //     if (!isNaN(dateString)) {
  //       date = new Date(parseInt(dateString));
  //     } else {
  //       date = new Date(dateString);
  //     }
  //   }
  //   if (date.toString() === 'Invalid Date') {
  //     res.json({
  //       error: date.toString()
  //     });
  //   } else {
  //     res.json({
  //       unix: date.getTime(),
  //       utc: date.toUTCString()
  //     });
  //   }
  //   // let utcDate = date.toString();
  //   // let unixTimeStamp = Math.floor(date.getTime()/1000);
  });

// listen for requests :)
var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
