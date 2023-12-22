const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");

const auth = require("../configs/auth");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
    async create(request, response) {
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

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.status(200).json({ user, token })
    }
}

module.exports = SessionsController