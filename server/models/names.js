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
    db.Name.belongsToMany(db.User, {through: 'SeenNames'});
    db.Name.belongsToMany(db.User, {through: 'LikedNames'});
  };

  return Name;
};

//TODO: why is timestamps false??
//TODO: Question for M - what is this seennames and liked name situation association??