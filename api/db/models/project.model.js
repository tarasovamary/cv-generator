const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        trim: true,
        unique: true,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: false,
      },
      teamSize: {
        type: Number,
        min: 1,
        required: true,
      },
      techStack: {
        type: [String],
        required: true,
      },
      roles: {
        type: [String],
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      responsibilities: {
        type: String,
        required: false,
      },
})

const Project = mongoose.model('Project', ProjectSchema);

module.exports = { Project };