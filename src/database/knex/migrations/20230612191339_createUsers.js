exports.up = async function(knex) {
   const exists = await knex.schema.hasTable("users")
   if(!exists) {
      await knex.schema.createTable("users", table => {
         table.increments("id")
         table.boolean("isAdmin").default(false)
         table.text("name")
         table.text("email")
         table.text("password")
         table.timestamp("created_at").default(knex.fn.now())
         table.timestamp("updated_at").default(knex.fn.now())
      })
   }
} 

exports.down = knex => knex.schema.dropTable("users")