const knex = require("../database/knex");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body
        
        await knex("users").insert({
            name, email, password
        })

        return response.json("Usuário criado com sucesso!")
    }
}

module.exports = UsersController