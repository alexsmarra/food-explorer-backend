require('express-async-errors')
const AppError = require("./utils/AppError")

const express = require('express')

const routes = require("./routes")

const app = express()
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

   console.log(err)

   //server side
   return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
   })
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}.`))
