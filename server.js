const express = require('express');
const favicon = require('express-favicon');
const  {createProxyMiddleware}  = require('http-proxy-middleware');
const path = require('path');
const port = process.env.PORT || 3000;
const url = process.env.REACT_APP_API || 'http://localhost:8000'
const app = express();

app.use('/api', createProxyMiddleware({ target: url, changeOrigin: true }));

app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });

app.get('/#', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
console.log("start")
app.listen(port);