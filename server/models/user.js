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
    liked: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    matched: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  },
  {
    timestamps: false
  }
  );

  User.associate = db => {
      db.User.hasMany(db.Names);
  }

  User.associate = db => {
    db.User.belongsTo(db.Sessions);
  }
  
  return User;
}