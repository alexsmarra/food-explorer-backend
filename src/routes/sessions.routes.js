const { Router } = require('express')

const SessionsController = require("../controllers/SessionController")

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const sessionsRoutes = Router()

const sessionsController = new SessionsController()

sessionsRoutes.post("/", ensureAuthenticated, sessionsController.create)

module.exports = sessionsRoutes