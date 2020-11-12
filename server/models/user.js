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
    },
    linkingCode: {
      type: DataTypes.STRING,
      allowNull: true
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
      db.User.belongsToMany(db.Name, {through: 'SeenNames', as: 'Seen'})
      db.User.belongsToMany(db.Name, {through: 'LikedNames', as: 'Liked'})
  }

  return User;
}