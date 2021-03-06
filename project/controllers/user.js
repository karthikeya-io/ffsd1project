const User = require("../models/user")
const Course = require("../models/course")

exports.gethome = (req, res) => {
    Course.find({}, (err, courses) => {
        if(err) {
            console.log(err);
            return res.status(400).json( {
                err: "Something went wrong"
            }) 
        }
        console.log(courses);
        res.render('studenthome', {id: req._id, courses})
    })
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
        req.profile.password = undefined
        next()
    })
}

exports.updateUser = (req, res) => {
    const data = req.body
    User.findByIdAndUpdate(req._id)
                .populate('student')
                .populate('educator')
                .exec((err, user) => {
                    if(err || !user) {
                        console.log(err);
                        return res.status(400).json( {
                            err: "NOT able to save course in student"
                        }) 
                    }
                    if(user.role == 0) {
                        user.student.name = data.name
                        user.student.lastname = data.lastname
                        user.student.address = data.address
                        user.student.phoneno = data.phoneno
                        user.student.save()
                        res.redirect('/api/user')
                         user.save()
                    } else if(user.role == 1) {
                        user.educator.name = data.name
                        user.educator.lastname = data.lastname
                        user.educator.address = data.address
                        user.educator.phoneno = data.phoneno
                        user.educator.save()
                        res.redirect('/api/educator')
                        user.save()
                    }
                })
                
}
exports.getUser = (req, res) => {
    // req.profile.salt = undefined
    // console.log(req.profile);
    const id = req.profile._id
    let name = "abc"
    let role = 0
    if(req.profile.role == 0) {
        name = req.profile.student.name
        courses = req.profile.student.courses
        role = 0
    } else {
        name = req.profile.educator.name
        courses = req.profile.educator.courses
        role = 1
    }
    res.render('studentProfile', {name: name, mail: req.profile.email, courses, id, role})
}

exports.updateForm = (req, res) => {
    const id = req._id
    res.render('updateform', {id})
} 