const express = require('express')
const router = express.Router()

const { getUserById, getUser, gethome, getthome } = require('../controllers/user')
const { isSignedIn, isAuthenticated } = require('../controllers/auth')

router.get('/user', isSignedIn, gethome)
router.get('/educator', isSignedIn, getthome )
router.param('userId', getUserById)

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser)

module.exports = router;