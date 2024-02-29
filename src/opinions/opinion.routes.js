'use strict'

import { Router } from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { newOpinion, updateOpinion, deleteOpinion } from './opinion.controller.js'

const api = Router()

api.post('/newOpinion', validateJwt, newOpinion)
api.put('/updateOpinion/:id', validateJwt, updateOpinion)
api.delete('/deleteOpinion/:id', validateJwt, deleteOpinion)

export default api