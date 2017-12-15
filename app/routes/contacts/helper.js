'use strict';

const Contact = require('../../models/contact');

/**
 * @api {get} /v1/contacts Retrieve all the contacts
 * @apiName all
 * @apiGroup Contacts
 */

function getAllContacts(req, res) {
    // Query the DB and if no errors, send all the contacts
    let query = Contact.find({});
    query.exec((error, contacts) => {
        if (error) {
            return res.send(500, {
                error
            });
        } else {
            //If no errors, send them back to the clients
            return res.send({
                contacts
            });
        }
    });
}

/**
 * @api {post} /v1/contacts Add a new Contact
 * @apiName new
 * @apiGroup Contacts
 */

function newContact(req, res) {
    // Create a new contact
    const contact = new Contact(req.body);
    // Save it into the DB
    contact.save((error, contact) => {
        if (error) {
            if (error.errors) {
                return res.send(400, {
                    errors: error.errors
                });
            } else {
                return res.send(500, {
                    error
                });
            }
        } else {
            // If no erros, send it back to the clients
            return res.send(201, {
                response: 'Contact successfully added!',
                contact
            });
        }
    });
}

/**
 * @api {get} /v1/contacts/:id Request a single contact by ID
 * @apiName single
 * @apiGroup Contacts
 */
function getSingleContact(req, res) {
    Contact.findById(req.params.id, (error, contact) => {
        if (error) {
            return res.send(500, {
                error
            });
        }
        if (contact) {
            return res.send(200, {
                contact
            });
        } else {
            return res.send(404, {
                error: 'Contact not found!',
                id: req.params.id
            });
        }
    });
}

/**
 * @api {delete} /v1/contacts/:id Delete contact by ID
 * @apiName delete
 * @apiGroup Contacts
 */
function deleteContact(req, res) {
    Contact.remove({
        _id: req.params.id
    }, (error, result) => {
        if (error) {
            return res.send(400, error);
        }
        if (result.result.n === 0) {
            return res.send(404, {
                message: 'Contact not found!',
                id: req.params.id
            });
        } else {
            return res.send(202, {
                response: 'Contact successfully deleted!',
                result
            });
        }
    });
}

/**
 * @api {put} /v1/contacts/:id Update contact
 * @apiName update
 * @apiGroup Contacts
 */

function updateContact(req, res) {
    Contact.findById({
        _id: req.params.id
    }, (error, contact) => {
        if (error) {
            return res.send(400, error);
        }
        if (!contact) {
            return res.send(404, {
                error: 'Contact not found!',
                id: req.params.id
            });
        } else {
            Object.assign(contact, req.body).save((error, contact) => {
                if (error) {
                    return res.send(500, error);
                } else {
                    return res.send(202, {
                        message: 'Contact updated!',
                        contact
                    });
                }
            });
        }
    });
}

// Export all the functions 

module.exports = {
    getAllContacts,
    newContact,
    getSingleContact,
    deleteContact,
    updateContact
};