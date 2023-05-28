const express = require('express')

const group = require('../controllers/group.controller')

const router = express.Router()

router.route('/')
    .get(group.findAll)
    .post(group.create)

router.route('/:id')
    .get(group.findOne)
    .put(group.update)
    .delete(group.delete)

module.exports = router
