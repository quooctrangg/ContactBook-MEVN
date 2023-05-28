const express = require('express')
const contacts = require('../controllers/contact.controller')

const router = express.Router()

router.route('/')
    .get(contacts.findAll)
    .post(contacts.create)
    .delete(contacts.deleteAll)

router.route('/favorite')
    .get(contacts.findAllFavorite)

router.route('/:id')
    .get(contacts.findOne)
    .put(contacts.update)
    .delete(contacts.delete)

router.route('/group/:groupId')
    .get(contacts.findAllGroups)
    .put(contacts.updateGroupId)

module.exports = router