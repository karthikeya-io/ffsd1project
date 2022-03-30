const User = require("../models/user")

exports.gethome = (req, res) => {
    res.render('studenthome', {id: req._id})
}

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
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
    res.render('studentProfile', {name: req.profile.name, mail: req.profile.email})
}