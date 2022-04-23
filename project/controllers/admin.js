const Category = require("../models/category")


exports.Category = (req, res) => {
    res.render('addcategory')
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
