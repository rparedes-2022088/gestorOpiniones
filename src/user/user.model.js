'use strict'

import { Schema, model } from 'mongoose'

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        maxLenght: 8,
        minLenght: 8,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['USER'],
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
})

export default model('user', userSchema)