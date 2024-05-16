require('dotenv').config()
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const dbUrl = process.env.DATABASE_URL
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

  const db = client.db(dbName)
  const collection = db.collection('item')


  // ENDPOINT DO READ ALL [GET] /item
  app.get('/item', async function (req, res) {
    const documentos = await collection.find().toArray()
    res.send(documentos)
  })

  // ENDPOINT DO READ BY ID [GET] /item/:id
  app.get('/item/:id', async function (req, res) {

    const id = req.params.id

   const item = await collection.findOne({ _id: new ObjectId(id) })

    res.send(item)
  })

  app.use(express.json())

  // ENDPOINT [POST] /item
  app.post('/item', function (req, res) {

    const body = req.body

    const novoItem = body.nome

    collection.insertOne({ nome: novoItem })

    res.send('Item adicionado com sucesso: ' + novoItem)
  })

  // ENDPOINT [PUT] /item/:id
  app.put('/item/:id', async function (req, res) {

    const id = req.params.id

    const body = req.body

    const atualizarItem = body.nome

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { nome: atualizarItem } }
    )

    itens[id - 1] = atualizarItem
    res.send('Item atualizado com sucesso: ' + id + ', ' + atualizarItem)
  })

  // ENDPOINT [DELETE] /item/:id
  app.delete('/item/:id', async function (req, res) {

    const id = req.params.id

    await collection.deleteOne({ _id: new ObjectId(id) })

    res.send('Item removido com sucesso: ' + id)
  })

  app.listen(3000)
}

main()