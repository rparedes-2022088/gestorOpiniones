import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'

import usuariosRoutes from '../src/user/user.routes.js'
import opinionRoutes from '../src/opinions/opinion.routes.js'
import commentRoutes from '../src/comments/comment.routes.js'
import categorieRoutes from '../src/categories/categories.routes.js'

const app = express()
config()
const port = process.env.PORT || 3200

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/opiniones',opinionRoutes)
app.use('/usuarios', usuariosRoutes)
app.use('/comentarios', commentRoutes)
app.use('/categories', categorieRoutes)

export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}