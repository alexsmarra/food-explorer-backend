// We are not going to save the image file inside de database because it is heavy, but we'll put it inside a folder and the database will take de image reference.

// in terminal    npm install multer   , is the library that we'll use to upload 
const path = require("path")
const multer = require("multer")
const crypto = require("crypto")

// TMP_FOLDER is where the image arrives (temporária)
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")

// UPLOADS_FOLDER is where the image will actually stay (aonde ela realmente ficará)
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

const MULTER = {
   storage: multer.diskStorage({
      destination: TMP_FOLDER,
      filename(req, file, callback) {
         // let's use the hash for the file names to be different
         const fileHash = crypto.randomBytes(10).toString("hex")
         const fileName = `${fileHash}-${file.originalname}`

         return callback(null, fileName)
      }
   })
}

module.exports = {
   TMP_FOLDER,
   UPLOADS_FOLDER,
   MULTER
}