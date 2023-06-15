/* File for user authentication, if it is authenticated (with email and password
typed correctly), we will generate a token for it */

const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcryptjs")

class SessionController {
   async create(req, res) {
      const { email, password } = req.body

      const user = await knex('users').where({ email }).first()

      if(!user) {
         throw new AppError('Wrong e-mail or password!', 401)
      }

      const passwordMatched = await compare(password, user.password)

      if(!passwordMatched) {
         throw new AppError("Password or email doesn't match!", 401)
      }

      return res.json(user)
   }
}

module.exports = SessionController