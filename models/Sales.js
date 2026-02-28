const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  saleType: {
    type: String,
    enum: ['Cash', 'Credit'],
    required: true
  },

  produceName: { type: String, required: true },
  produceType: { type: String },
  tonnage: { type: Number, required: true, min: 100 },

  buyerName: { type: String, required: true, minlength: 2 },

  // CASH
  amountPaid: {
    type: Number,
    min: 10000
  },
  date: Date,
  time: String,

  // CREDIT
  nationalId: {
    type: String,
    match: /^[A-Z0-9]{14}$/
  },
  location: String,
  contact: {
    type: String,
    match: /^\+?[0-9]{10,15}$/
  },
  amountDue: {
    type: Number,
    min: 10000
  },
  dueDate: Date,
  dispatchDate: Date,

  salesAgentName: {
    type: String,
    required: true,
    minlength: 2
  }

}, { timestamps: true });

module.exports = mongoose.model('Sales', salesSchema);