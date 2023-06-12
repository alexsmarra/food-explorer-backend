const { Router } = require('express')

const sessionsRouter = require('./sessions.routes')

const routes = Router()
routes.use('/sessions', sessionsRouter)

module.exports = routes