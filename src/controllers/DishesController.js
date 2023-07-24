const knex = require('../database/knex');
const AppError = require('../utils/AppError');

const DiskStorage = require("../providers/DiskStorage")
const diskStorage = new DiskStorage()

class DishesController {
  async create(req, res) {
    const { filename: image } = req.file;
    const { name, category, ingredients, price, description } = req.body;
      
    const filename = await diskStorage.saveFile(image)
      
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
    const { name } = req.query
    let dishes

    if(name) {
      dishes = await knex("dishes")
        .whereLike("name", `%${name}%`)
    } else {
      dishes = await knex("dishes").select("*")
    }
    return res.json(dishes)
  }

  async show(req, res) {
    const { id } = req.params

    const dishes = await knex("dishes")
      .where({ id }).first()

    return res.json(dishes)
  }
}

module.exports = DishesController;
