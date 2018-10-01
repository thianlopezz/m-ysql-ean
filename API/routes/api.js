const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Yep');
});

router.get('/hola', (req, res) => {
  res.send({saludo:'Que tal? por get.'});
});

router.post('/hola', (req, res) => {
  res.send({saludo:'Que tal? por post.'});
});

router.put('/hola', (req, res) => {
  res.send({saludo:'Que tal? por put.'});
});

module.exports = router;
