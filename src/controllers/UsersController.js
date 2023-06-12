const { hash, compare } = require('bcryptjs')
const knex = require('../database/knex')
// const AppError

class UsersController {
   async create(req, res) {
      const { name, email, password } = req.body

      const checkUserExists = await knex("users")
         .where({ email }).first()

      if(checkUserExists) {
         console.log("Esse email já existe, escolha outro")
         return
      }

      if(password.length < 6) {
         console.log("A senha deve ter no mínimo 6 caracteres")
         return
      }

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


