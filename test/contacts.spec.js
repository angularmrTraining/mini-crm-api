// During the rest the en variable is set to test
/* global describe it beforeEach */
process.env.NODE_ENV = 'test';

const Contact = require('../app/models/contact');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);

// Our parent block

describe('Contact', () => {
    beforeEach((done) => {
        Contact.remove({}, (err) => {
            if (err) {
                console.error(err);
            }
            done();
        });
    });

    /**
     * Test the /GET route
     */

    describe('/GET contact', () => {
        it('it should GET all the contacts', (done) => {
            chai.request(server)
                .get('/api/v1/contacts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('contacts');
                    res.body.contacts.length.should.be.eql(0);
                    done();
                });
        });
    });
    /**
     * Test the /POST route
     */
    describe('/POST contact', () => {
        it('it should not POST a contact without email field', (done) => {
            const contact = {
                firstName: 'Jordan',
                lastName: 'Hayes',
                gender: 'female'
            };
            chai.request(server)
                .post('/api/v1/contacts')
                .send(contact)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('email');
                    res.body.errors.email.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('it should POST a contact', (done) => {
            const contact = {
                firstName: 'Howe',
                lastName: 'Brock',
                gender: 'male',
                email: 'howebrock@navir.com',
                phone: '+212 (829) 571-3562',
                bio: 'Ex fugiat nostrud ullamco minim irure quis cillum exercitation tempor qui.',
                address: {
                    lineOne: 'Tilden Avenue',
                    lineTwo: 'Sheffield Avenue, 510',
                    city: 'Frizzleburg',
                    state: 'Wisconsin',
                    country: 'Pitcairn',
                    zipCode: 8585
                }
            };
            chai.request(server)
                .post('/api/v1/contacts')
                .send(contact)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('response').eql('Contact successfully added!');
                    res.body.contact.should.be.a('object');
                    res.body.contact.should.have.property('_id');
                    res.body.contact.should.have.property('firstName').eql('Howe');
                    done();
                });
        });
    });
    /**
     * Test the GET/:id route
     */
    describe('/GET/:id contact', () => {
        it('it should GET a contact by the given id', (done) => {
            const contact = new Contact({
                firstName: 'Howe',
                lastName: 'Brock',
                gender: 'male',
                email: 'howebrock@navir.com',
                phone: '+212 (829) 571-3562',
                bio: 'Ex fugiat nostrud ullamco minim irure quis cillum exercitation tempor qui.',
                address: {
                    lineOne: 'Tilden Avenue',
                    lineTwo: 'Sheffield Avenue, 510',
                    city: 'Frizzleburg',
                    state: 'Wisconsin',
                    country: 'Pitcairn',
                    zipCode: 8585
                }
            });
            contact.save((err, contact) => {
                chai.request(server)
                    .get(`/api/v1/contacts/${contact.id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('contact');
                        res.body.contact.should.be.a('object');
                        res.body.contact.should.have.property('_id').eql(contact.id);
                        done();
                    });

            });
        });

        it('it should GET an error if the contact ID is not valid', (done) => {
            chai.request(server)
                .get('/api/v1/contacts/90')
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.have.property('error');
                    res.body.error.should.be.a('object');
                    res.body.error.should.have.property('message');
                    res.body.error.should.have.property('name');
                    res.body.error.should.have.property('kind').eql('ObjectId');
                    res.body.error.should.have.property('value').eql('90');
                    res.body.error.should.have.property('path').eql('_id');
                    done();
                });
        });

        it('it should GET not found if the contact ID don\'t exist', (done) => {
            chai.request(server)
                .get('/api/v1/contacts/589e02e559f531603fe40322')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('Contact not found!');
                    res.body.should.have.property('id').eql('589e02e559f531603fe40322');
                    done();
                });
        });
    });
    /**
     * Test the /PUT/:id route
     */
    describe('/PUT/:id contact', () => {
        it('it should UPDATE a contact given the id', (done) => {
            const contact = new Contact({
                firstName: 'Howe',
                lastName: 'Brock',
                gender: 'male',
                email: 'howebrock@navir.com',
                phone: '+212 (829) 571-3562',
                bio: 'Ex fugiat nostrud ullamco minim irure quis cillum exercitation tempor qui.',
                address: {
                    lineOne: 'Tilden Avenue',
                    lineTwo: 'Sheffield Avenue, 510',
                    city: 'Frizzleburg',
                    state: 'Wisconsin',
                    country: 'Pitcairn',
                    zipCode: 8585
                }
            });
            contact.save((err, contact) => {
                chai.request(server)
                    .put(`/api/v1/contacts/${contact.id}`)
                    .send({
                        lastName: 'Lazhari'
                    })
                    .end((err, res) => {
                        res.should.have.status(202);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Contact updated!');
                        res.body.contact.should.have.property('lastName').eql('Lazhari');
                        done();
                    });
            });
        });

        it('it should return an error if the contact gender is invalid', (done) => {
            const contact = new Contact({
                firstName: 'Howe',
                lastName: 'Brock',
                gender: 'male',
                email: 'howebrock2@navir.com',
                phone: '+212 (829) 571-3562',
                bio: 'Ex fugiat nostrud ullamco minim irure quis cillum exercitation tempor qui.',
                address: {
                    lineOne: 'Tilden Avenue',
                    lineTwo: 'Sheffield Avenue, 510',
                    city: 'Frizzleburg',
                    state: 'Wisconsin',
                    country: 'Pitcairn',
                    zipCode: 8585
                }
            });
            contact.save((err, contact) => {
                chai.request(server)
                    .put(`/api/v1/contacts/${contact.id}`)
                    .send({
                        gender: 'Femme'
                    })
                    .end((err, res) => {
                        res.should.have.status(500);
                        res.body.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors.should.have.property('gender');
                        res.body.errors.gender.should.have.property('kind').eql('enum');
                        done();
                    });
            });
        });

        it('it should return an error if the contact ID is not valid', (done) => {
            chai.request(server)
                .put('/api/v1/contacts/90')
                .send({
                    gender: 'female'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('name');
                    res.body.should.have.property('kind').eql('ObjectId');
                    res.body.value.should.have.property('_id').eql('90');
                    res.body.should.have.property('path').eql('_id');
                    done();
                });
        });

        it('it should return not found if the contact ID don\'t exist', (done) => {
            chai.request(server)
                .put('/api/v1/contacts/589e02e559f531603fe40322')
                .send({
                    year: 2010
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('Contact not found!');
                    res.body.should.have.property('id').eql('589e02e559f531603fe40322');
                    done();
                });
        });
    });

    /**
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id Contact', () => {
        it('it should DELETE a contact given the id', (done) => {
            const contact = new Contact({
                firstName: 'Howe',
                lastName: 'Brock',
                gender: 'male',
                email: 'howebrock3@navir.com',
                phone: '+212 (829) 571-3562',
                bio: 'Ex fugiat nostrud ullamco minim irure quis cillum exercitation tempor qui.',
                address: {
                    lineOne: 'Tilden Avenue',
                    lineTwo: 'Sheffield Avenue, 510',
                    city: 'Frizzleburg',
                    state: 'Wisconsin',
                    country: 'Pitcairn',
                    zipCode: 8585
                }
            });
            contact.save((err, contact) => {
                chai.request(server)
                    .delete(`/api/v1/contacts/${contact.id}`)
                    .end((err, res) => {
                        res.should.have.status(202);
                        res.body.should.be.a('object');
                        res.body.should.have.property('response').eql('Contact successfully deleted!');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
        it('it should return an error if the contact ID is not valid', (done) => {
            chai.request(server)
                .delete('/api/v1/contacts/90')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('name');
                    res.body.should.have.property('kind').eql('ObjectId');
                    res.body.should.have.property('value').eql('90');
                    res.body.should.have.property('path').eql('_id');
                    done();
                });
        });

        it('it should return not found if the contact ID don\'t exist', (done) => {
            chai.request(server)
                .delete('/api/v1/contacts/589e02e559f531603fe40322')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Contact not found!');
                    res.body.should.have.property('id').eql('589e02e559f531603fe40322');
                    done();
                });
        });
    });
});