const express = require('express')
const { MongoClient } = require('mongodb')

const dbUrl = 'mongodb+srv://luizsaiid:yPNoCm2WC3FqKWSr@cluster0.nwioz1e.mongodb.net'
const dbName = 'ocean-jornada-backend-maio-2024'
const client = new MongoClient(dbUrl)

async function main() {
  console.log('Conectando banco de dados... ')
  await client.connect()
  console.log('Banco de dados conectado com sucesso!')


  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.get('/oi', function (req, res) {
    res.send('Olá, mundo!')
  })

  const itens = ['Rick Sanchez', 'Morth Smith', 'Summer Smith']

  app.get('/item', function (req, res) {
    res.send(itens.filter(Boolean))
  })

  app.get('/item/:id', function (req, res) {

    const id = req.params.id

    const item = itens[id - 1]

    res.send(item)
  })

  app.use(express.json())

  app.post('/item', function (req, res) {

    const body = req.body

    const novoItem = body.nome

    itens.push(novoItem)

    res.send('Item adicionado com sucesso: ' + novoItem)
  })

  app.put('/item/:id', function (req, res) {

    const id = req.params.id

    const body = req.body

    const atualizarItem = body.nome

    itens[id - 1] = atualizarItem
    res.send('Item atualizado com sucesso: ' + id + ', ' + atualizarItem)
  })

  app.delete('/item/:id', function (req, res) {

    const id = req.params.id

    delete itens[id - 1]

    res.send('Item removido com sucesso: ' + id)
  })

  app.listen(3000)
}

main()