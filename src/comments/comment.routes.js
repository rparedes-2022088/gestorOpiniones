'use strict'

import { Router } from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { newComment, updateComment, deleteComment } from './comment.controller.js'

const api = Router()

api.post('/newComment', validateJwt, newComment)
api.put('/updateComment/:id', validateJwt, updateComment)
api.delete('/deleteComment/:id', validateJwt, deleteComment)

export default api