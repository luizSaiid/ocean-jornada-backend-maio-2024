const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/oi', function (req, res) {
  res.send('Olá, mundo!')
})

const list = ['rick sanchez', 'morth smith', 'summer smith']

app.get('/item', function (req, res){
  res.send('Read All funcionando!')
})

app.listen(3000)