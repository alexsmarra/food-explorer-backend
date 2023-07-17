const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

/* Middleware que vai interceptar as requisições, pegar o token e dentro do token pegar o id
do usuário para sabermos quem é o usuário que está fazendo a requisição: */

function ensureAuthenticated(req, res, next) {
   // the token will stay here (ligado ao nosso auth.js do frontend)
   const authHeader = req.header.authorization

   if(!authHeader) {
      throw new AppError("Uninformed JWT Token", 401)
   }

   // the token will be like this "Bare xxxxxxxxxxx", so we will use split, which would look in an array like this (que ficaria em um array dessa forma) ["Bare", "xxxxxxxxx"], as we only need the token (the one in the second position of the array), we will destructuring it at once (de uma vez) in a variable called 'token' to let's get (para pegarmos) this data.
   const [, token] = authHeader.split(" ")

   try {
      /* Para verificar se o token é válido, 'verify' returns a 'sub', and we'll nickname it 'user_id' (vamos apelidá-lo de 'user_id', para pegar o id do user que está dentro do token) */
      const { sub: user_id } = verify(token, authConfig.jwt.secret)

      // let's create the 'user' variable inside request
      req.user = {
         // in SessionsController.js we pass it to string
         id: Number(user_id)
      }

      return next()

   } catch {
      throw new AppError("Invalid JWT Token", 401)
   }
}

module.exports = ensureAuthenticated