const express = require('express');
const path = require('path');
const http = require('http');
const process = require('process');
const bodyParser = require('body-parser');

const connection = require('./connection');
const api = require('./routes/api');

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
} 

const app = express();

if (process.env.PORT) { app.use(forceSSL()); } 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/priv', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || '7001';
app.set('port', port);

const server = http.createServer(app);

connection.init();

server.listen(port, () => console.log(`Magic Happens on port:${port}`));
