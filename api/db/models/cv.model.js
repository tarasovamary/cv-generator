const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  name: {
    type: String,
    minlength: 1,
    trim: true,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

const CV = mongoose.model('CV', cvSchema);

module.exports = { CV };