const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const { UPLOADS_FOLDER } = require("../configs/uploads")
const path = require("path")
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
          description
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
        "dishes.category",
        "dishes.description",
        "dishes.image",
        "dishes.ingredients",
        "dishes.price"
      ])

    return res.json(dishes)
  }

  async update(req, res) {
    const { id } = req.params;
    const { filename: image } = req.file || {} // Fallback para evitar erro se não houver imagem
    const { name, category, ingredients, price, description } = req.body;

    // Use o ID e o novo nome para atualizar o prato no banco de dados
    try {
        const dish = await knex("dishes").where({ id }).first();

        if (!dish) {
            throw new AppError("Prato inexistente!");
        }
        
        const updateFields = {
          name,
          category,
          ingredients,
          price,
          description
        }

        if(image) {
          await diskStorage.deleteFile(path.join(UPLOADS_FOLDER, dish.image))

          const filename = await diskStorage.saveFile(image)
          updateFields.image = filename
        }

        await knex("dishes").where({ id: dish.id }).update(updateFields);

        return res.json({ message: "Prato atualizado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar prato!" });
    }
 }

 async delete(req, res) {
  const { id } = req.params

  const dish = await knex("dishes").where({ id }).first()

  await diskStorage.deleteFile(path.join(UPLOADS_FOLDER, dish.image))

  await knex("dishes").where({ id }).first().delete()

  return res.json()
 }
}

module.exports = DishesController;
