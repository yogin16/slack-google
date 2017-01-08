var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  res.send({
    "text": "Hello World!",
    "attachments": [
        {
            "text":"Example attachments"
        }
    ]
})
})

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Example app listening on port 3000!')
})