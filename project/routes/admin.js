const express = require('express')
const router = express.Router()
const {Category, addCategory, searchResults, blockUser, adminHome, deleteUser} = require('../controllers/admin')
const {  getUserById } = require('../controllers/user')
const { isSignedIn, isAdmin } = require('../controllers/auth')


router.param('userId', getUserById)

router.get('',  isSignedIn, isAdmin, adminHome)
router.get('/addcategory', isSignedIn, isAdmin, Category)

router.post('/addcategory', isSignedIn, isAdmin, addCategory)

router.post('/results', isSignedIn, isAdmin, searchResults)
router.get('/block/:userId', isSignedIn, isAdmin, blockUser)
router.get('/unblock/:userId', isSignedIn, isAdmin, blockUser)
router.get('/delete/:userId', isSignedIn, isAdmin, deleteUser)
module.exports = router