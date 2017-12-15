'use strict';

const router = require('express').Router();

const contact = require('./helper');

router.route('/')
    .get(contact.getAllContacts)
    .post(contact.newContact);

router.route('/:id')
    .get(contact.getSingleContact)
    .delete(contact.deleteContact)
    .put(contact.updateContact);

module.exports = router;