var express = require('express'),
  path = require('path'),
  fs = require('fs');

var app = express();
var staticRoot = __dirname + '/';
app.set('port', (process.env.PORT || 3000));
app.use(express.static(staticRoot));

app.get('/get_airports', function (req, res) {
  res.sendFile(staticRoot + '/src/app/airports.json');
})

app.listen(app.get('port'), function() {
  console.log('app running on port', app.get('port'));
});
