const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/oi', function (req, res) {
  res.send('Olá, mundo!')
})

const item = ['Rick Sanchez', 'Morth Smith', 'Summer Smith']

app.get('/item', function (req, res){
  res.send(item)
})

app.listen(3000)