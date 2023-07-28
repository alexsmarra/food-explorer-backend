const knex = require('../database/knex');
const AppError = require('../utils/AppError');

const DiskStorage = require("../providers/DiskStorage")
const diskStorage = new DiskStorage()

class DishesController {
  async create(req, res) {
    const { filename: image } = req.file;
    const { name, category, ingredients, price, description } = req.body;
      
    const filename = await diskStorage.saveFile(image)

    if(category === "escolha") {
      throw new AppError("Escolha uma categoria.")
    }
      
    try {
      await knex("dishes").insert({
          image: filename,
          name,
          category,
          ingredients,
          price,
          description,
          category
        });
        
      return res.status(200).json();
    
      } catch(error) {
        console.log(error)
      throw new AppError("Error", 500)
    }
    
  }

  async index(req, res) {
    const { search } = req.query

    let query = knex("dishes")

    if(search) {
      const userIngredientsArray = search.split(",").map(ingredient => ingredient.trim())
      
      userIngredientsArray.map(ingredient => {
        query = query.whereLike('ingredients', `%${ingredient}%`)
      })

      query = query.orWhereLike("name", `%${search}%`)
    }

    const dishes = await query

    return res.json(dishes)
  }

  async show(req, res) {
    const { id } = req.params

    const dishes = await knex("dishes")
      .where({ id }).first()
      .select([
        "dishes.name",
        "dishes.description",
        "dishes.image",
        "dishes.ingredients",
        "dishes.price"
      ])

    return res.json(dishes)
  }
}

module.exports = DishesController;
