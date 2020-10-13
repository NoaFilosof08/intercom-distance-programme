const mongoose = require('mongoose')
const dbURI = 'mongodb://localhost/intercom'
const UserData = require('../models/userData')
const Data = require('./data/userData')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  async (err, db) => {
    if (err) {
      console.log(err)
      return
    }

    try {
      // await db.dropDatabase()
      console.log('database dropped 👍🏼')
      const users = await UserData.create(Data)
      console.log(`${'👩🏻‍💻'.repeat(users.length)} Users Created`)
      await mongoose.connection.close()
      console.log('byeee 👋')
    } catch (err) {
      await mongoose.connection.close()
      console.log(err)
      return
    }
  })
