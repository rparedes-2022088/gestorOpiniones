import { initServer } from './configs/app.js'
import { connect } from './configs/mongo.js'
import { defaultCategorie } from './src/categories/categories.controller.js'

initServer()
connect()
defaultCategorie()