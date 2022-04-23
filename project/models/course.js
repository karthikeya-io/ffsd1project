const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        desc: {
            type: String,
            trim: true
        },
        category: {
            type: ObjectId,
            ref: "Category",
        },
        lessons: {
            type: Array,
            default: []
        },
        price: {
            type: Number,
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Course", courseSchema)
