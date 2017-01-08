var express = require('express');
var google = require('google');
var _ = require('lodash');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  execute(req, res)
})

var execute = function (req, res) {
  var text = req.param('text');
  var message = {
  		response_type:"in_channel"
	};
  google(text, function (err, googleRes){
    if (err) {
      message.text = JSON.stringify(err);
    }
    else {
      message.text = "<" + googleRes.url + "|" + googleRes.query + ">";
      message.attachments = _.map(googleRes.links, function(link){
        return {
          color: "#36a64f",
          title: link.title,
          title_link: link.link,
          text: link.description
        }
      });
    }
  });
  res.json(message);
}

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
})
