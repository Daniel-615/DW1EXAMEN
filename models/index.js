const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

class Database {
  constructor() {
    this._sequelize = new Sequelize(
      dbConfig.DB,
      dbConfig.USER,
      dbConfig.PASSWORD,
      {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        pool: dbConfig.pool,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        },
        logging: false
      }
    );

    this.Sequelize = Sequelize;
    this.models = {};

    this._loadModels();
    this._applyAssociations();
  }

  _loadModels() {
    const sequelize = this._sequelize;
    const DataTypes = Sequelize.DataTypes;

    // Carga de modelos
    this.models.Categoria = require('./categoria.js')(sequelize, DataTypes);
    this.models.Netflix = require('./netflix.js')(sequelize, DataTypes);
  }

  _applyAssociations() {
    const { Categoria, Netflix} = this.models;

    // Relación correcta: Categoria tiene muchos Netflix, Netflix pertenece a Categoria
    Categoria.hasMany(Netflix, { foreignKey: 'id_categoria' });
    Netflix.belongsTo(Categoria, { foreignKey: 'id_categoria' });

  }

  get sequelize() {
    return this._sequelize;
  }

  getModel(name) {
    return this.models[name];
  }
}

module.exports = new Database();
