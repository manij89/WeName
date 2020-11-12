'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
  );

  User.associate = db => {
      db.User.hasOne(db.User, {
        foreignKey: 'partnerId'
      });
      db.User.belongsToMany(db.Name, {through: 'SeenNames'})
      db.User.belongsToMany(db.Name, {through: 'LikedNames'})
  }

  return User;
}