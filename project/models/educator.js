const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const educatorSchema = new mongoose.Schema( {
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
    },
    institute: {
        type: ObjectId,
        ref: "Institute",
    },

},
    {timestamps: true}
)

module.exports = mongoose.model("Educator", educatorSchema)
