/**
 * @module models/container-event.models.js
 */

// Dependencies
const mongoose = require('mongoose')

// Define model schema
const schema = mongoose.Schema({
  container: { type: String, required: true },
  username: { type: String },
  event: { type: String },
  created: { type: Date },
  updated: { type: Date, default: Date.now },
  meta: { type: mongoose.Schema.Types.Mixed, default: {} }
})

schema.statics.EVENT_TYPE = {
  CREATE: 'create',
  START: 'start',
  STOP: 'stop',
  REMOVE: 'remove'
}

module.exports = mongoose.model('ContainerEvent', schema)
