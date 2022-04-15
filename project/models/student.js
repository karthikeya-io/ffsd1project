const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },//name: String can also be written
    lastname: {
        type: String,
        maxlength: 32,
        trim: true,
    },
    courses: {
        type: Array,
        default: []
    },
    address: {
        type: String,
        maxlength: 100,
        trim: true,
    },
    phoneno: {
        type: Number,
        required:true
    }

},
    {timestamps: true}
)

module.exports = mongoose.model("Student", studentSchema)
