const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  guid: {type: String, unique: true},
  url: String
})

module.exports = mongoose.model('Entry', schema)