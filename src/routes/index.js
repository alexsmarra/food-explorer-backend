const { Router } = require('express')

const sessionsRouter = require('./sessions.routes')
const usersRoutes = require('./users.routes')
const dishesRoutes = require("./dishes.routes")

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRoutes)
routes.use('/dishes', dishesRoutes)

module.exports = routes