const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { required } = require('nodemon/lib/config');

const userSchema = new mongoose.Schema( {
    // name: {
    //     type: String,
    //     required: true,
    //     maxlength: 32,
    //     trim: true
    // },//name: String can also be written
    // lastname: {
    //     type: String,
    //     maxlength: 32,
    //     trim: true,
    // },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    student: {
        type: ObjectId,
        ref: "Student",
    },
    educator: {
        type: ObjectId,
        ref: "Educator",
    },
    // salt: String,
    role: {
        type: Number,
        default: 0
    },
    // courses: {
    //     type: Array,
    //     default: []
    // },
    // address: {
    //     type: String,
    //     maxlength: 100,
    //     trim: true,
    // },
    // phoneno: {
    //     type: Number,
    //     required:true
    // }

},
    {timestamps: true}
)

// userSchema.virtual("password")
//     .set(function(password) {
//         this._password = password;
//         this.salt = uuidv4();
//         this.encry_password = this.securePassword(password);
//     })
//     .get(function() {
//         return this._password
//     })

// userSchema.methods = {
//     autheticate: function(plainpassword) {
//             return this.securePassword(plainpassword) === this.encry_password
//     },

//     securePassword: function(plainpassword) {
//         if (!plainpassword) return "";
//         try {
//             return crypto
//                 .createHmac('sha256', this.salt)
//                 .update('plainpassword')
//                 .digest('hex');
//         } catch (err) {
//                 return "";
//         }
//     }
// }
module.exports = mongoose.model("User", userSchema)