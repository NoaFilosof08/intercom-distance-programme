const express = require ('express')
const mongoose = require('mongoose')
const router = require('./config/router')
const app = express()
const port = 4000
const dbURI = 'mongodb://localhost/intercom'

mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Mongo has connected')
  })

app.use(express.json())

app.use(router)

app.listen(port, () => console.log('express is up and listening on port 4000'))
