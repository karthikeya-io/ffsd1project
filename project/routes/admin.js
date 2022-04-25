const express = require('express')
const router = express.Router()
const {Category, addCategory, searchResults, blockUser} = require('../controllers/admin')
const {  getUserById } = require('../controllers/user')


router.param('userId', getUserById)


router.get('/addcategory', Category)

router.post('/addcategory', addCategory)

router.post('/results', searchResults)
router.get('/block/:userId', blockUser)
module.exports = router