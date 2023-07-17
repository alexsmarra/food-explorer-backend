const knex = require('../database/knex');
// const AppError = require('../utils/AppError');

// const DiskStorage = require("../providers/DiskStorage");

// const diskStorage = new DiskStorage()

class DishesController {
   async create(req, res) {
      const { name, price, description } = req.body
      // const { filename: image } = req.file;
        
        // const filename = await diskStorage.saveFile(image)

      await knex('dishes').insert(
        name,
        price, 
        description
      )

      return res.json()
   }
}

module.exports = DishesController;
