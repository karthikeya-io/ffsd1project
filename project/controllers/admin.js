const Category = require("../models/category")
const User = require("../models/user")
const Educator = require("../models/educator")
const Student = require("../models/student")


exports.adminHome = (req, res) => {
    res.render('admin')
}

exports.Category = (req, res) => {
    res.render('addcategory')
}

exports.searchResults = (req, res) => {
    const data = req.body
    const regex = new RegExp(data.searchquery, 'i') 
    User.find({email: {$regex: regex}}, (err, users) => {
        if(err) {
            console.log(err);
        }
        console.log(users);
        return res.render('adminresults', { users })
    })
}

exports.blockUser = (req, res) => {
    User.findByIdAndUpdate(req.profile._id)
        .exec((err, user) => {
            if(err || !user) {
                console.log(err);
                return res.status(400).json( {
                    err: "NOT able to updata user in DB"
                }) 
            }
            if(user.flag === 0) {
                user.flag = 1
            } else {
                user.flag = 0
            }
            user.save()
        })

        res.redirect('/admin')
}

exports.deleteUser = (req, res) => {
    User.findById(req.profile._id)
        .exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        if(user.role == 0) {
            Student.findByIdAndDelete(user.student, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Deleted : ", docs);
                }
            });
        }else if(user.role == 1) {
            Educator.findByIdAndDelete(user.educator, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Deleted : ", docs);
                }
            });
        }
    })
    User.findByIdAndDelete(req.profile._id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
        }
    });
    res.redirect('/admin')
}


exports.addCategory = (req, res) => {
    const category = new Category(req.body)
    category.save((err, category) => {
        if(err) {
            console.log(err);
            return res.status(400).json( {
                err: "NOT able to save category in DB"
            }) 
        }
        return res.redirect('/admin')
    })
}
