const User = require("../models/user")
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
const { json } = require("express/lib/response");


exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const user = new User()
    const data =  req.body
    user.name = data.name
    user.lastname = data.lastname
    user.email = data.email
    user.password = data.password

    user.save((err, user) => {
        if(err) {
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
        res.redirect('/api/user')
    })
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
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
    console.log(req.profile._id.toString());
    console.log(req._id);
    if(!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
}