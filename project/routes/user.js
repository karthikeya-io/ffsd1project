const express = require('express')
const router = express.Router()

const { getUserById, getUser, gethome } = require('../controllers/user')
const { isSignedIn, isAuthenticated } = require('../controllers/auth')

router.get('/user', isSignedIn, gethome)

router.param('userId', getUserById)

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser)

module.exports = router;