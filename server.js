const publicIp = require('public-ip');
const express = require('express');
const favicon = require('express-favicon');
const  {createProxyMiddleware}  = require('http-proxy-middleware');
const path = require('path');
const app = express();


(async () => {

  // ========================================================= 如果参数 -public 则使用公网IP
  // 根据情况获取url和port
  let url, port

  // 接受参数
  var arguments = process.argv.splice(2);
 
  if(arguments && arguments.length > 0 && arguments[0] === '-public') {
    // 获取公网ip
    const publicIP = await publicIp.v4()
    url = "http://" + publicIP + ":8000"
    console.log("访问采用公网IP：",url);
  } else {
    url = process.env.REACT_APP_API || 'http://localhost:8000'
    console.log("访问采用局域网IP：",url);
  }
  
  port = process.env.PORT || 3000;
  //////////////////////////
  // print process.argv
  // process.argv.forEach(function (val, index, array) {
  //   console.log(index + ': ' + val);
  // });
  // =========================================================



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


})();





