'use strict';

const Contact = require('../../models/contact');

/**
 * @apiDefine NotFound
 * @apiError ContactNotFound The <code>id</code> of the contact was not found.
 */

/**
 * @api {get} /api/v1/contacts Retrieve all the contacts
 * @apiName all
 * @apiGroup Contacts
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "contacts": [
 *               {
 *                   "_id": "5a32f84891debf084fc5c31f",
 *                   "firstName": "Deana",
 *                   "lastName": "Burks",
 *                   "gender": "female",
 *                   "email": "deanaburks@navir.com",
 *                   "phone": "+212 (802) 419-2721",
 *                   "bio": "Et velit culpa pariatur esse magna cupidatat id labore id incididunt.",
 *                   "createdAt": "2017-12-15T02:32:38.275Z",
 *                   "address": {
 *                       "lineOne": "Tabor Court",
 *                       "lineTwo": "Danforth Street, 117",
 *                       "city": "Beason",
 *                       "state": "Alaska",
 *                       "country": "Mauritius",
 *                       "zipCode": "3535"
 *                   }
 *               }
 *           ]
 *       }
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
 * @api {post} /api/v1/contacts Add a new Contact
 * @apiName new
 * @apiGroup Contacts
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *       {
 *           "response": "Contact successfully added!",
 *           "contact": {
 *               "_id": "5a32f84891debf084fc5c322",
 *               "firstName": "Debora",
 *               "lastName": "Dunnald",
 *               "gender": "female",
 *               "email": "deboradunn@navir.com",
 *               "phone": "+212 (807) 553-2272",
 *               "bio": "Est anim sunt consequat anim ullamco magna mollit mollit irure labore elit anim.",
 *               "createdAt": "2017-12-14T22:17:18.794Z",
 *               "address": {
 *                   "lineOne": "Frank Court",
 *                   "lineTwo": "Batchelder Street, 361",
 *                   "city": "Kenmar",
 *                   "state": "Oregon",
 *                   "country": "Bangladesh",
 *                   "zipCode": "1821"
 *               }
 *           }
 *       }
 * 
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
 * @api {get} /api/v1/contacts/:id Request a single contact by ID
 * @apiName single
 * @apiGroup Contacts
 * 
 * @apiParam {String} id Contact unique ID.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "contact": {
 *               "_id": "5a32f84891debf084fc5c31f",
 *               "firstName": "Deana",
 *               "lastName": "Burks",
 *               "gender": "female",
 *               "email": "deanaburks@navir.com",
 *               "phone": "+212 (802) 419-2721",
 *               "bio": "Et velit culpa pariatur esse magna cupidatat id labore id incididunt.",
 *               "createdAt": "2017-12-15T02:33:31.141Z",
 *               "address": {
 *                   "lineOne": "Tabor Court",
 *                   "lineTwo": "Danforth Street, 117",
 *                   "city": "Beason",
 *                   "state": "Alaska",
 *                   "country": "Mauritius",
 *                   "zipCode": "3535"
 *               }
 *           }
 *       }
 * 
 * @apiUse NotFound
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
 * @api {delete} /api/v1/contacts/:id Delete contact by ID
 * @apiName delete
 * @apiGroup Contacts
 * 
 * @apiParam {String} id Contact unique ID.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 202 Accepted
 *       {
 *           "response": "Contact successfully deleted!",
 *           "result": {
 *               "n": 1,
 *               "ok": 1
 *           }
 *       }
 * 
 * @apiUse NotFound
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
 * @api {put} /api/v1/contacts/:id Update contact
 * @apiName update
 * @apiGroup Contacts
 * 
 * @apiParam {String} id Contact unique ID.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 202 Accepted
 *      {
 *          "message": "Contact updated!",
 *          "contact": {
 *              "_id": "5a32f84891debf084fc5c322",
 *              "firstName": "Debora",
 *              "lastName": "Dunnald",
 *              "gender": "female",
 *              "email": "deanaburks@navir.com",
 *              "phone": "+212 (807) 553-2272",
 *              "bio": "Est anim sunt consequat anim ullamco magna mollit mollit irure labore elit anim.",
 *              "createdAt": "2017-12-14T22:17:18.794Z",
 *              "address": {
 *                  "lineOne": "Frank Court",
 *                  "lineTwo": "Batchelder Street, 361",
 *                  "city": "Kenmar",
 *                  "state": "Oregon",
 *                  "country": "Bangladesh",
 *                  "zipCode": "1821"
 *              }
 *          }
 *      } 
 * 
 * @apiUse NotFound
 * 
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