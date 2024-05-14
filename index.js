const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/oi', function (req, res) {
  res.send('Olá, mundo!')
})

const itens = ['Rick Sanchez', 'Morth Smith', 'Summer Smith']

app.get('/item', function (req, res){
  res.send(itens)
})

app.get('/item/:id', function(req, res){

  const id = req.params.id

  const item = itens[id - 1]

  res.send(item)
})

app.use(express.json())

app.post('/item', function(req, res){

  const body = req.body

  const novoItem = body.nome

  itens.push(novoItem)

  res.send('Item adicionado com sucesso: ' + novoItem)
})

app.listen(3000)