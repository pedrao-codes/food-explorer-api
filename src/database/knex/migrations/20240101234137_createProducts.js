exports.up = knex => knex.schema.createTable("products", table => {
    table.increments("id")
    table.text("name")
    table.text("group")
    table.text("description")
    table.decimal("price", 5, 2)
    table.text("image")
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("products")