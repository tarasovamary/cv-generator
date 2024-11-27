const mongoose = require('mongoose');
const { CV } = require('./cv.model');

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
    },
});

// Pre-hook for 'findOneAndDelete' to delete associated CVs
EmployeeSchema.pre('findOneAndDelete', async function(next) {
    try {
        const employee = await this.model.findOne(this.getFilter());
        if (employee) {
            await CV.deleteMany({ employeeId: employee._id });
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = { Employee };
