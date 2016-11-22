'use strict'

// Dependencies
const mongoose = require('mongoose')

// Define model schema
const schema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  plan: {
    name: { type: String, default: 'Free' },
    maxInstances: { type: Number, default: 5 }
  },
  active: { type: Boolean, default: false },
  created: { type: Date },
  updated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', schema)
