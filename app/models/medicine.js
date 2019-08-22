const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  dotor: {
    type: String,
    required: true
  },
  prescribed: {
    type: Date,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Medicine', medicineSchema)
