const Lesson = require("../models/lesson")
const Course = require("../models/course")
const User = require("../models/user")
const Category = require("../models/category")
const educator = require("../models/educator")
const user = require("../models/user")
const router = require("../routes/course")


exports.getCourseById = (req, res, next, id) => {
    console.log(id);
    Course.findById(id)
        .populate('lessons')
        .exec((err, course) => {
            if(err || !course) {
                console.log(err);
                return res.status(404).json( {
                    err: "unable to fetch course"
                })
        }
        req.course = course
        next()
    })
}


exports.courseform = (req, res) => {
        Category.find({}, (err, categories) => {

            res.render('courseupload', {categories, id: req._id})
    })
}


exports.addCourse = (req, res) => {
    const data = req.body
    const course = new Course(data)
    Category.findOne({name: data.categorydb}, (err, category) => {
        course.category = category
        course.save((err, course) => {
            if(err) {
                console.log(err);
                return res.status(400).json( {
                    err: "NOT able to save course in DB"
                }) 
            }
            User.findByIdAndUpdate(req.profile._id)
                .populate('educator')
                .exec((err, user) => {
                    if(err || !user) {
                        console.log(err);
                        return res.status(400).json( {
                            err: "NOT able to save course in DB"
                        }) 
                    }
                    user.educator.courses.push(course)
                    user.educator.save()
                    user.save()
                })
                return res.redirect('/api/educator')
        })
    })
   
}

exports.allCourses = (req, res) => {

    Course.find({}, (err, courses) => {
        if(err) {
            console.log(err);
            return res.status(400).json( {
                err: "Something went wrong"
            }) 
        }
        console.log(courses);
        return res.render('courses', { Cactive: "active", courses })
    })
}

exports.clist = (req, res) => {
    User.findById(req.profile._id)
        .populate('educator')
        .exec((err, user) => {
            if(err || !user) {
                console.log(err);
                return res.status(404).json( {
                    err: "unable to fetch courses"
                }) 
            }
            const courses =  user.educator.courses
            res.render('educatorcourselist', {courses})

        })
}


exports.course = (req, res) => {
            const course = req.course 
            console.log(course);
            return res.render('course', {course})

}
