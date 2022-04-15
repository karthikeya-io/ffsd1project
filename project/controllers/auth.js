const User = require("../models/user")
const Student = require("../models/student")
const Educator = require("../models/educator")
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
const student = require("../models/student");


exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const data =  req.body
    const role = data.role
    const user = new User()
    user.email = data.email
    user.password = data.password
    user.role = role

    if(role == 0) {
        const student = new Student()
        student.name = data.name
        student.lastname = data.lastname
        student.address = data.address
        student.phoneno = data.phoneno
        student.save((err) => {
            if(err) {
                console.log(err);
                return res.status(400).json( {
                    err: "NOT able to save user in DB"
                })
            }
        })
    
        user.student = student;
    } else if(role == 1) {
        const educator = new Educator(data)
        educator.save((err) => {
            if(err) {
                console.log(err);
                return res.status(400).json( {
                    err: "NOT able to save user in DB"
                })
            }
        })
        user.educator = educator
    }

    

    user.save((err, user) => {
        if(err) {
            console.log(err);
            return res.status(400).json( {
                err: "NOT able to save user in DB"
            }) 
        }
        return res.redirect('/login')
    })
}

exports.signin = (req, res) => {
    const {email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User email does not exits"
            })
        }

        if(password !== user.password ){
            // console.log(user.autheticate(password));
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        //create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});
        //send response to front end
        const {_id, name, email, role} = user;//destructuring
        if(user.role == 0)  {
            res.redirect('/api/user')
        } else {
            res.redirect('/api/educator')
        }
    })
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.redirect('/')
}

exports.isSignedIn = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.SECRET);
        req._id = user._id;
        next();
      } catch (err) {
        res.clearCookie("token");
        return res.redirect("/");
      }
}

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.profile._id.toString() == req._id;
    if(!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
}