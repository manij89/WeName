'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const {db_name, db_user, db_password, db_host} = require('../config')
const db = {};

// TODO : config file with db keys 
const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
});


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  })

  Object.keys(db).forEach(model => {
    if(db[model].associate) {
      db[model].associate(db)
    }
  })


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
