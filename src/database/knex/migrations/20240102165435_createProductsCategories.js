exports.up = knex => knex.schema.createTable("products_categories", table => {
    table.increments("id")
    table.text("category").unique()
})

exports.down = knex => knex.schema.dropTable("products_categories")