const { Router } = require("express")

const DishesController = require('../controllers/DishesController')

const dishesRoutes = Router()

const dishesController = new DishesController()

dishesRoutes.post("/", dishesController.create)

module.exports = dishesRoutes