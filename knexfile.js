// The path is to render without problems in Windows, Mac, Linux, etc
const path = require("path")

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      // the "path" to resolve the address, "__dirname" means from this folder (partindo dessa pasta) access the src, inside src to access "database" and inside "database" will find "database.db"
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    // By default, the CASCADE function not is available in sqlite, so this function below activates the CASCADE function (the function to delete in cascade, in ours migrations). "conn" is connection, "cb" is callback, "pool" is whenever we are connected to our database (sempre que estivermos conectados ao nosso banco de dados)
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    // default property to work with knexjs (according to the professor)
    useNullAsDefault: true
  }
};





