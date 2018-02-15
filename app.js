const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose').connect('mongodb://admin:admin@shop-shard-00-00-2pwxc.mongodb.net:27017,shop-shard-00-01-2pwxc.mongodb.net:27017,shop-shard-00-02-2pwxc.mongodb.net:27017/contactdemo?ssl=true&replicaSet=shop-shard-0&authSource=admin')
const app = express()

const Contact = require('./model/Contact')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  var a = 1
  var b = 2
  console.log('dipangggil nih')
  res.json({
    nama: 'capung',
    a: a,
    b: b,
    hasil: a+b,
    tel: [08226262627272, 81293717931293817, 12371927319]
  })
})

//panggil READ
app.get('/api/', (req, res) => {
  Contact.find()
  .then(data => {
    var result = []
    for(var i = 0; i < data.length; i++) {
      result[i] = {
        nama: data[i].nama,
        umur: data[i].umur,
        telp: data[i].telp
      }
    }
    res.send({
      msg: 'success',
      data: result
    })
  })
  .catch(err => {
    res.status(500).send({
      msg: 'gagal ambil data',
      err: err
    })
  })
})

//kirim CREATE
app.post('/api/', (req, res) => {
  console.log('ini req.body----------', req.body)
  let newContact = new Contact({
    nama: req.body.nama,
    umur: req.body.umur,
    telp: req.body.telp
  })
  newContact.save()
  .then(data => {
    res.send({
      msg: 'success',
      data: data
    })
  })
  .catch(err => {
    res.status(500).send({
      msg: 'gagal insert data',
      err: err
    })
  })
})

//edit UPDATE
app.put('/api/:id', (req, res) => {
  Contact.update({ _id: req.params.id }, {
    nama: req.body.nama,
    umur: req.body.umur,
    telp: req.body.telp
  })
  .then(data => {
    res.send({
      msg: 'di put',
      data: data
    })
  })
  .catch(err => {
    res.status(500).send({
      msg: 'tidak dapat mengambil data',
      err: err
    })
  })
})

//remove DELETE
app.delete('/api/:id', (req, res) => {
  Contact.remove({ _id: req.params.id })
  .then(data => {
    res.send({
      msg: 'sukses',
      data: data
    })
  })
  .catch(err => {
    res.status(500).send({
      msg: 'gagal delete',
      err: err
    })
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
