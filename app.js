var express = require('express');
var google = require('google');
var _ = require('lodash');
var app = express();

app.get('/', function (req, res) {
  execute(req, res);
})

app.post('/', function (req, res) {
  execute(req, res);
})

var execute = function (req, res) {
  var query = req.param('text');
  var message = {
  		response_type:"in_channel"
	};
  google(query, function (err, googleRes) {
    console.log(err);
    console.log(googleRes);
    if (err) {
      message.text = JSON.stringify(err);
    }
    else {
      message.text = "<" + googleRes.url + "|" + googleRes.query + ">";
      message.attachments = _.map(googleRes.links.slice(0,5), function(link){
        return {
          color: "#36a64f",
          title: link.title,
          title_link: link.link,
          text: link.description
        }
      });
    }
    console.log("MESSAGE: " + JSON.stringify(message));
    res.json(message);
  });
}

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Our app listening on port 3000!');
})
