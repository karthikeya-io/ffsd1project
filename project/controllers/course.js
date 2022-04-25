const Lesson = require("../models/lesson")
const Course = require("../models/course")
const User = require("../models/user")
const Category = require("../models/category")
const educator = require("../models/educator")
const user = require("../models/user")
const router = require("../routes/course")

exports.getCourseById = (req, res, next, id) => {
    Course.findById(id)
        .populate('lessons')
        .populate('category')
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

exports.getLessonById = (req, res, next, id) => {
    Lesson.findById(id)
        .exec((err, lesson) => {
            if(err || !lesson) {
                console.log(err);
                return res.status(404).json( {
                    err: "unable to fetch course"
                })
        }
        req.lesson = lesson
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

exports.enrollCourse = (req, res) => {
    const course = req.course
    User.findByIdAndUpdate(req._id)
                .populate('student')
                .exec((err, user) => {
                    if(err || !user) {
                        console.log(err);
                        return res.status(400).json( {
                            err: "NOT able to save course in student"
                        }) 
                    }
                    user.student.courses.push(course)
                    user.student.save()
                    user.save()
                })
                res.redirect(`/course/course/${course._id}`)
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

exports.searchCourse = (req, res) => {
    const data = req.body
    const regex = new RegExp(data.cname, 'i') 
    Course.find({title: {$regex: regex}}, (err, courses) => {
        if(err) {
            console.log(err);
        }
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
            
            const lesson = req.lesson
            let lessons = course.lessons

            if(lessons.length > 0) {
                
                function compare( a, b ) { 
                    if ( a.moduleno < b.moduleno ){ 
                    return -1;
        
                    }
        
                    if ( a.moduleno > b.moduleno ) { 
                    return 1;
                    }
        
                    return 0;
                }
                    lessons.sort(compare)
                
                let moduleno = lessons[0].moduleno
                let modules = []
                modules[0] = new Array()
                let j = 0
                let k = 0
                for(let i=0; i<lessons.length; i++) {
                    if(moduleno == lessons[i].moduleno) {
                        modules[0].push(lessons[i]) 
                        k++
                    }
                    else {
                        moduleno = lessons[i].moduleno
                        j++
                        modules[j] = new Array()
                        k=0
                        modules[j].push(lessons[i]) 
                        k++
                    }
                }
                return res.render('course', {modules, course, lesson})

            }
            res.render('course', {course} )



}

exports.paymentpage = (req, res) => {
    const course = req.course
    res.render('payment', {course})
}