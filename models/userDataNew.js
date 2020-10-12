const mongoose = require('mongoose')

const userDataNewSchema = new mongoose.Schema({
  user_id: { type: Number },
  name: { type: String },
  distance: { type: String }
})

module.exports = mongoose.model('userData', userDataNewSchema)
