/* File for user authentication, if it is authenticated (with email and password
typed correctly), we will generate a token for it */

const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcryptjs")

// import token
const authConfig = require("../configs/auth")
// do próprio jsonwebtoken, para gerarmos o token mais abaixo
const { sign } = require("jsonwebtoken")


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

      // desestruturando de nosso auth.js
      const { secret, expiresIn} = authConfig.jwt
      
      const token = sign({}, secret, {
         // pega o id do nosso user
         subject: String(user.id),
         expiresIn
      })

      return res.json({ user, token })
   }
}

module.exports = SessionController