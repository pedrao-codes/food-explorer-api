exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("id")
    table.text("name").notNull()
    table.text("email").notNull().unique()
    table.text("password").notNull()
    table.integer("isAdmin").default(0)
})

exports.down = knex => knex.schema.dropTable("users")