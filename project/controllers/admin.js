const Category = require("../models/category")
const User = require("../models/user")

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
            user.flag = 1
            user.save()
        })
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
