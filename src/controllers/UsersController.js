const { hash, compare } = require('bcryptjs')
const knex = require('../database/knex')
// const AppError

class UsersController {
   async create(req, res) {
      const { name, email, password } = req.body

      // const checkUserExists = await knex("users")
      //    .where({ email }).first()

      // if(checkUserExists) {
      //    throw new AppError("This email is already in use")
      // }

      const hashedPassword = await hash(password, 8)

      await knex("users").insert({
         name,
         email,
         password: hashedPassword
      })

      return res.status(201).json()
   }
}

module.exports = UsersController


