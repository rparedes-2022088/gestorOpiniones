'use strict'

import { Schema, model } from 'mongoose'

const commentSchema = Schema({
    opinion: {
        type: Schema.ObjectId,
        ref: 'opinion',
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    content: {
        type: String,
        required: true
    }
})

export default model('comment', commentSchema)