var fs =require('fs');
var _static = require('node-static');
var https = require('https');

var file = new _static.Server('./', {
    cache: 3600,
    gzip: true,
    indexFile: "index.html"
});

var options = {
  key: fs.readFileSync('sslcert/server.key'),
  cert: fs.readFileSync('sslcert/server.crt'),
  ca: fs.readFileSync('sslcert/ca.crt'),
  requestCert: true,
  rejectUnauthorized: false
};

var app = https.createServer(options, function(request, response){
        request.addListener('end', function () {
        file.serve(request, response);
    }).resume();     
});

app.listen(8084);

