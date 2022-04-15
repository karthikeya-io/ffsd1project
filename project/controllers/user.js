const User = require("../models/user")

exports.gethome = (req, res) => {
    res.render('studenthome', {id: req._id})
}

exports.getthome = (req, res) => {
    res.render('instructorhome', {id: req._id})
}

exports.getUserById = (req, res, next, id) => {
    User.findById(id)
        .populate('student')
        .populate('educator')
        .exec((err, user) => {
            if(err || !user) {
                return res.status(400).json({
                    error: "No user was found in DB"
                })
        }
        req.profile = user
        next()
    })
}

exports.getUser = (req, res) => {
    // req.profile.salt = undefined
    req.profile.password = undefined
    console.log(req.profile);
    let name = "abc"
    if(req.profile.role == 0) {
        name = req.profile.student.name
    } else {
        name = req.profile.educator.name
    }
    res.render('studentProfile', {name: name, mail: req.profile.email})
}