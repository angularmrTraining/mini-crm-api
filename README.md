# Mini CRM REST API
[![Build](https://travis-ci.org/angularmrTraining/mini-crm-api.svg?branch=master)](https://travis-ci.org/angularmrTraining/mini-crm-api)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Coverage Status](https://coveralls.io/repos/github/angularmrTraining/mini-crm-api/badge.svg?branch=master)](https://coveralls.io/github/angularmrTraining/mini-crm-api?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f07ac0f01b124e628c6465c42903c232)](https://www.codacy.com/app/Lazhari/mini-crm-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=angularmrTraining/mini-crm-api&amp;utm_campaign=Badge_Grade)
[![Build status](https://ci.appveyor.com/api/projects/status/dn7gpsyv2wb881nh?svg=true)](https://ci.appveyor.com/project/Lazhari/mini-crm-api)
[![bitHound Overall Score](https://www.bithound.io/github/angularmrTraining/mini-crm-api/badges/score.svg)](https://www.bithound.io/github/angularmrTraining/mini-crm-api)
[![bitHound Dependencies](https://www.bithound.io/github/angularmrTraining/mini-crm-api/badges/dependencies.svg)](https://www.bithound.io/github/angularmrTraining/mini-crm-api/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/angularmrTraining/mini-crm-api/badges/devDependencies.svg)](https://www.bithound.io/github/angularmrTraining/mini-crm-api/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/angularmrTraining/mini-crm-api/badges/code.svg)](https://www.bithound.io/github/angularmrTraining/mini-crm-api)

> Mini CRM API is minimal RESTful API using Express and mongoose to complete the Angular version 5 evaluation home work.

> For more details check out [the API doc](https://mini-crm-api.herokuapp.com/doc/)

# Start Project

```
$ git clone https://github.com/angularmrTraining/mini-crm-api
$ cd mini-crm-api
$ npm install 
$ npm run dev
```

# Run Test 

```
$ npm run test
```

# Contact Model

> Contact model schema

```javascript
{
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
}
```