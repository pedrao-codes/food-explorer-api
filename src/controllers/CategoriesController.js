const knex = require("../database/knex")

class CategoriesController {
    async index(request, response) {
        const categories = await knex("products_categories")
        
        response.status(201).json(categories)
    }
}

module.exports = CategoriesController