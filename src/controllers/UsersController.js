const { hash, compare } = require('bcryptjs')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class UsersController {
   async create(req, res) {
      const { name, email, password } = req.body

      const checkUserExists = await knex("users")
         .where({ email }).first()
      
      const validPassword = password.length < 6

      if(checkUserExists && validPassword) {
         throw new AppError(
            "This email is already in use and the minimum number of characters in the password is 6"
         )
      }

      if(checkUserExists) {
         throw new AppError("This email is already in use.")
      }

      if(validPassword) {
         throw new AppError("The minimum number of characters in the password is 6.")
      }

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


