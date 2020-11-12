'use strict';


module.exports = (sequelize, DataTypes) => {
  const Name = sequelize.define('Name', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
  );

  Name.associate = db => {
      db.Name.belongsToMany(db.Users);
  }

  return Name;
}