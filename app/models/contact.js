'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Boook schema definition

const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    address: {
        lineOne: {
            type: String,
            required: true
        },
        lineTwo: {
            type: String
        },
        city: {
            type: String,
            require: true
        },
        state: {
            type: String
        },
        country: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

// Sets the createdAt parameter equal to the current time

ContactSchema.pre('save', next => {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

// Exports the ContactSchema for use elsewhere
module.exports = mongoose.model('contact', ContactSchema, 'contacts');