'use strict';

module.exports = function (app) {
    app.get('/', (req, res) => res.json({
        message: 'Welcome to our Mini CRM!'
    }));

    app.use('/api/v1/contacts', require('./contacts'));
};