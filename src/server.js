require('express-async-errors')
require("dotenv/config")

const multer = require('multer');
const upload = multer();

const AppError = require("./utils/AppError")

const uploadConfig = require("./configs/uploads")

const cors = require('cors')
const express = require('express')

const routes = require("./routes")

const app = express()
// npm install cors   para que o nosso backend consiga atender as requisições do nosso frontend
app.use(cors())
app.use(express.json())
/* middleware do multer permitindo que todo o meu backend receba arquivos multipart/form-data 
(formData do meu frontEnd por exemplo) */
app.use(upload.any());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

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

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}.`))
