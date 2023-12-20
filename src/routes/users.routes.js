const { Router } = require("express")
const usersRoutes = Router()

usersRoutes.post("/", (request, response) => {
    const { email, password } = request.body

    response.json({email, password})
})

module.exports = usersRoutes