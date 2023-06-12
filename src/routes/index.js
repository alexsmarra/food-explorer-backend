const { Router } = require('express')

const sessionsRouter = require('./sessions.routes')
const usersRoutes = require('./users.routes')

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRoutes)

module.exports = routes