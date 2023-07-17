require('express-async-errors')
require("dotenv/config")

const AppError = require("./utils/AppError")

const cors = require('cors')
const express = require('express')

const routes = require("./routes")

const app = express()
// npm install cors   para que o nosso backend consiga atender as requisições do nosso frontend
app.use(cors())
app.use(express.json())

app.use(routes)

app.use((err, req, res, next) => {
   // client side
   if(err instanceof AppError) {
      return res.status(err.statusCode).json({
         status: 'error',
         message: err.message
      })
   }

   //server side
   return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
   })
})

const PORT = 4444
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}.`))
