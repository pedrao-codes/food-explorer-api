const { Router } = require("express")
const sessionsRoutes = Router()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const SessionsController = require("../controllers/SessionsController")
const sessionsController = new SessionsController()

sessionsRoutes.post("/", sessionsController.create)

module.exports = sessionsRoutes