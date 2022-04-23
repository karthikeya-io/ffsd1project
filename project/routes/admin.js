const express = require('express')
const router = express.Router()
const {Category, addCategory} = require('../controllers/admin')


router.get('/addcategory', Category)

router.post('/addcategory', addCategory)

module.exports = router