const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body

        const valuesIsEmpty = !name || !email || !password

        if(valuesIsEmpty) {
            throw new AppError("Por favor, preencha os dados corretamente", 400)
        }

        const checkUserExists = await knex("users").where({ email }).first()

        if(checkUserExists) {
            throw new AppError("Este e-mail já está em uso", 400)
        }

        const hashedPassword = await hash(password, 8)

        await knex("users").insert({
            name, 
            email, 
            password: hashedPassword
        })

        return response.status(201).json()
    }
}

module.exports = UsersController