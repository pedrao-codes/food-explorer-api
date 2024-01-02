const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class ProductsController {
    async create(request, response) {
        const { name, group, description, price, image } = request.body
        const product = { name, group, description, price, image }
        const emptyValues = Object.values(product).filter(info => !info)

        if(emptyValues.length > 0) {
            throw new AppError("Por favor, preencha os campos corretamente!")
        }
        
        await knex("products").insert({
            name, group, description, price, image
        })

        response.status(201).json()
    }
}

module.exports = ProductsController