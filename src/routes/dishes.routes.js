const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/uploads")

const DishesController = require('../controllers/DishesController')

const dishesRoutes = Router()

const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()

dishesRoutes.post("/", upload.single("image"), dishesController.create)

module.exports = dishesRoutes