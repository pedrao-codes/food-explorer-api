class UsersController {
    create(request, response) {
        const { email, password } = request.body
    
        response.json({email, password})
    }
}

module.exports = UsersController