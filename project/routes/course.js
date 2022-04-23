const express = require('express');
const router = express.Router();
const Course = require("../models/course")
const { courseform, addCourse, allCourses, clist, course, getCourseById } = require('../controllers/course')
const {  getUserById } = require('../controllers/user')
const {  isSignedIn } = require('../controllers/auth')
const Lesson = require("../models/lesson")
const multer = require('multer');
const uuid = require("uuid").v4;
const path = require("path");

let lesson
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const id = uuid();
        let data = req.body;
        const filePath = `videos/${id}${ext}`;
        const finalData = Object.assign(data, {filePath: filePath})
        lesson = new Lesson(data)
        lesson.filePath = filePath
        lesson.save().then(
            cb(null, filePath)
        )
    //    Lesson.create(data)
    //         .then(() => {
    //             cb(null, filePath);
    //         })
    }
})
const upload = multer({storage: storage});

router.post('/upload/:courseId', upload.single('video'), (req, res) => {
    const cid = req.params.courseId
    console.log(lesson);
    Course.findByIdAndUpdate(cid)
        .populate('lessons')
        .exec((err, course) => {
            if(err || !course) {
                console.log(err);
                return res.status(400).json( {
                    err: "Something went wrong"
                })
            }
            course.lessons.push(lesson)
            course.save()
        })

    res.render("lessonupload", {cid, ok:'0'});

} )

router.param('userId', getUserById)
router.get('/cupload', isSignedIn, courseform);

router.post('/cupload/:userId', addCourse)

router.get('/clist/:userId', clist)

router.get("/upload/:courseId", (req, res) => {
    res.render("lessonupload", {cid: req.params.courseId});
  });


router.get('/courses', allCourses)

router.param('courseId', getCourseById)
router.get('/course/:courseId', course)

module.exports = router;
