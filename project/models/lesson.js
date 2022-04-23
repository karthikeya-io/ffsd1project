const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        moduleno: {
            type: Number,
            required: true,
        },
        modulename: {
            type: String,
            required: true,
            trim: true,
        },
        desc: {
            type: String,
            trim: true
        },
        filePath: {
            type: String,
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Lesson", lessonSchema)
