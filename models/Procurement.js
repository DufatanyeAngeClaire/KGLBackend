const mongoose = require('mongoose');

const procurementSchema = new mongoose.Schema({
  produceName: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9 ]+$/
  },
  produceType: {
    type: String,
    required: true,
    minlength: 2,
    match: /^[A-Za-z]+$/
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  tonnage: {
    type: Number,
    required: true,
    min: 100
  },
  cost: {
    type: Number,
    required: true,
    min: 10000
  },
  dealerName: {
    type: String,
    required: true,
    minlength: 2
  },
  branch: {
    type: String,
    enum: ['Maganjo', 'Matugga'],
    required: true
  },
  contact: {
    type: String,
    required: true,
    match: /^\+?[0-9]{10,15}$/
  },
  sellingPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Procurement', procurementSchema);