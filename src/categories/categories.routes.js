'use strict'

import { Router } from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { newCategorie, updateCategorie, deleteCategorie } from './categories.controller.js'

const api = Router()

api.post('/newCategorie', validateJwt, newCategorie)
api.put('/updateCategorie/:id', validateJwt, updateCategorie)
api.delete('/deleteCategorie/:id', validateJwt, deleteCategorie)

export default api