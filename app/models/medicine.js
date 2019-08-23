const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  doctor: {
    type: String,
    required: true
  },
  prescribed: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    requried: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Medicine', medicineSchema)
