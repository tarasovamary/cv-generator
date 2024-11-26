const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        trim: true
    },
    department: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = { Employee };
