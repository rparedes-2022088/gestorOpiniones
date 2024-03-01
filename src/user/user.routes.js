'use strict'

import { Router } from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { register, login, eliminarPerfil, editarPerfil, changePassword } from './user.controller.js'

const api = Router()

api.post('/register', register)
api.post('/login', login)
api.delete('/eliminarPerfil/:id', validateJwt, eliminarPerfil)
api.put('/editarPerfil/:id', validateJwt, editarPerfil)
api.put('/changePassword/:id', validateJwt, changePassword)

export default api