const mongoose = require('mongoose')

const userDataScema = new mongoose.Schema({
  user_id: { type: Number },
  latitude: { type: Number },
  name: { type: String },
  longitude: { type: Number }
})

module.exports = mongoose.model('userData', userDataScema)
