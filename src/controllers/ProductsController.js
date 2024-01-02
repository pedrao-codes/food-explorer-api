const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class ProductsController {
    async create(request, response) {
        const product = request.body

        const emptyValues = Object.values(product).filter(info => !info)

        if(emptyValues.length > 0) {
            throw new AppError("Por favor, preencha os campos corretamente!")
        }

        const { name, category, description, price, image, tags } = product

        const nameExists = await knex("products").where({ name }).first()

        if(nameExists) {
            throw new AppError("Já existe um produto com esse nome")
        }

        const findCategory =
            await knex("products_categories")
            .where({ category }).first()
            .select("id")

        if(!findCategory) {
            throw new AppError("Categoria não encontrada")
        }

        const category_id = findCategory.id

        let product_id = await knex("products").insert({
            name, category_id, description, price, image
        })
        
        if(tags) {
            product_id = Number(product_id)

            const tagsInsert = tags.map(tag => {
                return {
                    product_id,
                    name: tag
                }
            })
    
            await knex("tags").insert(tagsInsert)
        }

        response.status(201).json()
    }

    async index(request, response) {
        const products = await knex("products_categories")
        .select([
            "products.id as product_id",
            "products.name",
            "products_categories.category",
            "products.description",
            "products.price",
            "products.image"
        ])
        .innerJoin(
            "products",
            "products.category_id",
            "products_categories.id"
        )
        .orderBy("products_categories.category")
        
        response.status(201).json(products)
    }
}

module.exports = ProductsController