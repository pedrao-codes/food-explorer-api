const knex = require("../database/knex");
const AppError = require("../utils/AppError")

const { hash, compare } = require("bcryptjs")

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body

        if(!name || !email || !password) {
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

    async read(request, response) {
        const { email, password } = request.body

        if(!email || !password) {
            throw new AppError("Por favor, preencha os dados corretamente", 400)
        }

        const user = await knex("users").select().where({ email }).first()

        if(!user) {
            throw new AppError("E-mail e/ou senha inválido(s)")
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched) {
            throw new AppError("E-mail e/ou senha inválido(s)")
        }

        return response.status(200).json(user)
    }
}

module.exports = UsersController