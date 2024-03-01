'use strict'

import { Schema, model } from 'mongoose'

const opinionSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        required: true
    },
    categorie: {
        type: Schema.ObjectId,
        ref: 'categorie',
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

export default model('opinion', opinionSchema)