const express = require('express')
const router = express.Router()

const { getUserById, getUser, gethome, getthome, updateUser, updateForm } = require('../controllers/user')
const { isSignedIn, isAuthenticated } = require('../controllers/auth')

router.param('userId', getUserById)
router.get('/user', isSignedIn, gethome)
router.get('/educator', isSignedIn, getthome )

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser)
router.get('/update/:userId',isSignedIn, isAuthenticated, updateForm )
router.post('/updateuser/:userId',isSignedIn, isAuthenticated,updateUser )
module.exports = router;